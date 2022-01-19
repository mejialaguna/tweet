import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import { ADD_POST } from "../utils/mutations";
import { GET_POSTS } from "../utils/queries";


function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: "",
  });

  const [createPost, { error }] = useMutation(ADD_POST, {
    variables: values,
    update(cache, result) {
      const data = cache.readQuery({
        query: GET_POSTS,
      }); //getPost is the root query inside the cache on the apollo tools
      data.getPosts = [result.data.createPost, ...data.getPosts];
      cache.writeQuery({ query: GET_POSTS, data }); //where are we putting and which data we need to add
      values.body = "";
    },
  });

  function createPostCallBack() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2> Create Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Add a post"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="blue" disabled={!values.body}>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{marginBottom: 20}}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}
export default PostForm;
