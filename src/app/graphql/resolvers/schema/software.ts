import { randomUUID } from "crypto";
import * as yup from "yup";

import { idScala } from "./scala";

interface ISoftware {
  id?: string;
  path: string;
  icon_id: string;
  args?: string[];

  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
const softwareSchema: yup.ObjectSchema<ISoftware> = yup.object({
  id: idScala.default(randomUUID()),
  path: yup.string().required(),
  icon_id: yup.string().required(),
  args: yup.array(yup.string().required()).default([]),

  createdAt: yup.number().default(Date.now()),
  updatedAt: yup.number().default(Date.now()),
  deletedAt: yup.number(),
});
export const software = (args: any) => {
  const value = softwareSchema.cast(args);
  return {
    resolver: () => {
      return {
        ...value,
      };
    },
  };
};
