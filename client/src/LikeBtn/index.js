import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label , Popup } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { LIKED_POST } from "../utils/mutations";

const style = {
  borderRadius: 5,
  opacity: 0.7,
};

function LikeBtn({ post, user }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && post.likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, post.likes]);

  const [likePost] = useMutation(LIKED_POST, {
    variables: { postId: post.id },
  });

  const likeBtn = user ? (
    liked ? (
      <Button color="blue">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="blue" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="blue" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Popup
      content={!liked ? "Like" : "dislike"}
      style={style}
      inverted
      trigger={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeBtn}
          <Label basic color="blue" pointing="left">
            {post.likes.length}
          </Label>
        </Button>
      }
    />
  );
}

export default LikeBtn;
