import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import express from "express";
import qs from "qs";

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

const server = new ApolloServer<any>({
  typeDefs,
  resolvers,
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
