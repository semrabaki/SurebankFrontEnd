import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const ConfirmDialog = (props) => {

    // I need to put async in here because it should wait the response of click
const deleteHandler=async()=>{
    props.delete();
}

  return (
    <div>
        <Modal isOpen={props.isOpen} centered fullscreen="sm" size="sm">
           <ModalHeader>
               Delete Recipient Confirmation
               </ModalHeader> 

            <ModalBody>
                {`Are you sure delete recipient with account number:${props.recipient.accountNumber}`}
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={deleteHandler}>Yes</Button>
                <Button color="primary" onClick={()=>props.close(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>


    </div>
  )
}

export default ConfirmDialog