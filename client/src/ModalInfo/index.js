import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import Login from "../Login";
import Register from "../Register";

function ModalInfo(props) {
  const { name, currentActiveItem } = props;
  const [open, setOpen] = useState(false);

  // console.log(currentActiveItem + "------------------");

  return (
    <Modal
      size="small"
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button style={{ background: "white" }}>{name}</Button>}
    >
      <Modal.Content>
        {currentActiveItem === "login" ? (
          <Login />
        ) : currentActiveItem === "register" ? (
          <Register  />
        ) : null}
      </Modal.Content>
      {/* <Modal.Actions>
        <Button onClick={() => setOpen(false)}>exit</Button>
      </Modal.Actions> */}
    </Modal>
  );
}

export default ModalInfo;
