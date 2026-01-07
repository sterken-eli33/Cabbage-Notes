import { eq } from 'drizzle-orm';
import { hashSync, genSaltSync } from 'bcrypt-ts';

export default eventHandler(async event => {
    const body = await readValidatedBody(event, createUserSchema.parse);

    const existingUser = await db.select().from(schema.users).where(eq(schema.users.email, body.email));

    if(existingUser.length > 0) {
        throw createError({
            status: 400,
            statusMessage: "It looks like a user with that email address already exists!"
        });
    };

    const result = await db.insert(schema.users).values({
        email: body.email,
        password: hashSync(body.password, genSaltSync())
    });

    await setUserSession(event, {
        user: {
            id: Number(result.lastInsertRowid)
        }
    });
});