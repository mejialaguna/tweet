import React, { useContext } from "react";
import { Card, Image, Button, Icon, Label, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/auth";
import LikeBtn from "../LikeBtn";
import DeleteBtn from "../DeleteBtn";

const style = {
  borderRadius: 5,
  opacity: 0.7,
};


function PostCard({ post }) {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Popup
          content={`comment created ${moment(post.createdAt).fromNow()}`}
          key={post.username}
          header={post.username}
          style={style}
          inverted
          trigger={
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
            />
          }
        />

        <Card.Header>{post.username} </Card.Header>
        <Card.Meta as={Link} to={`/posts/${post.id}`}>
          {moment(post.createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeBtn post={post} user={user} />

        <Button labelPosition="right" as={Link} to={`/post/${post.id}`}>
          <Popup
            content="Click here to leave a comment"
            trigger={
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
            }
            style={style}
            inverted
          />

          <Label basic color="blue" pointing="left">
            {post.comments.length}
          </Label>
        </Button>

        {/* i am comparing the username coming from authcontext and the post.username coming from the props thaat we are receiving from the home conponent */}
        {user && user.username === post.username && (
          <DeleteBtn user={user} postId={post.id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
