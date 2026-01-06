import { eq } from 'drizzle-orm';

export default defineEventHandler(async event => {
    const { user } = await requireUserSession(event);
    const userData = await db.select().from(schema.users).where(eq(schema.users.id, user.id));
    const result: User = {
        email: userData[0].email,
        name: userData[0].name,
        photo: userData[0].photo,
        created: userData[0].created
    };

    return result;
});