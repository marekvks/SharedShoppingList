/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const { email, password } = await request.json();

    const record = await locals.pb.collection('users').authWithPassword(email, password);

    return new Response('OK');
}