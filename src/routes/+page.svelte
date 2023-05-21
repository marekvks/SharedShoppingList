<script lang="ts">
    import { pocketbase } from '$lib/pocketbase';
    import { scale } from 'svelte/transition'
    import { flip } from 'svelte/animate'
	import { IsTodoContentValid } from '$lib/validation';
	import { onMount } from 'svelte';

    let inputContent: string = "";
    const user = "marekvks";
    const pageId = 1;

    let todos: Todo[] = [];

    interface Todo {
        content: string,
        creator: string,
        page_id: number,
        id: string
    }

    interface SendData {
        content: string,
        creator: string,
        page_id: number
    }

    onMount(async () => getTodos());

    async function addTodo(data: SendData) {
        if (!IsTodoContentValid(data.content)) {
            alert("Invalid content!");
            return;
        }

        const record = await pocketbase.collection('todos').create(data);
        const todo: Todo = {
            content: data.content,
            creator: data.creator,
            page_id: data.page_id,
            id: record.id
        }
        console.log(todo.id);
        todos = [...todos, todo];
        resetInputField();
    }

    function resetInputField() {
        inputContent = "";
    }

    async function removeTodo(todo: Todo) {
        await pocketbase.collection('todos').delete(todo.id);
        todos.splice(todos.indexOf(todo), 1);
        todos = todos;
    }

    async function getTodos() {
        const record = await pocketbase.collection('todos').getFullList( {
            filter: `done = false && page_id = ${pageId}`
        } );
        record.forEach((record) => {
            const todo: Todo = {
                content: record.content,
                creator: record.creator,
                page_id: record.page_id,
                id: record.id
            }
            todos = [...todos, todo];
        })
    }
</script>

<h1>TODO</h1>
<form on:submit|preventDefault={() => addTodo({ content: inputContent, creator: user, page_id: pageId })}>
    <input type="text" placeholder="New todo" bind:value={inputContent}>
    <button type="submit">Add</button>
</form>
<section class="todo-section">
    {#each todos as todo (todo)}
        <article
            animate:flip in:scale={{ opacity: 0, start: 0.5 }} out:scale={{ opacity: 0, start: 0.5 }}
            class="todo"
        >
            <div class="text-box">
                <p class="todo-content">{todo.content}</p>
                <p class="todo-creator">added by {todo.creator}</p>
            </div>
            <button class="remove-btn" on:click={() => removeTodo(todo) }></button>
        </article>
    {/each}
</section>

<style lang="scss">
    @import '../scss/utils.scss';
    @import '../scss/variables.scss';

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