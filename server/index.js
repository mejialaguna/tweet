const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
// require("dotenv").config()

const { MONGODB } = require("./config.js");

const PORT = process.env.PORT || 3002;
const { typeDefs, resolvers } = require("./schemas");

// const pubsub = new PubSub();
    
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDb connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server running @ ${res.url}graphql`);
  })
  .catch(err => {
    console.error(err)
  })
