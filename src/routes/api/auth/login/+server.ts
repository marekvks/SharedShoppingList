/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const { email, password } = await request.json();

    const record = await locals.pb.collection('users').authWithPassword(email, password);

    return new Response('OK');
}

export async function GET({ request, locals }) {
    const currentUser = locals.pb.authStore.model;
    if (!currentUser) return new Response('Not logged in', { "status": 404 });
    const json = JSON.stringify(currentUser.id);
    return new Response(json);
}