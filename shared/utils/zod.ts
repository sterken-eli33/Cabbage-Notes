import * as schema from 'hub:db:schema';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { email, string } from 'zod';

export const createUserSchema = createInsertSchema(schema.users, {
    email: email("Are you sure that's a valid email address?"),
    password: schema => schema.min(8, "That password looks too weak! Let's make it at least 8 characters.").max(50, "Woah there, that's a long password! Let's keep it to 50 chracters max.")
}).omit({
    id: true,
    name: true,
    photo: true,
    created: true
});

export const updateUserSchema = createUpdateSchema(schema.users, {
    email: email("Are you sure that's a valid email address?").optional(),
    name: schema => schema.max(50, "Woah there, that's a pretty long name! Let's keep it to 50 characters at most."),
    password: schema => schema.min(8, "That password looks too weak! Let's make it at least 8 characters.").max(50, "Woah there, that's a long password! Let's keep it to 50 chracters max."),
    photo: schema => schema.includes('image/', "That doesn't look like an image file!").max(1000000, "Oops, that file is too large! Please keep it to 1MB max.")
}).omit({
    id: true,
    created: true
});

export const authSchema = createInsertSchema(schema.users, {
    email: email("Are you sure that's a valid email address?"),
    password: schema => schema.min(8, "That password looks too short! Let's make it at least 8 characters.").max(50, "Woah there, that's a long password! Let's keep it to 50 chracters max.")
}).extend({
    emailOrName: string()
}).omit({
    id: true,
    email: true,
    name: true,
    photo: true,
    created: true
});