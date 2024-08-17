"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Input } from "components/Form/Input";
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  text: string;
  hidden?: boolean;
  modal: {
    title: string;
    requiredPassword?: boolean;
    body: string;
  };
  action: (password?: string) => Promise<void> | void;
}

export function DeleteButton(props: Props) {
  // Loading
  const [loading, setLoading] = useState(false);

  // Password - Get from target value
  const [password, setPassword] = useState('');

  // Modal states
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


  // Translations
  const t = useTranslations('Button');
  const tModal = useTranslations('Modal');

  // Handle change
  const handleChange = (e: any) => setPassword(e.target.value);

  // Handle submit
  const handleSubmit = async () => {
    // Check if password is required and not empty
    if (props.modal.requiredPassword && !password) return;

    // Close modal
    onClose();

    // Set loading
    setLoading(true);

    console.log('password:', password);

    // Submit form if valid
    await props.action(password);

    // Set loading
    setLoading(false);
  }

  return (!props.hidden &&
    <div className="my-3">
      <Button
        isLoading={loading}
        color="warning"
        onClick={onOpen}
        startContent={<FaTrashAlt />}
        type="button">
        {t(props.text)}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{tModal(`title.${props.modal.title}`)}</ModalHeader>

              <ModalBody>
                <p className="text-sm">{tModal(`message.${props.modal.body}`)}</p>

                {
                  props.modal.requiredPassword &&
                  <>
                    <span className="font-semibold">{tModal('password')}</span>
                    <Input name="password" type="password" handleChange={handleChange} placeholder="password" />
                  </>
                }

              </ModalBody>

              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  {t('cancel')}
                </Button>
                <Button
                  isDisabled={props.modal.requiredPassword && !password}
                  color="warning"
                  onPress={handleSubmit}>
                  {t(props.text)}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
