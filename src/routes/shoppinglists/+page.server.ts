import { error } from '@sveltejs/kit';
import { pocketbase } from '$lib/pocketbase.js';
import { getAuthors } from '$lib/server/functions.js';

/** @type {import('./$types').RequestHandler} */
export async function load({ locals }) {
    const currentUser = locals.pb.authStore.model;
    if (currentUser == null) throw error(404, 'Not found');
    let currentUserId = currentUser?.id;
    let username = currentUser?.username;

    const shoppingListPages = await pocketbase.collection('shopping_lists').getFullList({
        filter: `authors ~ '${currentUserId}'`
    });

    const pages = shoppingListPages.map((page) => {
        const authors = getAuthors(page.authors);
        return {
            "title": page.title,
            "authors": authors,
            "id": page.id
        }
    })

    return {
        currentUserUsername: username,
        currentUserId: currentUserId,
        pages
    }
}