<script lang="ts">
    import { pocketbase } from '$lib/pocketbase';
    import { scale, fade } from 'svelte/transition'

    let inputContent: String = "";

    let todos: Todo[] = [ {
        content: "example",
        createdBy: "marekvks",
        visible: true
    }, {
        content: "amongus",
        createdBy: "marekvks",
        visible: true
    } ];

    interface Todo {
        content: String,
        createdBy: String,
        visible: Boolean
    }

    function addTodo(todo: Todo) {
        todos = [...todos, todo]
    }

    function removeTodo(todo: Todo) {
        todos.splice(todos.indexOf(todo), 1);
        todos = todos;
    }
</script>

<h1>TODO</h1>
<form on:submit|preventDefault={() => addTodo( { content: inputContent, createdBy: "marekvks", visible: true } )}>
    <input type="text" placeholder="New todo" bind:value={inputContent}>
    <button type="submit">Add</button>
</form>
<section class="todo-section">
    {#each todos as todo}
            <article transition:scale={{ opacity: 0, start: 0.5 }} class="todo">
                <div class="text-box">
                    <p class="todo-content">{todo.content}</p>
                    <p class="todo-creator">added by {todo.createdBy}</p>
                </div>
                <button class="remove-btn" on:click={() => removeTodo(todo)}></button>
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