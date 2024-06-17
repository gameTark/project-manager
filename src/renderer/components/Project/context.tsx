import { createContext, ReactNode, useContext } from "react";
import { dayjs } from "@utils/dayjs";
import { RecursivePartial } from "@utils/type";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  InsertProjectMutationVariables,
  UpdateProjectMutationVariables,
  type Project as TProject,
} from "schemas/src/generated/renderer/gql";

import { Content } from "../Content/context";
import { Icon as IconContext } from "../Icon/context";
import { Tag } from "../Tags/context";

const ProjectContext = createContext<RecursivePartial<TProject> | null>(null);

const useProjectContext = () => useContext(ProjectContext);

// name: Scalars['String']['input'];
// iconId: Scalars['ID']['input'];
// description?: InputMaybe<Scalars['String']['input']>;
// sort?: InputMaybe<Scalars['String']['input']>;
const CreateProvider = (props: { children: ReactNode }) => {
  const methods = useForm<InsertProjectMutationVariables>();
  const onSubmit = (data: any) => console.log(data);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{props.children}</form>
    </FormProvider>
  );
};

const Name = () => {
  const { register } = useFormContext<
    InsertProjectMutationVariables | UpdateProjectMutationVariables
  >(); // retrieve all hook methods
  return <input type="text" {...register("name")} />;
};

const Title = (): ReactNode => useProjectContext()?.title;
const Description = (): ReactNode => useProjectContext()?.description;
const UpdatedAt = (props: { format: string }): ReactNode => {
  const updatedAt = useProjectContext()?.updatedAt;
  if (updatedAt == null) return null;
  return dayjs(updatedAt).format(props.format || "YYYY/MM/DD");
};
const IconProvider = (props: { children?: ReactNode }): ReactNode => {
  const icon = useProjectContext()?.icon;
  if (icon == null) return null;
  return <IconContext.Provider value={icon}>{props.children}</IconContext.Provider>;
};

const TagListProvider = (props: { children?: ReactNode }): ReactNode => {
  const tags = useProjectContext()?.tags;
  if (tags == null) return null;
  return (
    <>
      {tags.map((tag) => (
        <Tag.Provider key={tag?.id} value={tag || null}>
          {props.children}
        </Tag.Provider>
      ))}
    </>
  );
};

const ContentListProvider = (props: { children?: ReactNode }): ReactNode => {
  const contents = useProjectContext()?.contents;
  if (contents == null) return null;
  return (
    <>
      {contents.map((content) => (
        <Content.Provider key={content?.id} value={content || null}>
          {props.children}
        </Content.Provider>
      ))}
    </>
  );
};

export const Project = {
  Title,
  Description,
  UpdatedAt,
  IconProvider,
  TagListProvider,
  Name,
  ContentListProvider,
  Editor: {
    create: {
      CreateProvider,
    },
  },
  Provider: ProjectContext.Provider,
};
