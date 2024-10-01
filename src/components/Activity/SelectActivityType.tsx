"use client";

import { ActivityTransportType, ActivityType } from "@app/models";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Select } from "components/Form";
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (type: ActivityType, subType?: ActivityTransportType) => void;
}

export function SelectActivityType(props: Props) {
  // States
  const [type, setType] = useState<ActivityType>();
  const [subType, setSubType] = useState<ActivityTransportType>();

  // Translations
  const tButton = useTranslations('Button');
  const tModal = useTranslations('Modal');

  // Type options
  const typeOptions = Object.values(ActivityType).map((type) => ({ key: type, name: tModal(`activityType.${type}`) }));

  // Sub type options
  const subTypeOptions = Object.values(ActivityTransportType).map((type) => ({ key: type, name: tModal(`transportType.${type}`) }));

  // Close modal
  const handleClose = () => {
    setType(undefined);
    setSubType(undefined);
    props.onClose();
  }

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose}>
      <ModalContent className="max-w-[600px]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{tModal(`title.whichWillBeTheActivity`)}</ModalHeader>

            <ModalBody className="gap-0">
              <Select
                placeholder="selectActivityType"
                handleChange={(e) => setType(e.target.value)}
                options={typeOptions}
                controller={type} />

              {type && <p className="text-sm mb-3 text-justify">{tModal(`activityDesc.${type}`)}</p>}

              {type === 'transport' && (
                <Select
                  placeholder="selectTransportType"
                  handleChange={(e) => setSubType(e.target.value)}
                  options={subTypeOptions}
                  controller={subType} />
              )}
            </ModalBody>

            <ModalFooter>
              <Button color="default" onPress={onClose}>
                {tButton('cancel')}
              </Button>
              <Button
                isDisabled={!type || (type === 'transport' && !subType)}
                color="primary"
                onPress={() => props.onSubmit(type!, subType)}>
                {tButton('confirm')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
