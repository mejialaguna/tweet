const { User, Post } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthenticationError, UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validate");
const checkAuth = require("../utils/check-auth")

const { secret } = require("../config/connection");

function gToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    secret,
    { expiresIn: "1h" }
  );
}

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const post = await Post.find();
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(parents, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
            return post
        } else {
          throw new Error("post not found")
          }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async login(parents, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User doesnt exit";
        throw new UserInputError("Errors", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "wrong password";
        throw new UserInputError("wrong password", { errors });
      }
      const token = gToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      parents,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (username) {
        throw new UserInputError("username already exist", {
          errors: {
            username: " username already exist",
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = gToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();
      return post;
    },
  }
};
module.exports = resolvers;
