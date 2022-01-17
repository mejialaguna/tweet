import React from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
function PostCard({ post }) {
  console.log(post)
  
    function likePost() {
        console.log("clicked")
    }
    function commentOnPost() {
      console.log("clicked");
    }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header>{post.username}</Card.Header>
        <Link to={`/posts/${post.id}`}>
          <Card.Meta>{moment(post.createdAt).fromNow(true)}</Card.Meta>
        </Link>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>
      <Card.Content extra style={{display: "inline-flex", justifyContent: "space-evenly"}}>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="blue" basic>
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {post.likes.length}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
            comments
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {post.comments.length}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
