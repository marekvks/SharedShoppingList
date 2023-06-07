export async function POST({ request, locals }) {
    const currentUser = locals.pb.authStore.model;
    if (!currentUser) return new Response('error');

    const { content, pageId } = await request.json();
    const data = {
        "content": content,
        "creator": currentUser.id,
        "page": pageId
    }
    const record = await locals.pb.collection('todos').create(data);

    return new Response('ok');
}

export async function DELETE({ request, locals }) {
    const currentUser = locals.pb.authStore.model;
    if (!currentUser) return new Response('error');
    const { id } = await request.json();

    await locals.pb.collection('todos').delete(id);

    return new Response('ok');
}