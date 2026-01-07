import { eq } from 'drizzle-orm';

export default eventHandler(async event => {
    const { user } = await requireUserSession(event);
    const notes = await db.select().from(schema.notes).where(eq(schema.notes.user, user.id));
    const result: Note[] = notes.map(note => ({
        id: note.id,
        name: note.name,
        content: note.content,
        created: note.created,
        updated: note.updated
    }));
    
    return result;
});