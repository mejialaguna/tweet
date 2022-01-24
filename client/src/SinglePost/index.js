import React, { useContext, useState } from "react";
import { Button, Card, Icon, Label, Popup } from "semantic-ui-react";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import { GET_SINGLE_POST } from "../utils/queries";
import { useParams } from "react-router-dom";
import { AuthContext } from "../utils/auth";
import { Grid, Dimmer, Loader, Image, Form ,  Segment } from "semantic-ui-react";
import LikeBtn from "../LikeBtn";
import DeleteBtn from "../DeleteBtn";
import Comments from "../Comments";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_COMMENT } from "../utils/mutations";

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  
  const { postId } = useParams();
  //   const postId2 = props.match.params.postId;

  const { loading, data: { getPost } } = useQuery(GET_SINGLE_POST, {
    variables: {
      postId: postId
    },
  });

  const [ comment , setComment] = useState("")

  const [makeComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("")
    },
    variables: {
      postId: postId,
      body: comment,
    }
  })


  function refreshDelete() {
    props.history.push("/");
  }

  return (
    <div>
      {loading ? (
        <Segment style={{ display: "flex", margin: "15% auto" }}>
          <Dimmer active inverted>
            <Loader size="massive">Loading All Post.....</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      ) : (
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image
                style={{ width: "100px" }}
                floated="right"
                size="mini"
                src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{getPost.username}</Card.Header>
                  <Card.Meta>{moment(getPost.createdAt).fromNow()} </Card.Meta>
                  <Card.Description> {getPost.body} </Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  
                  <LikeBtn user={user} post={getPost} />

                  <Popup
                    content="comment down bellow"
                    trigger={
                      <Button
                        as="div"
                        labelPosition="right"
                        onClick={() => console.log("comment post")}
                      >
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                          {getPost.comments.length}
                        </Label>
                      </Button>
                    }
                  />

                  {user && user.username === getPost.username && (
                    <DeleteBtn
                      postId={getPost.id}
                      refreshDelete={refreshDelete}
                    />
                  )}
                </Card.Content>
              </Card>

              {user && (
                <Card fluid>
                  <Card.Content>
                    <p> post comments...</p>
                    <Form>
                      <div>
                        <input
                          input="text"
                          placeholder="comments"
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                          style={{ marginTop: 10 }}
                          type="submit"
                          className="ui button blue"
                          disabled={!comment}
                          onClick={makeComment}
                        >
                          {" "}
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}

              <Comments getPost={getPost} user={user} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
}

export default SinglePost;
