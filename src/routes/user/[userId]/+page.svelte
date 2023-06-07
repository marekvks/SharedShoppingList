<script lang="ts">
	import { goto } from '$app/navigation';
    import { toast, Toaster } from 'svelte-french-toast';

    export let data;

    async function signOut() {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
        });

        if (response.ok) goto('/login');
        else toast.error('Error while trying to logout!');
    }
</script>

<Toaster />
<h1>You are logged in as {data.currentUser.username}</h1>
<h2>Your id is {data.currentUser.id}</h2>
<a href="/shoppinglists">Your shopping lists</a>
<button on:click={() => signOut()}>Logout</button>