import { uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { pgTable} from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id:uuid("id").primaryKey().defaultRandom(),
    clerkId:text("").unique().notNull(),
    name:text("").notNull(),
    clerkImageUrl:text("image_url").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updated_at:timestamp("updated_at").defaultNow().notNull(),
}, 
(t)=>[uniqueIndex("clerk_id_idx").on(t.clerkId)]
)


export const Posts = pgTable("posts", {
    id:uuid("id").primaryKey().defaultRandom(),
    userId:uuid("userId").references(()=>users.id, {onDelete:'cascade'}).notNull(),
    title:text("").notNull(),
    description:text("").notNull(),
    postUrl:text("").notNull(),
    postKey:text("").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updated_at:timestamp("updated_at").defaultNow().notNull(),
})

