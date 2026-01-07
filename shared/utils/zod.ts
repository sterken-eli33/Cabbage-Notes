import * as schema from 'hub:db:schema';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { email, string, number } from 'zod';

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

export const createNoteSchema = createInsertSchema(schema.notes, {
    name: schema => schema.min(1, "What's a note without a name?").max(50, "Wow, that's a long name! Let's keep it to 50 characters at most.")
}).omit({
    id: true,
    user: true,
    content: true,
    created: true,
    updated: true
});

export const updateNoteSchema = createUpdateSchema(schema.notes, {
    id: number().min(1, "That doesn't look like a valid note ID!"),
    name: schema => schema.min(1, "What's a note without a name?").max(50, "Wow, that's a long name! Let's keep it to 50 characters at most."),
    content: schema => schema.max(5000000, "Wow, you've reached the maximum size for a note! Try creating a new one, or deleting some content.")
}).omit({
    user: true,
    created: true,
    updated: true
});