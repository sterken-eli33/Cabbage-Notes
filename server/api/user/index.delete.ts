import { eq } from 'drizzle-orm';

export default eventHandler(async event => {
    const { user } = await requireUserSession(event);

    await db.delete(schema.users).where(eq(schema.users.id, user.id));

    await clearUserSession(event);
});