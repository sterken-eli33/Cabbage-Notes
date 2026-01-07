import { eq } from 'drizzle-orm';

async function CheckNote(id: number, user: number): Note {
    const note = await db.select().from(schema.notes).where(eq(schema.notes.id, id));

    if(note.length === 0) {
        throw createError({
            status: 404,
            statusMessage: "Oops, we can't quite find that note!"
        });
    } else if(note[0].user != user) {
        throw createError({
            status: 401,
            statusMessage: "Oops, it looks like you don't have access to that note!"
        });
    };

    return note[0];
};

export {
    CheckNote
};