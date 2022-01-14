import gql from "graphql-tag";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      username
      id
      body
      createdAt
      __typename
      comments {
        id
        username
        createdAt
        body
        __typename
      }
      likes {
        id
        username
        createdAt
        __typename
      }
    }
  }
`;
