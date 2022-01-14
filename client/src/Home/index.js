import React from "react";
import { GET_POSTS } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import PostCard from "../PostCard";

function Home() {
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(GET_POSTS);

  return (
    <div>
      <Grid columns="three" divided>
        <Grid.Row>
          {loading ? (
            <Segment style={{ display: "flex", margin: "15% auto" }}>
              <Dimmer active inverted>
                <Loader size="massive">Loading All Post.....</Loader>
              </Dimmer>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment>
          ) : (
            posts &&
            posts.map((post) => {
              return (
                <Grid.Column key={post.id} style={{marginBottom: 25}}>
                  <PostCard post={post} />
                </Grid.Column>
              );
            })
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
