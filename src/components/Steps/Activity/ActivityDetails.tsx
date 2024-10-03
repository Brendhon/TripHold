"use client";

import { TripAdvisorActivity } from "@app/models";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { getActivityDetail } from "lib/activity/activity";
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function ActivityDetails(props: Props) {
  // States
  const [activity, setActivity] = useState<TripAdvisorActivity>();

  // Translations
  const tButton = useTranslations('Button');
  const tModal = useTranslations('Modal');

  // Use locale
  const locale = useLocale();

  // Close modal
  const handleClose = () => {
    setActivity(undefined);
    props.onClose();
  }

  // Fetch activity detail
  useEffect(() => {
    // Get activity detail if modal is open
    if (props.isOpen) {
      getActivityDetail(props.id, locale)
        .then(setActivity)
        .catch(console.error)
    }
  }, [props.isOpen]);

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose}>
      <ModalContent className="max-w-[600px]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{tModal('title.detailsOfTheActivity')}</ModalHeader>

            <ModalBody>
              {
                activity ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">{activity.name}</p>
                  </div>
                ) : (
                  <Spinner size="lg" color="primary" />
                )
              }

            </ModalBody>

            <ModalFooter>
              <Button color="default" onPress={onClose}>
                {tButton('cancel')}
              </Button>
              <Button
                color="primary"
                onPress={() => props.onSubmit()}>
                {tButton('select')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
