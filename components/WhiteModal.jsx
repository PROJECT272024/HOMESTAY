import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Spinner} from "@nextui-org/react";

export default function WhiteModal({status,title}) {
  //const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <div className="flex flex-col gap-2">
      
      <Modal 
        isOpen={status} 
        placement='center'
        isDismissable={false}
        hideCloseButton={true}
        size="xs"
        classNames={{
        }}
      >
        <ModalContent className="">
          
            <>
              <ModalHeader/>
              <ModalBody className="align-middle">
                    <Spinner label={title} color="primary" size="lg"/>
              </ModalBody>
              <ModalFooter/>
            </>
          
        </ModalContent>
      </Modal>
    </div>
  );
}
