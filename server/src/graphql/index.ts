import { ApolloServer } from "@apollo/server";

import typeDefs from "./schema"
import resolvers from "./resolvers";
export const server = new ApolloServer<any>({
    typeDefs,
    resolvers,
  });
export default server;