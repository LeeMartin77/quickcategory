import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { json } from "body-parser";
import express from "express";
import http from "http";
import qs from "qs";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const port = process.env.QUICKCATEGORY_PORT || 3012;

const app = express();
const httpServer = http.createServer(app);

type GQLContext = object;

const apollo = new ApolloServer<GQLContext>({
    typeDefs,
    resolvers,  
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.settings["query parser"] = qs.parse;

app.use(express.json());
app.use(express.static("./public"));

apollo.start().then(() => {
    app.use("/api/graphql", json(), expressMiddleware(apollo));

    app.get("/api/health", (req, res) => {
        res.send();
    });

    app.get("/api/*", (req, res) => {
        res.sendStatus(404);
    });

    app.get("/*", (req, res) => {
        res.sendFile("index.html", { root: "./public" });
    });

    const running = httpServer.listen(port, () => {
        console.log(`quickcategory listening on port ${port}`);

        const cleanup = () => {
            running.close();
            apollo.stop();
        };

        process.on("SIGTERM", cleanup);
        process.on("SIGINT", cleanup);
        process.on("exit", cleanup);
    });
});
