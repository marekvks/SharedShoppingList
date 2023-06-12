<script lang="ts">
    import { pocketbase } from '$lib/pocketbase';
    import { scale } from 'svelte/transition'
    import { flip } from 'svelte/animate'
	import { IsTodoContentValid } from '$lib/validation';
	import { onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-french-toast';
	import type { Record } from 'pocketbase';

    let inputContent: string = "";
    let shareTag: string = "";

    export let data;

    interface Todo {
        "id": string,
        "content": string,
        "creator": Promise<any>
    }

    let todos: Todo[];

    onMount(async () => {
        const loadedTodos = await pocketbase.collection('todos').getFullList({
            filter: `page = '${data.pageId}'`
        });
        todos = loadedTodos.map((loadedTodo) => {
            const todo: Todo = {
                "id": loadedTodo.id,
                "content": loadedTodo.content,
                "creator": loadedTodo.creator.username
            }
            return todo;
        });

        pocketbase.collection('todos').subscribe('*', function(updated) {
            const todo = updated.record;
            switch(updated.action) {
                case 'create':
                    createTodoEvent(todo);
                    break;
                case 'delete':
                    removeTodoEvent(todo.id);
                    break;
            }
        });
    });

    function createTodoEvent(createdTodo: Record) {
        const todo: Todo = {
            "id": createdTodo.id,
            "content": createdTodo.content,
            "creator": createdTodo.creator.username
        }
        todos = [...todos, todo]
    }

    function removeTodoEvent(id: string) {
        const todo = todos.find(todo => todo.id == id);
        if (!todo) return;
        const index = todos.indexOf(todo);
        todos.splice(index, 1);
        todos = todos;
    }

    async function createTodo(content: string) {
        if (!IsTodoContentValid(content)) return;

        const pageId = data.pageId;
        const response = await fetch('../api/shoppinglists/todos', {
            method: 'POST',
            body: JSON.stringify({ content, pageId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response.ok == true ? "ok" : "not ok");
    }

    async function removeTodo(id: string) {
        const response = await fetch('../api/shoppinglists/todos', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const todo = todos.find(c => c.id == id);
            if (!todo) return;
            todos.slice(todos.indexOf(todo), 1);
        }
    }

    async function shareWithOtherUser(userId: string) {
        const response = await fetch('../api/shoppinglists/todos/share', {
            method: 'POST',
            body: JSON.stringify({ userId, "pageId": data.pageId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        switch(response.status) {
            case 200:
                toast.success('Successfully shared with the user!');
                break;
            case 400:
                toast.error('List is already shared with that user!');
                break;
            case 406:
                toast.error('Invalid user id!');
                break;
            default:
                toast.error('Invalid user id!');
                break;
        }
    }
</script>

<Toaster />
<h1>TODO</h1>
<form on:submit|preventDefault={() => createTodo(inputContent)}>
    <h3>Create a new TODO</h3>
    <input type="text" placeholder="New todo" bind:value={inputContent}>
    <button type="submit">Add</button>
</form>
<form on:submit|preventDefault={() => shareWithOtherUser(shareTag)}>
    <h3>Share with other user</h3>
    <input type="text" placeholder="username#id" bind:value={shareTag}>
    <button type="submit">Share</button>
</form>
<section class="todo-section">
{#if todos}
    {#each todos as todo (todo)}
        <article
            animate:flip in:scale={{ opacity: 0, start: 0.5 }} out:scale={{ opacity: 0, start: 0.5 }}
            class="todo"
        >
            <div class="text-box">
                <p class="todo-content">{todo.content}</p>
                {#await todo.creator then creator}
                <p class="todo-creator">added by {creator}</p>
                {/await}
            </div>
            <button class="remove-btn" on:click={() => removeTodo(todo.id) }></button>
        </article>
    {/each}
{/if}
</section>

<style lang="scss">
    @import '$lib/scss/utils.scss';
    @import '$lib/scss/variables.scss';

    .todo-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        .todo {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 500px;
            border: 1px solid $grey-c;
            border-radius: 10px;
            padding: 0.2em 1.5em;

            .todo-content {
                font-size: 1.2em;
            }

            .todo-creator {
                font-size: 0.75em;
                opacity: 0.5;
            }

            button {
                position: relative;
                background-color: $red-c;
                border: 0;
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
            button::after {
                position: absolute;
                content: '';
                width: 1.4em;
                height: 4px;
                background-color: $grey-c;
                border-radius: 10px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>