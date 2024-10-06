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
import { useMap } from 'react-leaflet';
import L, { DrawMap } from 'leaflet';
import 'leaflet-draw';
import Chat from './chatBot';
import { PiPlant } from "react-icons/pi";

export type ChatBotModalProps = {
    cropType: string, growthStage: string, irrigationType: string, waterFlow: string
}

export default function ChatBotModal({ irrigationType, cropType, growthStage, waterFlow }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className='.chatbot-modal'>
                <Button onPress={onOpen} className="leaflet-sproutai-button">
                    Sprout AI <PiPlant color="green"/>
                </Button>
                <Modal scrollBehavior={"inside"} isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ wrapper: '.chatbot-modal' }}>
                    <ModalContent>
                        {(onClose: () => void) => (
                            <>
                                <ModalHeader className="select-black-font">Sprout AI <PiPlant color="green" className="ml-3"/></ModalHeader>
                                <ModalBody>
                                    <Chat irrigationType={irrigationType} cropType={cropType} growthStage={growthStage} waterFlow={waterFlow} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}
