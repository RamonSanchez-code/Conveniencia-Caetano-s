import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Leads capturados pelo formulário "Ofertas direto no seu WhatsApp"
 * da seção de CTA comercial.
 */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
