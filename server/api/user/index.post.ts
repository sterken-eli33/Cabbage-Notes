import { hashSync, genSaltSync } from 'bcrypt-ts';

export default eventHandler(async event => {
    const body = await readValidatedBody(event, createUserSchema.parse);
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