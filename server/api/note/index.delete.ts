import { eq } from 'drizzle-orm';

export default eventHandler(async event => {
    const { user } = await requireUserSession(event);
    const query = getQuery(event);
    const id = Number(query.id);
    const validId = Number.isInteger(id) && id > 0;

    if(validId) {
        await CheckNote(id, user.id);

        await db.delete(schema.notes).where(eq(schema.notes.id, id));
    } else {
        await db.delete(schema.notes).where(eq(schema.notes.user, user.id));
    };
});