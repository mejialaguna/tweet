import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { LIKED_POST} from "../utils/mutations"


function LikeBtn({ post , user }) {
  const [liked, setLiked] = useState(false)
  
  useEffect(() => {
    if (user && post.likes.find(like => like.username === user.username)) {
      setLiked(true)
    }else setLiked(false)
  }, [user, post.likes])
  
  const [likePost] = useMutation(LIKED_POST, {
    variables: {postId: post.id}
  })
  
  const likeBtn = user ? (
    liked ? (
      <Button color="blue">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="blue" basic as={Link} to="/login">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );


  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeBtn}
      <Label basic color="blue" pointing="left">
        {post.likes.length}
      </Label>
    </Button>
  );
}

export default LikeBtn;
