import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
    id: integer().primaryKey({ autoIncrement: true }),
    email: text().unique().notNull(),
    name: text(),
    password: text().notNull(),
    photo: text(),
    created: integer({ mode: 'timestamp' }).default(sql`(strftime('%s','now'))`).notNull()
});

export const notes = sqliteTable('notes', {
    id: integer().primaryKey({ autoIncrement: true }),
    user: integer().references(() => users.id, { onDelete: 'cascade' }).notNull(),
    name: text().notNull(),
    content: text(),
    created: integer({ mode: 'timestamp' }).default(sql`(strftime('%s','now'))`).notNull(),
    updated: integer({ mode: 'timestamp' }).default(sql`(strftime('%s','now'))`).$onUpdate(() => new Date()).notNull()
});