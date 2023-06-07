/** @type {import('./$types').RequestHandler} */
export async function POST({ locals }) {
    const record = await locals.pb.authStore.clear();

    return new Response('OK');
}