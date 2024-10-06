import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem} from "@nextui-org/react";
import { useState } from "react";
import {CropType, GrowthStage} from "../croptable"

export default function CropSelectionModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedGrowthStage, setSelectedGrowthStage] = useState('');


  const handleCropSubmit = (cropType: string, growthStage: string) => {
    if (!selectedCrop) {
      alert('Please select a crop type.');
      return;
    }
    if (!selectedGrowthStage) {
      alert('Please select a growth stage.');
      return;
    }

    console.log('Selected Crop:', selectedCrop);
    console.log('Selected Growth Stage:', selectedGrowthStage);
  
    // If everything is valid, proceed to send data to backend or process it
  };

  return (
    <>
      <Button onPress={onOpen} className="leaflet-croptype-button" >Crop Type</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ wrapper: '.result-modal' }} >
        <ModalContent>
          {(onClose:() => void) => (
            <>
              <ModalHeader className="select-black-font">Crop Info</ModalHeader>
              <ModalBody>
                <Select
                  label="Select Crop Type"
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)} // Extract value from event target
                  className="select-black-font"
                >                  
                  {CropType.map((Crop) => (
                    <SelectItem key={Crop} value={Crop} className="select-black-font">
                      {Crop.charAt(0).toUpperCase() + Crop.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Select Growth Stage"
                  value={selectedGrowthStage}
                  onChange={(e) => setSelectedGrowthStage(e.target.value)} // Extract value from event target
                  className="select-black-font"
                >                  
                  {GrowthStage.map((Stage) => (
                    <SelectItem key={Stage} value={Stage} className="select-black-font">
                      {Stage}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleCropSubmit}>
                  Confirm
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}