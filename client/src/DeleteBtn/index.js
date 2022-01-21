import React , {useState} from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon , Confirm } from "semantic-ui-react";
import { DELETE_POST } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { useState } from "react";

function DeleteBtn(props) {
    const [ confirmOpen , setConfirmOpen ] =  useState(false)
  const { user, postId } = props;
  // console.log(postId)
  console.log(postId);

  function deleteOnePost() {
      const [deletePost] = useMutation(DELETE_POST, {
          update() {
              
        }
      variables: {
        postId: postId,
      },
    });
  }

  return (
    <Button
      as="div"
      color="red"
      floated="right"
      onClick={deleteOnePost}
    >
      <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
          open={confirmOpen}
          onCancel={()=> setConfirmOpen()}
  );
}

export default DeleteBtn;
