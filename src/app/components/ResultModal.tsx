import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/modal';
import { WiRaindrop, WiRaindrops } from 'react-icons/wi';
import Lottie from 'react-lottie';
import * as animationData from '@/app/animations/water.json'
import { useEffect } from 'react';
import { WaterUsage } from './Map';
import { isEmpty } from 'lodash';

export default function ResultModal({ result, loading }: { result?: WaterUsage, loading: boolean }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderIcon = (value: number) => {
    if (value >= 100) {
      return <WiRaindrops className="icon" size={100} color="#00ffff" />;
    } else {
      return <WiRaindrop className="icon" size={100} color="#00ffff" />;
    }
  };

  useEffect(() => {
    if (loading || !isEmpty(result)) {
      onOpen()
    }

  },[loading, result, onOpen])

  const lottieOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
  }

  const today = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  });

  function litersToAcreFeet(liters) {
  const conversionFactor = 8.1071319378991E-7;
  const result = liters * conversionFactor;
  return Number(result.toFixed(2));
}




  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ wrapper: '.result-modal' }} size="5xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">Farm Water Requirements</ModalHeader>
              <ModalBody>
                {loading ?
                <div className="flex flex-col justify-center items-center">
                <Lottie options={lottieOptions}
               height={400}
              width={400} 
                />
              <h1 className="text-black">We are getting your watering schedule... hang tight! </h1>
                </div>
                :
                <>
                  <h1 className="text-black">We have calculated your total water needs per day and how long you need to use your irrigation system.</h1>
                  <h1 className="text-black">We assume you will turn on the irrigation system at 10pm, below are the times you need to stop it. Water units are in acre-foot</h1>
                 <div className="flex flex-row gap-3 mb-5">
                  {result?.waterUsage.map((d, i) => (
                    <Card className="w-1/4" key={d + i} title="mm/dd/yyyy">
                      <CardHeader className="text-black ml-5">{week[i]}</CardHeader>
                      <CardBody className="p-2">
                        {renderIcon(d)}
                        <p className="text-black">{`Water: \n${litersToAcreFeet(d)}`}</p>
                        <p className="text-black">{`End time: ${result?.timeToEnd[i]}`}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div> <h1 className="text-black"></h1>
                </>
                }
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
