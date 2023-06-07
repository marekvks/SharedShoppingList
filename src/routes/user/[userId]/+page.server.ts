import { error } from '@sveltejs/kit';

export async function load({ locals, params }) {
    const currentUser = locals.pb.authStore.model;
    const userPageId = params.userId;
    if (!currentUser || currentUser.id != userPageId) throw error(404, 'Not found');

    const user = {
        "username": currentUser.username,
        "id": currentUser.id
    }

    return {
        "currentUser": user
    }
}