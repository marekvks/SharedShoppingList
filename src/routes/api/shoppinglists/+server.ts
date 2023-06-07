import type { Record } from 'pocketbase';

export async function POST({ request, locals }) {
    const currentUser = locals.pb.authStore.model;
    if (!currentUser) return new Response('error');
    const currentUserId = currentUser.id;
    const { title } = await request.json();

    const data = {
        title,
        authors: currentUserId
    }

    const usersLists = currentUser.lists;
    const record = await locals.pb.collection('shopping_lists').create(data).then((rec) => {
        usersLists.push(rec);
        locals.pb.collection('users').update(currentUserId, { lists: usersLists });
    });

    return new Response('ok');
}