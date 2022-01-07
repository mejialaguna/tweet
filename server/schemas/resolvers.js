const { User , Post } = require("../models")

const resolvers = {
  Query: {
    sayHi: () => "hello sexy papi",
  },
};
module.exports = resolvers