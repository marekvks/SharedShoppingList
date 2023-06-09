<script lang="ts">
	import { goto } from "$app/navigation";
    import { pocketbase } from "$lib/pocketbase";
	import { onMount } from "svelte";
    import { IsUsernameValid, IsEmailValid, IsPasswordValid } from "./validation";
    import toast, { Toaster } from 'svelte-french-toast'

    export let register: boolean;

    let usernameInput: HTMLInputElement;
    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let passwordConfirmInput: HTMLInputElement;

    function validateStyle(input: HTMLInputElement, method: Function) {
        if (!method(input.value)) {
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
        else {
            input.classList.add('valid');
            input.classList.remove('invalid');
        }
    }

    function validate(username: string = '', email: string, password: string, passwordConfirm: string = '', signUp: boolean): boolean {
        if (!IsEmailValid(email)) {
            toast.error("Invalid email!");
            return false;
        }
        if (!IsPasswordValid(password)) {
            toast.error("Password is incorrect!");
            return false;
        }
        if (!signUp) return true;
        if (!IsUsernameValid(username)) {
            toast.error("Invalid username!");
            return false;
        }
        if (password != passwordConfirm) {
            toast.error("Passwords doesn't match!");
            return false;
        }
        return true;
    }

    onMount(() => {
        isLoggedIn();
    });

    async function isLoggedIn() {
        const response = await fetch('/api/auth/login', {
            method: 'GET',
        });
        if (!response.ok) return;
        const userId = await response.json();
        goto(`/user/${userId}`);
    }

    async function signUp(username: string, email: string, password: string, passwordConfirm: string) {
        if (!validate(username, email, password, passwordConfirm, true)) return;
        const data = {
            username,
            email,
            password,
            passwordConfirm
        }
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password, passwordConfirm }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('register ' + response.statusText);
        signIn(email, password);
        // if (!response.ok) // Toast error
    }

    async function signIn(email: string, password: string) {
        if (!validate('', email, password, '', false)) return;
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) isLoggedIn();
        // else // Toast error
    }
</script>

<Toaster />
<section class="body">
    {#if register}
        <form
            on:submit|preventDefault={() => signUp(usernameInput.value, emailInput.value, passwordInput.value, passwordConfirmInput.value)}
            class="auth"
        >
            <h2 class="title">Register</h2>
            <p class="input-title">username</p>
            <input
                type="text"
                name="username"
                placeholder="username"
                required
                on:keyup={() => validateStyle(usernameInput, IsUsernameValid)}
                bind:this={usernameInput}
                />
            <p class="input-title">email</p>
            <input
                type="text"
                name="email"
                placeholder="email"
                required
                on:keyup={() => validateStyle(emailInput, IsEmailValid)}
                bind:this={emailInput}
            />
            <p class="input-title">password</p>
            <input
                type="password"
                name="password"
                placeholder="password"
                required
                on:keyup={() => validateStyle(passwordInput, IsPasswordValid)}
                bind:this={passwordInput}
            />
            <p class="input-title">confirm password</p>
            <input
                type="password"
                name="password confirm"
                placeholder="confirm password"
                required
                bind:this={passwordConfirmInput}
            />
            <a href="/login" class="forgot-password">Already have an account? Log-in!</a>
            <button type="submit" class="submit-btn">Submit</button>
        </form>
    {:else}
        <form
            on:submit|preventDefault={() => signIn(emailInput.value, passwordInput.value)}
            class="auth"
        >
            <h2 class="title">Login</h2>
            <p class="input-title">email</p>
            <input
                type="text"
                name="email"
                placeholder="email"
                required
                on:keyup={() => validateStyle(emailInput, IsEmailValid)}
                bind:this={emailInput}
            />
            <p class="input-title">password</p>
            <input
                type="password"
                name="password"
                placeholder="password"
                required
                on:keyup={() => validateStyle(passwordInput, IsPasswordValid)}
                bind:this={passwordInput}
            />
            <a href="/register" class="forgot-password">Don't have an account? Skill issue!</a>
            <a href="/forgor-password" class="forgot-password">Forgor💀 password?</a>
            <button type="submit" class="submit-btn">Submit</button>
        </form>
    {/if}
</section>

<style lang="scss">
    @import '$lib/scss/utils.scss';
    @import '$lib/scss/variables.scss';

    .body {
        margin: 0;
        padding: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.invalid) {
        border-color: $red-c!important;
    }
    :global(.valid) {
        border-color: $valid-c!important;
    }

    .auth {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;

        width: 400px;
        height: 600px;
        background-color: $auth-form-background-c;
        box-shadow: 0px 0px 8px $grey-c;
        border-radius: 10px;

        .title {
            text-align: center;
            font-size: 40px;
            font-weight: 400;
            margin-bottom: 35px;
        }

        .input-title {
            font-size: 18px;
            margin-left: calc(10px + 7.5%);
            align-self: flex-start;
        }
        .input-title:not(:first-child) {
            margin-top: 10px;
        }

        input {
            width: 80%;
            height: 40px;
            padding: 5px 10px;
            font-size: 18px;
            border: 1px solid $input-border-c;
            border-radius: 15px;
            background-color: $input-background-c;
        }

        a {
            align-self: flex-end;
            margin-right: calc(10px + 7.5%);
            color: $link-c;
            transition: 0.2s ease;
        }
        a:hover {
            color: $link-hover-c;
        }

        .submit-btn {
            margin-top: 30px;
            font-size: 25px;
            padding: 5px 20px;
            border: none;
            border-radius: 10px;
            background-color: $submit-button-c;
            color: $auth-form-background-c;
            transition: all 0.2s ease;
        }
        .submit-btn:hover {
            background-color: $submit-button-hover-c;
        }
    }
</style>