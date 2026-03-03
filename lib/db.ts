import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

export const getDb = () => {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'data.sqlite');
    db = new Database(dbPath);

    db.pragma('journal_mode = WAL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS previews (
        id TEXT PRIMARY KEY,
        name TEXT,
        data TEXT NOT NULL,
        created_at TEXT,
        updated_at TEXT,
        deleted INTEGER DEFAULT 0,
        deleted_at TEXT
      )
    `);

    // Lightweight, in-place migration for existing databases to ensure all columns exist.
    const existingColumns = db
      .prepare(`PRAGMA table_info(previews)`)
      .all() as { name: string }[];
    const existingNames = new Set(existingColumns.map((c) => c.name));

    const addColumnIfMissing = (column: string, definition: string) => {
      if (!existingNames.has(column)) {
        db!.exec(`ALTER TABLE previews ADD COLUMN ${definition}`);
      }
    };

    addColumnIfMissing('name', 'name TEXT');
    addColumnIfMissing('created_at', 'created_at TEXT');
    addColumnIfMissing('updated_at', 'updated_at TEXT');
    addColumnIfMissing('deleted', 'deleted INTEGER DEFAULT 0');
    addColumnIfMissing('deleted_at', 'deleted_at TEXT');
    // Ensure there is no unique constraint on preview names.
    db.exec(`DROP INDEX IF EXISTS idx_previews_name`);
  }

  return db;
};

