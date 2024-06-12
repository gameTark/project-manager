import { randomUUID } from "crypto";
import * as yup from "yup";

import { idScala } from "./scala";

interface ISoftware {
  id?: string;
  path: string;
  icon_id: string;
  args?: string[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
const softwareSchema: yup.ObjectSchema<ISoftware> = yup.object({
  id: idScala.default(randomUUID()),
  path: yup.string().required(),
  icon_id: yup.string().required(),
  args: yup.array(yup.string().required()).default([]),

  createdAt: yup.date().default(new Date()),
  updatedAt: yup.date().default(new Date()),
  deletedAt: yup.date(),
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
