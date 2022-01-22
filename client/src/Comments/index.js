import React from "react";
import { Card,  Comment } from "semantic-ui-react";
import moment from "moment";
import DeleteBtn from "../DeleteBtn";

function Comments(props) {
  const { getPost, user } = props;
    console.log(getPost);
    
  return (
    <div>
      {getPost.comments.map((comment) => { 
        return (
          <Card fluid key={comment.id}>
            <Card.Content>
              {user && user.username === comment.username && ( 
                <DeleteBtn postId={getPost.id} commentId={comment.id} />
              )}
              <Card.Header>{comment.username} </Card.Header>
              <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
              <Card.Description> {comment.body}</Card.Description>
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
}

export default Comments;
