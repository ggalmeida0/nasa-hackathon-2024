import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/modal';
import { WiRaindrop, WiRaindrops } from 'react-icons/wi';

export default function ResultModal({ result }: { result: number[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderIcon = (value: number) => {
    if (value >= 100) {
      return <WiRaindrops className="icon" size={100} color="#00ffff" />;
    } else {
      return <WiRaindrop className="icon" size={100} color="#00ffff" />;
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ wrapper: '.result-modal' }} size="5xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">Farm Water Requirements</ModalHeader>
              <ModalBody>
                <div className="flex flex-row gap-3 mb-5">
                  {result.map((d, i) => (
                    <Card className="w-1/4" key={d + i} title="mm/dd/yyyy">
                      <CardHeader className="text-black">mm/dd/yyyy</CardHeader>
                      <CardBody>
                        {renderIcon(d)}
                        <p className="text-black">{`Water: \n${d}`}</p>
                        <p className="text-black">{`Costs: $xyz`}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
