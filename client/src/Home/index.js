import React, { useContext } from "react";
import { GET_POSTS } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import {
  Grid,
  Dimmer,
  Loader,
  Image,
  Segment,
  GridColumn,
  Transition,
} from "semantic-ui-react";
import PostCard from "../PostCard";
import { AuthContext } from "../utils/auth";
import PostForm from "../PostForm";

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(GET_POSTS);

  return (
    <div>
      <Grid columns="2" divided>
          {user && (
            <GridColumn >
              <PostForm />
            </GridColumn>
          )}
        <Grid.Row>
          {loading ? (
            <Segment style={{ display: "flex", margin: "15% auto" }}>
              <Dimmer active inverted>
                <Loader size="massive">Loading All Post.....</Loader>
              </Dimmer>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment>
          ) : (
            <>
              <Transition.Group>
                {posts &&
                  posts.map((post) => {
                    return (
                      <Grid.Column key={post.id} style={{ marginBottom: 25 }}>
                        <PostCard post={post} />
                      </Grid.Column>
                    );
                  })}
              </Transition.Group>
            </>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
