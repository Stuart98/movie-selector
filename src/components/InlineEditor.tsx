import { useState } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,

    Button,
    Input,
} from '@chakra-ui/react';

type Props = {
    isOpen: boolean;
    title: string | null;
    value: string;
    onSave: (value: string) => void;
    onClose: () => void;
};

export default function InlineEditor(props: Props) {
    const [value, setValue] = useState<string>(props.value);
    const onSave = () => {
        props.onSave(value);
        props.onClose();
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onInputChange', event.target.value);
        setValue(event.target.value);
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                {props.title && <ModalHeader>{props.title}</ModalHeader>}
                <ModalBody>
                    <Input value={value} onChange={onInputChange}></Input>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onSave}>
                        Save
                    </Button>
                    <Button onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}