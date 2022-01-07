const { ApolloServer } = require("apollo-server");

const db = require("./config/connection");
const PORT = process.env.PORT || 3002;
const { typeDefs, resolvers } = require("./schemas");

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  db.once("open", () => {
    server.listen({ port: PORT }).then((res) => {
      console.log(`server running @ ${res.url}`);
    });
  });
};

startServer();
