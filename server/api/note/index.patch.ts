import { eq } from 'drizzle-orm';

export default eventHandler(async event => {
    const { user } = await requireUserSession(event);
    const body = await readValidatedBody(event, updateNoteSchema.parse);

    if(!body.name && !body.content) {
        throw createError({
            status: 400,
            statusMessage: "You'll need to provide at least two keys to update a note!"
        });
    };

    await CheckNote(body.id, user.id);

    await db.update(schema.notes).set({
        name: body.name,
        content: body.content
    }).where(eq(schema.notes.id, body.id));
});