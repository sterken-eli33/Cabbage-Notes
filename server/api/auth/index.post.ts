import { or, eq } from 'drizzle-orm';
import { compareSync } from 'bcrypt-ts';

export default eventHandler(async event => {
    const body = await readValidatedBody(event, authSchema.parse);
    const user = await db.select({
        id: schema.users.id,
        password: schema.users.password
    }).from(schema.users).where(or(eq(schema.users.email, body.emailOrName), eq(schema.users.name, body.emailOrName)));

    if(user.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: "Oops, we couldn't find an account with that name or email!"
        });
    } else if(!compareSync(body.password, user[0].password)) {
        throw createError({
            statusCode: 401,
            statusMessage: "Hmm, it looks like that password isn't quite correct!"
        });
    };

    await setUserSession(event, {
        user: {
            id: user[0].id
        }
    });
});