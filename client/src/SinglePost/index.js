import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { SINGLE_POST } from "../utils/queries";
import { useParams } from "react-router-dom";

function SinglePost(props) {
  //   const [currentPost, setCurrentPost] = useState({});
  const postId = useParams();
  console.log(postId);

    const { data } = useQuery(SINGLE_POST, {
      variables: {
        postId: {postId}
      },
    });
    console.log(data);

  //   const currentPost = getPosts.filter((post) => {
  //     return post.id === postId;
  //   });
    
  //   console.log(currentPost);
  // useEffect(() => {
  //   if (data) {
  //     setCurrentPost(data.find((post) => post.id === postId));
  //   }
  // }, [data ]);

  return <div></div>;
}

export default SinglePost;
