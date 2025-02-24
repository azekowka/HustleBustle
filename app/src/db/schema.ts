import { mysqlTable, text, timestamp } from 'drizzle-orm/mysql-core'

export const timers = mysqlTable('timers', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull(),
  name: text('name').notNull(),
  end_date: timestamp('end_date').notNull(),
  type: text('type', { enum: ['till', 'from'] }).notNull(),
  created_at: timestamp('created_at').defaultNow()
}) 