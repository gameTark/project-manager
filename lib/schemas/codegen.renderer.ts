import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: "./src/components/*.graphql",
  generates: {
    "src/generated/renderer/gql.tsx": {
      // preset: 'client',
      plugins: [
        "typescript",
        "typescript-operations"
      ],
      config: {
        // withComponent: true,
        // withHOC: false,
        // withHooks: true,
        // avoidOptionals: true,
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
