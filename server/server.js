const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
// const { authMiddleware } = require("./utils/auth");
const path = require("path");
 
const db = require("./config/connection");

const PORT = process.env.PORT || 3002;
const app = express();
const { typeDefs, resolvers } = require("./schemas");

const pubsub = new PubSub();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
  });

  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
};
startServer();
