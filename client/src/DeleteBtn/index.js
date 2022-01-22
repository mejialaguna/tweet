import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { DELETE_POST } from "../utils/mutations";
import { GET_POSTS } from "../utils/queries";
import { DELETE_COMMENT } from "../utils/mutations";
import "./index.css";

function DeleteBtn(props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { postId, refreshDelete, commentId } = props;
  // console.log(postId)
  console.log(postId);

  const [deleteOnePost] = useMutation(
    commentId && postId ? DELETE_COMMENT : DELETE_POST,
    {
      update(cache) {
        if (!commentId) {
          setConfirmOpen(false);
          const data = cache.readQuery({
            query: GET_POSTS,
          });
          data.getPosts = data.getPosts.filter(
            (SinglePost) => SinglePost.id !== postId
          );
          cache.writeQuery({ query: GET_POSTS, data });
        }
        refreshDelete && refreshDelete();
      },
      variables: {
        postId: postId,
        commentId: commentId,
      },
    }
  );

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        className="confirmText"
        open={confirmOpen}
        content={"are you sure you want to delete this post"}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteOnePost}
      />
    </>
  );
}

export default DeleteBtn;
