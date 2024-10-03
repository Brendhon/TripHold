"use client";

import { ActivityPhotos, TripAdvisorActivity } from "@app/models";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { getActivityDetail, getActivityPhotos } from "lib/activity/activity";
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ActivityDetails } from "./ActivityDetails";

interface Props {
  id: string;
  onlyView?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function ActivityModalDetails(props: Props) {
  // States
  const [activity, setActivity] = useState<TripAdvisorActivity>();
  const [photos, setPhotos] = useState<ActivityPhotos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
      getActivityDetail(props.id, locale)
        .then(setActivity)
        .catch(handleError)
    }
  }, [props.isOpen]);

  // Use effect to fetch activity photos
  useEffect(() => {
    if (activity) {
      getActivityPhotos(props.id, locale)
        .then(setPhotos)
        .catch(handleError)
        .finally(() => setLoading(false))
    }
  }, [activity]);

  // Handle error
  const handleError = (error: any) => {
    console.error(error);
    setActivity(undefined);
    setPhotos([]);
    setLoading(false);
  }

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose}>
      <ModalContent className="max-w-[800px]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{tModal('title.detailsOfTheActivity')}</ModalHeader>

            <ModalBody className="max-h-[500px] md:max-h-[700px] overflow-y-auto">
              {
                !loading && activity
                  ? <ActivityDetails activity={activity} photos={photos} />
                  : <Spinner size="lg" color="primary" />
              }

            </ModalBody>

            {
              props.onlyView ? (
                <ModalFooter>
                  <Button color="default" onPress={onClose}>
                    {tButton('back')}
                  </Button>
                </ModalFooter>
              ) :
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
            }
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
