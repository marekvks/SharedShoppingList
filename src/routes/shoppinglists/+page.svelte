<script lang="ts">
	import { onMount } from 'svelte';
    import Navbar from '$lib/navbar.svelte';

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

<Navbar />
<section class="body">
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
    @import '$lib/scss/utils.scss';
    @import '$lib/scss/variables.scss';

    $grey-text-c: #242424;

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

    .body {
        display: flex;
        justify-content: center;
        background-color: $section-background-c;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        margin-top: 10px;
        width: 95%;

        .page-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;

            border: 1px solid $grey-c;
            border-radius: 10px;
            background-color: $section-background-c;
            min-width: 250px;
            min-height: 200px;

            text-decoration: none;
            text-align: center;

            transition: 0.2s ease;
            
            h2 {
                max-width: 200px;
                word-wrap: break-word;
                font-size: 30px;
                color: $black-c;
                transition: 0.2s ease;
            }

            .page-authors {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 5px;

                h3, h4 {
                    font-size: 15px;
                    color: $grey-text-c;
                    transition: 0.2s ease;
                }
                h4:not(:last-child, :first-child)::after {
                    content: ',';
                }
            }
            .page-link:hover {
                background-color: #3b3b3b!important;
            }
            .page-link:hover h2, h3, h4 {
                color: $black-c;
            }
        }
    }
</style>