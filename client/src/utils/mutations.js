import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      createdAt
      token
    }
  }
`;

export const ADD_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      __typename
      likes {
        id
        username
        createdAt
        __typename
      }
      comments {
        id
        username
        body
        createdAt
        __typename
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const LIKED_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      username
      body
      createdAt
      __typename
      likes {
        id
        username
        createdAt
        __typename
      }
    }
  }
`;
