import { users } from 'hub:db:schema';
import { createInsertSchema } from 'drizzle-zod';
import type { infer } from 'zod';

const userSchema = createInsertSchema(users);

interface UserSchema extends infer<typeof userSchema> {};

export interface User extends Omit<UserSchema, 'id' | 'password'> {
    created: Date
};