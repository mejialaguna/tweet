const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");
require("dotenv").config()

const { MONGODB } = require("./connection");

const PORT = process.env.PORT || 3002;
const { typeDefs, resolvers } = require("./schemas");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req , pubsub})
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDb connected")
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server running @ ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })
