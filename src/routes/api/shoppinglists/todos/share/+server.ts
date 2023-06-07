import { IsIdValid } from '$lib/validation.js';

export async function POST({ request, locals }) {
    const { userId, pageId } = await request.json();
    console.log(IsIdValid(userId));
    if (!IsIdValid(userId)) return new Response('Invalid user id', { "status": 406 });

    const page = await locals.pb.collection('shopping_lists').getOne(pageId);
    const authors: string[] = page.authors;

    const newAuthor = await locals.pb.collection('users').getOne(userId);
    if (!newAuthor) return new Response('Author does not exist', { "status": 406 });
    if (authors.includes(newAuthor.id)) return new Response('Author is already in the list', { "status": 400 });
    authors.push(newAuthor.id);
    const data = {
        "authors": [...authors]
    };

    await locals.pb.collection('shopping_lists').update(pageId, data);

    return new Response('ok');
}