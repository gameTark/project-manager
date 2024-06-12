import { join } from "path";
import { app } from "electron";
import { type sqlite3 } from "sqlite3";

// import { type RunResult } from 'sqlite3'
// import query from './schema/example.sql?raw'
// import table from './schema/project.sql?raw'
const sqlite: sqlite3 = require("sqlite3").verbose();
const db = new sqlite.Database(join(app.getAppPath(), "./sql.db"));
db.serialize(() => {
  // table.split(';').forEach(val => {
  //   db.run(val, (result: RunResult) => {
  //     console.log(result)
  //   });
  // })
  // query.split(';').forEach((val) => {
  //   if (val === '') return;
  //   db.run(val, (result: RunResult) => {
  //     console.log(result)
  //   });
  // })
});

export default db;
