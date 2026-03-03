import { getDb } from '@/lib/db';
import type { Component } from '@/types/components';
import crypto from 'crypto';

export interface PreviewRecord {
  id: string;
  name: string | null;
  components: Component[];
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
}

type RawPreviewRow = {
  id: string;
  name: string | null;
  data: string;
  createdAt: string | null;
  updatedAt: string | null;
  deleted: number | null;
  deletedAt: string | null;
};

const rowToPreview = (row: RawPreviewRow): PreviewRecord => ({
  id: row.id,
  name: row.name ?? null,
  components: JSON.parse(row.data) as Component[],
  createdAt: row.createdAt ?? '',
  updatedAt: row.updatedAt ?? row.createdAt ?? '',
  deleted: !!row.deleted,
  deletedAt: row.deletedAt ?? null,
});

const generatePreviewId = () => {
  // Short, URL-safe id using random bytes
  return crypto.randomBytes(6).toString('base64url');
};

export const createPreview = (
  components: Component[],
  name?: string | null
): PreviewRecord => {
  const db = getDb();

  const id = generatePreviewId();
  const data = JSON.stringify(components);
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO previews (id, name, data, created_at, updated_at, deleted, deleted_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, name ?? null, data, now, now, 0, null);

  return {
    id,
    name: name ?? null,
    components,
    createdAt: now,
    updatedAt: now,
    deleted: false,
    deletedAt: null,
  };
};

const SELECT_PREVIEW = `
  SELECT
    id, name, data,
    created_at as createdAt,
    updated_at as updatedAt,
    deleted,
    deleted_at as deletedAt
  FROM previews`;

export const getPreview = (id: string): PreviewRecord | null => {
  const db = getDb();
  const row = db.prepare(`${SELECT_PREVIEW} WHERE id = ?`).get(id) as RawPreviewRow | undefined;
  return row ? rowToPreview(row) : null;
};

const getPreviewByName = (name: string): PreviewRecord | null => {
  const db = getDb();
  const row = db.prepare(`${SELECT_PREVIEW} WHERE name = ?`).get(name) as RawPreviewRow | undefined;
  return row ? rowToPreview(row) : null;
};

export const getPreviewBySlug = (slug: string): PreviewRecord | null => {
  return getPreview(slug) ?? getPreviewByName(slug);
};

export const updatePreview = (id: string, components: Component[]): PreviewRecord => {
  const db = getDb();
  const data = JSON.stringify(components);
  const now = new Date().toISOString();

  const result = db
    .prepare(`UPDATE previews SET data = ?, updated_at = ? WHERE id = ?`)
    .run(data, now, id);

  if (result.changes === 0) {
    throw new Error(`Preview not found: ${id}`);
  }

  return getPreview(id) as PreviewRecord;
};

export const listPreviews = (): Pick<
  PreviewRecord,
  'id' | 'name' | 'createdAt' | 'updatedAt'
>[] => {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT
        id,
        name,
        created_at as createdAt,
        updated_at as updatedAt
       FROM previews
       WHERE deleted = 0 OR deleted IS NULL
       ORDER BY created_at DESC`
    )
    .all() as {
      id: string;
      name: string | null;
      createdAt: string | null;
      updatedAt: string | null;
    }[];

  return rows.map((row) => ({
    id: row.id,
    name: row.name ?? null,
    createdAt: row.createdAt ?? '',
    updatedAt: row.updatedAt ?? row.createdAt ?? '',
  }));
};

