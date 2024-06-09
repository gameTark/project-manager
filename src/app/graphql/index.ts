import { buildSchema, graphql } from "graphql";
import typeDefs from "schemas/schema.graphql?raw";

import resolver from "./resolvers";

const schema = buildSchema(typeDefs);
export const graphqlServer = (query: string, variables: { [key in string]: any }) => {
  return graphql({
    schema,
    source: query,
    rootValue: resolver,
    variableValues: variables,
  });
};
