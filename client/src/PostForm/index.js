import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import { ADD_POST } from "../utils/mutations";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: "",
  });

  const [createPost, { error }] = useMutation(ADD_POST, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.body = "";
    },
  });

  function createPostCallBack() {
    createPost();
  }
  return (
    <Form onSubmit={onSubmit}>
      <h2> Create Post</h2>
      <Form.Field>
        <Form.Input
          placeholder="hello"
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit" color="blue">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}
export default PostForm;
