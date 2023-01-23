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
    initialValue: string;
    onSave: (value: string) => void;
    onClose: () => void;
};

export default function InlineEditor({ initialValue, title, isOpen, onSave, onClose }: Props) {
    const [value, setValue] = useState<string>(initialValue); // stores the field's value

    // handler for the click on the Save button
    const onSaveClick = () => {
        onSave(value);
        onClose();
    };

    // handler for the onChange event of the input field.
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {title && <ModalHeader>{title}</ModalHeader>}
                <ModalBody>
                    <Input value={value} onChange={onInputChange}></Input>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onSaveClick}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}