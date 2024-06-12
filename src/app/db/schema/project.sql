CREATE TABLE db_version (
  id INTEGER PRIMARY KEY,

  created_at INTEGER,
  updated_at INTEGER,
  deleted_at INTEGER
);
CREATE INDEX db_version_deleted_at ON db_version (deleted_ad);

CREATE TABLE icon (
  id TEXT PRIMARY KEY,
  srcPath TEXT NOT NULL,
  name TEXT,

  created_at INTEGER,
  updated_at INTEGER,
  deleted_at INTEGER
);
CREATE INDEX icon_deleted_at ON icon (deleted_ad);

CREATE TABLE project (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  sort INTEGER,
  icon_id TEXT,

  created_at INTEGER,
  updated_at INTEGER,
  deleted_at INTEGER
);
CREATE INDEX project_deleted_at ON project (deleted_ad);

CREATE TABLE tag (
  id TEXT PRIMARY KEY,
  name TEXT,
  color TEXT,-- #FFFFFF

  created_at INTEGER,
  updated_at INTEGER,
  deleted_at INTEGER
);
CREATE INDEX tag_deleted_at ON tag (deleted_ad);

CREATE TABLE tag_project (
  project_id TEXT,
  tag_id TEXT,

  created_at INTEGER,
  updated_at INTEGER,
  deleted_at INTEGER,
  PRIMARY KEY(project_id, tag_id)
);
CREATE INDEX tag_project_deleted_at ON tag_project (deleted_at);

CREATE TABLE content (
  id TEXT PRIMARY KEY,
  content_type TEXT, -- enum Directory File Software Link
  name Text,
  path TEXT,
  size INTEGER,

  icon_id TEXT,
  project_id TEXT,

  created_at INTEGER,
  updated_at INTEGER,
  deleted_at INTEGER
);
CREATE INDEX content_project_id ON content (project_id);
CREATE INDEX content_deleted_at ON content (deleted_at);
