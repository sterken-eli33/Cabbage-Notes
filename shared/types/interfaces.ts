import { users, notes } from 'hub:db:schema';
import { createInsertSchema } from 'drizzle-zod';
import type { infer } from 'zod';

const userSchema = createInsertSchema(users);
const noteSchema = createInsertSchema(notes);

interface UserSchema extends infer<typeof userSchema> {};
interface NoteSchema extends infer<typeof noteSchema> {};

export interface User extends Omit<UserSchema, 'id' | 'password'> {
    created: Date
};

export interface Note extends Omit<NoteSchema, 'user'> {
    id: number,
    created: Date,
    updated: Date
};