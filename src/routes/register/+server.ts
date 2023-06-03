/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const { username, email, password, passwordConfirm } = await request.json();
    const data = {
        username,
        email,
        password,
        passwordConfirm
    }

    const record = await locals.pb.collection('users').create(data);

    return new Response('OK');
}