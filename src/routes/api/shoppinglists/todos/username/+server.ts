export async function POST({ locals, request }) {
    const id: string = await request.json();

    const user = locals.pb.collection('users').getOne(id);

    if (!user) return new Response("Not found", { status: 404 });

    const userJson = JSON.stringify(user);

    return new Response(userJson);
}