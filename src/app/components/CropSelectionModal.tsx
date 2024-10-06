import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem} from "@nextui-org/react";
import { useState } from "react";
import {CropType, GrowthStage} from "../croptable"

export default function CropSelectionModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <>
      <Button onPress={onOpen} className="leaflet-croptype-button" >Crop Type</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ wrapper: '.result-modal' }} >
        <ModalContent>
          {(onClose:() => void) => (
            <>
              <ModalHeader className="select-black-font">Crop Info</ModalHeader>
              <ModalBody>
                <Select label="Select Crop Type" className="select-black-font" >
                  {CropType.map((Crop, index) => (
                    <SelectItem key={index} value={Crop} className="select-black-font">
                      {Crop.charAt(0).toUpperCase() + Crop.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
                <Select label="Select Growth Stage" className="select-black-font">
                  {GrowthStage.map((Stage, index) => (
                    <SelectItem key={index} value={Stage} className="select-black-font">
                      {Stage}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}