<script lang="ts">
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';

    export let data;

    let pageTitle: string = "";

    onMount(async () => {
        console.log(data.pages);
    })

    async function addPage(title: string) {
        const response = await fetch('/api/shoppinglists', {
            method: 'POST',
            body: JSON.stringify({ title }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.ok);
    }
</script>
<section class="links">
    {#each data.pages as page}
        <a href={`/shoppinglists/${page.id}`} target="_blank" class="page-link">
            <h2>{page.title}</h2>
            <div class="page-authors">
                {#await page.authors}
                    <p>waiting</p>
                {:then authors}
                    <h4>by:</h4>
                    {#each authors as author}
                        <h4>{author}</h4>
                    {/each}
                {:catch error}
                    <p>{error}</p>
                {/await}
            </div>
        </a>
    {/each}
</section>
<form on:submit|preventDefault={() => addPage(pageTitle)} class="create-list-form">
    <p>title</p>
    <input
        type="text"
        placeholder="shopping list title"
        bind:value={pageTitle}
    >
    <button type="submit">Submit</button>
</form>
<div class="user-info">
    <p>uname: {data.currentUserUsername}</p>
    <p>id: {data.currentUserId}</p>
</div>

<style lang="scss">
    .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 150px;

        background-color: #111;
        color: #fff;
        border-radius: 0 10px 0 0;
    }

    .create-list-form {
        background-color: #111;
        color: #fff;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .page-link {
            display: flex;
            flex-direction: column;
            align-items: center;

            border-radius: 10px;
            background-color: #242424;
            min-width: 250px;
            min-height: 200px;
            text-decoration: none;
            text-align: center;

            h2 {
                font-size: 30px;
                color: #fff;
            }

            .page-authors {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 5px;

                h3, h4 {
                    font-size: 15px;
                    color: #e0e0e0;
                }
                h4:not(:last-child, :first-child)::after {
                    content: ',';
                }
            }
        }
    }
</style>