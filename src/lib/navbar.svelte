<script lang="ts">
	import { goto } from "$app/navigation";
    import { onMount } from "svelte";
	import toast, { Toaster } from "svelte-french-toast";

    let loggedIn: Boolean = false;
    let userId = "";

    onMount(async () => {
        const response = await fetch('/api/auth/login', {
            method: 'GET'
        });
        if (response.ok) {
            userId = await response.json();
            loggedIn = true;
        }
        else {
            loggedIn = false;
        }
    });

    const signOut = async function() {
        const response = await fetch(`../api/auth/logout`, {
            method: 'POST'
        });

        if (response.ok) goto('/login');
        else toast.error('Error while trying to logout!');
    }
</script>

<Toaster />
<nav>
    <a href="/" class="logo"><span>S</span>hared<span>S</span>hopping<span>L</span>ist</a>
    <ul class="links">
        <li><a href="https://github.com/marekvks">creator</a></li>
        <li><a href="/about">about</a></li>
        {#if !loggedIn}
        <li><a class="login-BTN" href="/login">Login</a></li>
        {:else}
        <li><a href={`/user/${userId}`}>my account</a></li>
        <li><button class="logout-BTN" on:click={signOut}>Logout</button></li>
        {/if}
    </ul>
</nav>

<style lang="scss">
    @import '$lib/scss/utils.scss';
    @import '$lib/scss/variables.scss';

    $link-text-size: 25px;
    $logo-default-c: #313131;
    $nav-height: 100px;
    $nav-border-c: rgba(0, 0, 0, 0.2);
    $nav-background-c: #fff;

    nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: $nav-height;
        border-bottom: 1px solid $nav-border-c;
        background-color: $nav-background-c;

        .logo {
            font-size: $link-text-size;
            color: $logo-default-c;

            span {
                font-size: 32px;
                font-weight: 500;
            }
        }

        .links {
            li {
                display: inline-block;

                a {
                    font-size: $link-text-size;
                }

                .login-BTN, .logout-BTN {
                    padding: 6px 25px;
                    background-color: $submit-button-c;
                    color: $nav-background-c;
                    font-weight: 400;
                    border-radius: 10px;
                    transition: 0.2s ease;
                }
                .login-BTN:hover {
                    background-color: $submit-button-hover-c;
                }
                .logout-BTN {
                    font-size: 25px;
                    background-color: $red-button-c;
                    padding: 8px 25px;
                    border: none;
                }
                .logout-BTN:hover {
                    background-color: $red-button-hover-c;
                }
            }
            li:not(:first-child) {
                margin-left: 50px;
            }
        }
    }
</style>