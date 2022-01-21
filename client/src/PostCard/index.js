import React, { useContext } from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/auth";
import LikeBtn from "../LikeBtn";

function PostCard({ post }) {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header>{post.username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${post.id}`}>
          {moment(post.createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        
        <LikeBtn post={post} user={user} />

        <Button
          labelPosition="right"
          as={Link}
          to={`/post/${post.id}`}
        >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {post.comments.length}
          </Label>
        </Button>
        {/* i am comparing the username coming from authcontext and the post.username coming from the props thaat we are receiving from the home conponent */}
        {user && user.username === post.username && (
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => console.log("clicked")}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
