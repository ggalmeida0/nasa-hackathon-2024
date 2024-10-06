import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

export type LatLong = {
  lat: number;
  long: number;
};

export default function SetFarmLocationButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [latLong, setLatLong] = useState<Partial<LatLong>>();
  const [validState, setValidationState] = useState<boolean>(false);
  const map = useMap();

  useEffect(() => {
    const isValid = !!latLong?.lat && !!latLong?.long && !isNaN(latLong.lat) && !isNaN(latLong.long);
    setValidationState(isValid);
  }, [latLong]);

  return (
    <>
      <Button onPress={onOpen} className="leaflet-set-location-button">
        Set Farm Location
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ wrapper: '.result-modal' }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="select-black-font">Crop Info</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  inputMode="decimal"
                  label="Enter Lat"
                  onChange={(e) => setLatLong({ ...latLong, lat: parseFloat(e.target.value) })}
                />
                <Input
                  type="text"
                  label="Enter Long"
                  onChange={(e) => setLatLong({ ...latLong, long: parseFloat(e.target.value) })}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  disabled={!validState}
                  onClick={() => {
                    map.setView([latLong!.lat as number, latLong!.long as number], 13);
                    onClose();
                  }}
                >
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
