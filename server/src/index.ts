import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema, mergeSchemas } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import express from "express";
import qs from "qs";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";

const port = process.env.QUICKCATEGORY_PORT || 3012;

const typeDefs = `#graphql
  type Test {
    hello: String
  }

  type Query {
    test: Test!
  }

`;

const resolvers = {
  Query: {
    test: () => ({
      hello: "world",
    }),
  },
};
const neo4jTypedefs = `
  type Movie {
    title: String!
    year: Int
    plot: String
    actors: [Person!]! @relationship(type: "ACTED_IN", direction: IN)
  }

  type Person {
    name: String!
    movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
  }
`;

const driver = neo4j.driver(
  process.env.NEO4J_URI ?? "neo4j://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER ?? "neo4j",
    process.env.NEO4J_PASSWORD ?? "s3cr3tly"
  )
);

const neoSchema = new Neo4jGraphQL({ typeDefs: neo4jTypedefs, driver });

const customSchema = makeExecutableSchema({ typeDefs, resolvers });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer<any>({
    schema: mergeSchemas({
      schemas: [schema, customSchema],
    }),
  });

  const app = express();

  app.settings["query parser"] = qs.parse;

  app.use(express.json());
  app.use(express.static("./public"));

  server.start().then(() => {
    app.use("/api/graphql", json(), expressMiddleware(server));

    app.get("/api/health", (req, res) => {
      res.send();
    });

    app.get("/api/*", (req, res) => {
      res.sendStatus(404);
    });

    app.get("/*", (req, res) => {
      res.sendFile("index.html", { root: "./public" });
    });

    const running = app.listen(port, () => {
      console.log(`quickcategory listening on port ${port}`);

      const cleanup = () => {
        running.close();
        server.stop();
      };

      process.on("SIGTERM", cleanup);
      process.on("SIGINT", cleanup);
      process.on("exit", cleanup);
    });
  });
});
