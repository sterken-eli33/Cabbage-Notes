import { hashSync, genSaltSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm'; 

export default eventHandler(async event => {
    const { user } = await requireUserSession(event);
    const body = await readValidatedBody(event, updateUserSchema.parse);

    await db.update(schema.users).set({
        email: body.email,
        name: body.name,
        password: body.password ? hashSync(body.password, genSaltSync()): undefined,
        photo: body.photo
    }).where(eq(schema.users.id, user.id));
});