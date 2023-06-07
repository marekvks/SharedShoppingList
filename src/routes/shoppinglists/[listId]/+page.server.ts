import { pocketbase } from "$lib/pocketbase";
import { getCreator } from "$lib/server/functions.js";
import { error } from "@sveltejs/kit";

export async function load({ params, locals }) {
    const currentUser = locals.pb.authStore.model;
    if (!currentUser) throw error(404, 'Not found');
    const pageId = params.listId;
    const page = await locals.pb.collection('shopping_lists').getOne(pageId).catch(() => { throw error(404, 'Not found'); });
    if (!page.authors.includes(currentUser.id)) throw error(404, 'Not found');

    // Fetch todos
    const todoRecordArray = await locals.pb.collection('todos').getFullList({
        filter: `page = '${pageId}'`
    });

    const todos = todoRecordArray.map((todo) => {
        const creator = getCreator(todo.creator);
        return {
            "id": todo.id,
            "content": todo.content,
            "creator": creator
        }
    });

    return {
        "pageId": pageId,
        "pageTitle": page.title,
        "todos": todos
    }
}