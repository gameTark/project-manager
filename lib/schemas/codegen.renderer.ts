import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: "./src/components/*.ts",
  generates: {
    "src/generated/renderer/gql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations"
      ],
      config: {
        withComponent: true,
        withHOC: false,
        withHooks: true,
      }
    },
    "./graphql.schema.json": {
      plugins: [
        "introspection"
      ]
    },
  }
};

export default config;
