import groupBy from "just-group-by";

import db from "../../../db/sqlite";
import { BaseDataLoader } from "./BaseDataLoader";
import { IProject, projectDataloader } from "./project";
import { ITag, tagDataloader } from "./tag";
import { createPrepareQuery } from "./utils";
import { createManyLoader, unwrap } from "./BaseRelation";

interface ProjectTag {
  project_id: string;
  tag_id: string;

  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}

const tagProjectByTagIdLoader = createManyLoader<ProjectTag['tag_id'], ProjectTag>({
  baseQuery: (size) => `SELECT project_id, tag_id FROM tag_project WHERE tag_id IN (${createPrepareQuery(size)})`,
  key: 'tag_id',
});

class ProjectByTagIdDataloader extends BaseDataLoader<Required<ITag>["id"], IProject[]> {
  protected async batchLoad(ids: Required<ITag>["id"][]): Promise<(IProject[])[]> {
    const tags = await tagProjectByTagIdLoader.loadMany(ids);
    const projects = tags.map(val => val.map(val => val.project_id))
    const result = await Promise.all(projects.map((val) => projectDataloader.loadMany(val)))
    return result;
  }
}
export const projectByTagIdDataloader = new ProjectByTagIdDataloader();

const targetTagByProjectIdLoader = createManyLoader<ProjectTag['tag_id'], ProjectTag>({
  baseQuery: (size) => `SELECT project_id, tag_id FROM tag_project WHERE project_id IN (${createPrepareQuery(size)})`,
  key: 'project_id',
});
class TagByProjectIdDataloader extends BaseDataLoader<Required<IProject>['id'], ITag[]> {
  protected async batchLoad(ids: Required<IProject>["id"][]): Promise<(ITag[][])> {
    const projects = await targetTagByProjectIdLoader.loadMany(ids);
    const tags = projects.map(val => val.map(val => val.tag_id))
    const result = await Promise.all(tags.map((val) => tagDataloader.loadMany(val)))
    return result;
  }
}
export const tagByProjectIdDataloader = new TagByProjectIdDataloader();
