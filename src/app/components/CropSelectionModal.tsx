import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import { CropType, GrowthStage } from '../croptable';
import { useState } from 'react';

interface CropSelectionModalProps {
  onSubmit: (cropType: string, growthStage: string) => void;
}

export default function CropSelectionModal({ onSubmit }: CropSelectionModalProps)  {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedGrowthStage, setSelectedGrowthStage] = useState('');

  const handleConfirm = () => {
    if (!selectedCrop || !selectedGrowthStage) {
      alert('Please select both crop type and growth stage.');
      return;
    }
    onSubmit(selectedCrop, selectedGrowthStage);
  };

  return (
    <>
      <Button onPress={onOpen} className="leaflet-croptype-button">
        Crop Type
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ wrapper: '.result-modal' }}>
        <ModalContent>
          {(onClose: () => void) => (
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
                <Select label="Select Irrigation Type" className="select-black-font">
                  {['Surface', 'Sprinkler', 'Drip', 'Subsurface'].map((type, index) => (
                    <SelectItem key={index + type} value={type} className="select-black-font">
                      {type}
                    </SelectItem>
                  ))}
                </Select>
                <Input type="text" label="Irrigation water flow in gallons / minute" />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleConfirm}>
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
