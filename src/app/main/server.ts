import { ApolloServer } from "@apollo/server";
import { protocol } from "electron";
import defs from "schemas/schema.graphql?raw";

import { PROTOCOLS } from "../../constants/PROTOCOL";
import { MUTATIONS, QUERIES } from "../graphql/resolvers";

protocol.registerSchemesAsPrivileged([
  {
    scheme: PROTOCOLS.GQL,
    privileges: {
      supportFetchAPI: true,
    },
  },
]);
const server = new ApolloServer({
  typeDefs: defs,
  resolvers: {
    Query: QUERIES,
    Mutation: MUTATIONS,
  },
});

const startServer = () => {
  protocol.handle(PROTOCOLS.GQL, async (req: GlobalRequest) => {
    const reqData = await req.json();
    const data = (await server.executeOperation({
      query: reqData.query,
      variables: reqData.variables,
    })) as any;
    const res = new Response(JSON.stringify(data.body.singleResult));
    return res;
  });
};

export default startServer;
