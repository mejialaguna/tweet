const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config/connection");

const PORT = process.env.PORT || 3002;
const { typeDefs, resolvers } = require("./schemas");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDb connected")
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server running @ ${res.url}`);
  });
