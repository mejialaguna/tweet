import React,{useState} from "react";
import { Button, Modal } from "semantic-ui-react";


function ModalInfo({ modalOpen,  name }) {
  const [open, setOpen] = useState(modalOpen);
  console.log(open);
  return (
    <Modal
      centered={false}
      open={open}
      // onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>{name}</Button>}
    >
      <Modal.Header>Thank you!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Your subscription has been confirmed
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalInfo