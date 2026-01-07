export default eventHandler(async event => {
    const { user } = await requireUserSession(event);
    const body = await readValidatedBody(event, createNoteSchema.parse);

    await db.insert(schema.notes).values({
        user: user.id,
        name: body.name
    });
});