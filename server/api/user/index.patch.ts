import { hashSync, genSaltSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm'; 

export default eventHandler(async event => {
    const { user } = await requireUserSession(event);
    const body = await readValidatedBody(event, updateUserSchema.parse);

    if(Object.keys(body).length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "We'll need at least one key to set!"
        });
    };

    await db.update(schema.users).set({
        email: body.email,
        name: body.name,
        password: body.password ? hashSync(body.password, genSaltSync()): undefined,
        photo: body.photo
    }).where(eq(schema.users.id, user.id));
});