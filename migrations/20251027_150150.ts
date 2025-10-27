import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_incidents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_incidents\`("id", "title", "description", "updated_at", "created_at") SELECT "id", "title", "description", "updated_at", "created_at" FROM \`incidents\`;`)
  await db.run(sql`DROP TABLE \`incidents\`;`)
  await db.run(sql`ALTER TABLE \`__new_incidents\` RENAME TO \`incidents\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`incidents_updated_at_idx\` ON \`incidents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`incidents_created_at_idx\` ON \`incidents\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_incidents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_incidents\`("id", "title", "description", "updated_at", "created_at") SELECT "id", "title", "description", "updated_at", "created_at" FROM \`incidents\`;`)
  await db.run(sql`DROP TABLE \`incidents\`;`)
  await db.run(sql`ALTER TABLE \`__new_incidents\` RENAME TO \`incidents\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`incidents_updated_at_idx\` ON \`incidents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`incidents_created_at_idx\` ON \`incidents\` (\`created_at\`);`)
}
