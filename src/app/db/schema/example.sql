REPLACE INTO db_version(id, created_at, updated_at) VALUES (1, 10000, 10000);
REPLACE INTO icon(id, srcPath, name, created_at, updated_at) VALUES ('example', 'hogehoge', 'fugafuga', 10000, 10000);
REPLACE INTO icon(
  id,
  srcPath,
  name,
  created_at,
  updated_at
) VALUES (
  'example',
  './assets/spine_badge.svg',
  'fugafuga',
  10000,
  10000
);
REPLACE INTO project(id, title, description, sort, icon_id, created_at, updated_at) VALUES ('example', 'example-title', 'example-description', 1, 'example', 10000, 10000);
REPLACE INTO tag(id, name, color, created_at, updated_at) VALUES ('example', 'example-name', '#aaaaaa', 10000, 10000);
REPLACE INTO tag_project(project_id, tag_id, created_at, updated_at) VALUES ('example', 'example', 10000, 10000);
REPLACE INTO content(id, content_type, name, path, size, icon_id, project_id, created_at, updated_at) VALUES ('example', 'File', 'example-content', 'example-path', 0, 'example', 'example', 10000, 10000);