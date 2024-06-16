import { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { InsertProjectMutationVariables } from "schemas/src/generated/renderer/gql";

const Provider = (props: { children: ReactNode }) => {
  const methods = useForm<InsertProjectMutationVariables>();
  const onSubmit = (data: any) => console.log(data);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{props.children}</form>
    </FormProvider>
  );
};

const Name = () => {
  const { register } = useFormContext<InsertProjectMutationVariables>();
  return <input type="text" {...register("name")} />;
};

const Description = () => {
  const { register } = useFormContext<InsertProjectMutationVariables>();
  return <input type="text" {...register("description")} />;
};

// icon select
// const Description = () => {
//   const { register } = useFormContext<InsertProjectMutationVariables>();
//   return <input type="text" {...register("iconId")} />;
// };


export const InsertProject = {
  CreateProvider: Provider,
  Name,
  Description,
};
