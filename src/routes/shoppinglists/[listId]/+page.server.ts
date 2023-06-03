import { pocketbase } from "$lib/pocketbase";
import { error } from "@sveltejs/kit";

export async function load({ params, locals }) {
    const listId = params.listId;
    const page = await pocketbase.collection('shopping_lists').getOne(listId).catch(() => {
        throw error(404, 'Not found');
    });
    const currentUserId = locals.pb.authStore.model?.id;
    if (!page.authors.includes(currentUserId)) throw error(404, 'Not found');

    return {
        title: page.title
    }
}