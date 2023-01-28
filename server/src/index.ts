import express from "express";
import qs from "qs";

const port = process.env.QUICKCATEGORY_PORT || 3012;

const app = express();

app.settings["query parser"] = qs.parse;

app.use(express.json());
app.use(express.static("./public"));

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
  };

  process.on("SIGTERM", cleanup);
  process.on("SIGINT", cleanup);
  process.on("exit", cleanup);
});
