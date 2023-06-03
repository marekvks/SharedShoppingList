import type { Record } from 'pocketbase'
import { error } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import { pocketbase } from '$lib/pocketbase.js';

/** @type {import('./$types').RequestHandler} */
export async function load({ locals }) {
    const currentUser = locals.pb.authStore.model;
    if (currentUser == null) throw error(404, 'Not found');
    let currentUserId = currentUser?.id;
    let username = currentUser?.username;

    const shoppingListPages = await pocketbase.collection('shopping_lists').getFullList({
        filter: `authors ~ '${currentUserId}'`
    });

    async function getAuthors(ids: string[]) {
        pocketbase.autoCancellation(false);
        const authorsUsernames = [];
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const author =  await pocketbase.collection('users').getOne(id);
            authorsUsernames.push(author.username);
        }
        pocketbase.autoCancellation(true);
        return authorsUsernames;
    }

    const pages = shoppingListPages.map((page) => {
        const authors = getAuthors(page.authors);
        return {
            title: page.title,
            authors: authors
        }
    })

    return {
        currentUserUsername: username,
        currentUserId: currentUserId,
        pages
    }
}