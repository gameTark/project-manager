import groupBy from "just-group-by";

import db from "../../../db/sqlite";
import { BaseDataLoader } from "./BaseDataLoader";
import { IProject, projectDataloader } from "./project";
import { ITag, tagDataloader } from "./tag";
import { createPrepareQuery } from "./utils";

interface ProjectTag {
  project_id: string;
  tag_id: string;
}
const getProjectByTagId = (tagIds: string[]): Promise<(IProject[] | Error)[]> => {
  const query = (size: number) =>
    `SELECT project_id, tag_id FROM tag_project WHERE tag_id IN (${createPrepareQuery(size)})`;

  return new Promise((resolve, reject) => {
    db.prepare(query(tagIds.length)).all<ProjectTag>(tagIds, async (err, row) => {
      if (err != null) {
        reject(err);
        return;
      }
      const p = groupBy(row, (e) => e.tag_id);
      Promise.all(
        tagIds.map((id) => Promise.all(p[id].map((val) => projectDataloader.load(val.tag_id)))),
      ).then((res) => {
        resolve(res);
      });
    });
  });
};

class ProjectByTagIdDataloader extends BaseDataLoader<ITag["id"], IProject[]> {
  protected async batchLoad(ids: Required<ITag>["id"][]): Promise<(IProject[] | Error)[]> {
    return getProjectByTagId(ids);
  }
}
export const projectByTagIdDataloader = new ProjectByTagIdDataloader();

const getTagByProjectId = (projectId: string[]): Promise<(ITag[] | Error)[]> => {
  return new Promise(async (resolve, reject) => {
    db.prepare(
      "SELECT project_id, tag_id FROM tag_project WHERE project_id IN (" +
        createPrepareQuery(projectId.length) +
        ")",
    ).all<ProjectTag>(projectId, (err, row) => {
      if (err != null) {
        reject(err);
        return;
      }
      const p = groupBy(row, (e) => e.project_id);
      Promise.all(
        projectId.map((id) => Promise.all(p[id].map((val) => tagDataloader.load(val.tag_id)))),
      ).then((res) => {
        resolve(res);
      });
    });
  });
};
class TagByProjectIdDataloader extends BaseDataLoader<IProject["id"], ITag[]> {
  protected async batchLoad(ids: Required<IProject>["id"][]): Promise<(ITag[] | Error)[]> {
    return getTagByProjectId(ids);
  }
}
export const tagByProjectIdDataloader = new TagByProjectIdDataloader();
