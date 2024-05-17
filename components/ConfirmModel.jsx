import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";

export default function ConfirmModal({isDeleting,setDeleting,handleDeleteOperation,delId}) {
  //const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <div className="flex flex-col gap-2">
      
      <Modal 
        isOpen={isDeleting} 
        placement='center'
        isDismissable={false}
        hideCloseButton={true}
        size="sm"
        classNames={{
          header: "flex justify-center"
        }}
      >
        <ModalContent>
          
            <>
              <ModalHeader>
                Kindly confirm to delete
              </ModalHeader>
              <ModalBody>
                  <div className="flex justify-center">
                    <button type="button" onClick={()=>handleDeleteOperation(delId)} className="p-4 mr-2 h-8 bg-red-400
                     text-white hover:bg-red-600 rounded-md flex items-center drop-shadow-md font-bold">
                        Delete
                    </button>
                    <button type="button" onClick={()=>setDeleting(false)} className="p-4 mr-2 h-8 bg-yellow-400
                     text-white hover:bg-yellow-600 rounded flex items-center drop-shadow-md font-bold">
                        Cancel
                    </button>
                  </div>
              </ModalBody>
              <ModalFooter/>
            </>
          
        </ModalContent>
      </Modal>
    </div>
  );
}
