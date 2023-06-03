<script lang="ts">
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';

    export let data;

    onMount(async () => {
        console.log(data.pages);
        await console.log(data.pages[1].authors)
    })
</script>
{#each data.pages as page}
    <p>{page.title}</p>
    {#await page.authors}
        <p>waiting</p>
    {:then authors}
        {#each authors as author}
        <p>{author}</p>
        {/each}
    {:catch error}
        <p>{error}</p>
    {/await}
{/each}
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
</style>