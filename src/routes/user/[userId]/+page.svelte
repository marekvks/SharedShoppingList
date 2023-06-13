<script lang="ts">
	import { goto } from '$app/navigation';
    import { toast, Toaster } from 'svelte-french-toast';

    export let data;
</script>

<Toaster />
<section class="user-section">
    <h1>You're logged in as <strong>{data.currentUser.username}</strong></h1>
    <h2>Your id is <strong>{data.currentUser.id}</strong></h2>
    <a href="/shoppinglists">Your shopping lists</a>
</section>

<style lang="scss">
    @import '$lib/scss/utils.scss';
    @import '$lib/scss/variables.scss';

    $normal-text-c: #242424;

    .user-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: calc(100vh - 101px);
        background-color: $section-background-c;

        h1, h2 {
            font-size: 45px;
            font-weight: 500;
            color: $normal-text-c;

            strong {
                font-weight: 700;
                color: $black-c;
            }
        }
        h1 {
            margin-top: 200px;
        }
        h2, a {
            font-size: 40px;
            margin-top: 20px;
        }

        a {
            font-size: 30px;
            text-decoration: underline;
            color: $link-c;
            transition: 0.2s ease;
        }
        a:hover {
            color: $link-hover-c;
        }
    }
</style>