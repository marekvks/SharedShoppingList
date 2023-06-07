import { pocketbase } from "$lib/pocketbase";

export async function getAuthors(ids: string[]) {
    pocketbase.autoCancellation(false);
    const authorsUsernames = [];
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const author =  await pocketbase.collection('users').getOne(id);
        authorsUsernames.push(author.username);
    }
    pocketbase.autoCancellation(true);
    return authorsUsernames;
}

export async function getCreator(id: string) {
    const creators = await getAuthors([id]);
    const creator = creators[0];
    return creator;
}