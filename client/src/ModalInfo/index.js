import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import Login from "../Login";
import Register from "../Register";

function ModalInfo({ path }) {
  const [open, setOpen] = useState(false);

  console.log(path + "------------------");
  console.log(open);
  return (
    <Modal
      size="small"
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button style={{ background: "white" }}>Login</Button>}
    >
      <Modal.Content>
        {path === "login" ? <Login /> : path === "register" ? <Register />: null}
      </Modal.Content>
      {/* <Modal.Actions>
        <Button onClick={() => setOpen(false)}>exit</Button>
      </Modal.Actions> */}
    </Modal>
  );
}

export default ModalInfo;
