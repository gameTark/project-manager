import { resolve } from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// データベースのスキーマを定義
interface DbSchema {
  posts: Array<{ id: number; title: string; published: boolean }>;
  user: { name: string; age: number };
}

// JSONファイルを使ったアダプタの作成

const adapter = new JSONFile<DbSchema>(resolve("dist", "db.json"));
const db = new Low<DbSchema>(adapter, { posts: [], user: { name: "", age: 0 } });

// データベースを初期化する非同期関数
const initializeDb = async () => {
  await db.read();
  // デフォルト値を設定
  if (db.data != null) return;
  db.data ||= { posts: [], user: { name: "", age: 0 } };
  await db.write();
};

export default {
  db,
  initialized: initializeDb(),
};
export type { DbSchema };
