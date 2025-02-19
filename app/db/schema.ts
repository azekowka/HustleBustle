import { serial, text, timestamp, boolean } from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core";

// Define the tasks table
export const tasks = mysqlTable("tasks", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Store user ID
  title: text("title").notNull(), // Task title
  dueDate: timestamp("due_date").notNull(), // Countdown deadline
  isCompleted: boolean("is_completed").default(false), // Task status
});
