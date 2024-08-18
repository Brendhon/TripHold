"use client";

import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useUserAvatar } from '@utils/session';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IoCamera } from 'react-icons/io5';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Props {
  uploadAvatar: (blob: Blob) => void;
}

/**
 * Avatar Cropper
 */
export function AvatarCropper(props: Props) {
  // State
  const [hover, setHover] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [image, setImage] = useState<string>();
  const [avatar, setAvatar] = useState<string>(useUserAvatar());
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Translations
  const t = useTranslations('Button');
  const tModal = useTranslations('Modal');

  // Image reference
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
      onOpen();
    }
  }

  // Open image selector from input
  const openImageSelector = () => {
    const id = 'file-selector';
    const input = document.getElementById(id) as HTMLInputElement;
    input?.click();
  }

  // Get the cropped image
  const getCroppedImg = async (image: HTMLImageElement, crop: PixelCrop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg');
    });
  }

  // Handle Save
  const handleSave = async () => {
    // Check if image reference and completed crop are valid
    if (imageRef.current && completedCrop) {
      // Get cropped image
      const croppedImage = await getCroppedImg(imageRef.current, completedCrop);

      // Check if cropped image is valid
      if (!croppedImage) return;

      // Update on Firestore
      props.uploadAvatar(croppedImage);

      // Get Url 
      const url = URL.createObjectURL(croppedImage)

      // Update locally
      setImage(url);

      // Update Avatar
      setAvatar(url);
    }

    // Close modal
    onClose();
  }

  // Handle delete
  const handleDelete = () => {
    console.log('Avatar deleted');
  }


  // Render home page
  return (
    <div className='flex justify-center w-full h-auto'>
      <div
        className='relative cursor-pointer rounded-l-full rounded-br-full'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}        >

        <input hidden id="file-selector" type="file" accept="image/*" onChange={handleImageUpload} />

        <Avatar
          src={avatar}
          alt="User Avatar"
          onClick={openImageSelector}
          className={`w-32 h-32 ${hover && 'opacity-70 border-2 border-grey-light'} `}
        />
        {hover && (
          <>
            <IoCamera onClick={openImageSelector} className='absolute bottom-11 right-12 text-4xl text-grey-extra-light' />
            <FaTrashAlt onClick={handleDelete} className='absolute top-1 -right-2 text-xl text-orange-regular hover:opacity-50' />
          </>
        )}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{tModal('title.imageCrop')}</ModalHeader>

              <ModalBody>
                <div className="flex justify-center w-full">
                  <ReactCrop
                    aspect={1}
                    className="max-h-96"
                    circularCrop
                    crop={crop}
                    onComplete={(c) => setCompletedCrop(c)}
                    onChange={c => setCrop(c)}>
                    <img
                      ref={imageRef}
                      src={image}
                      alt="Cropped Image"
                      style={{ maxWidth: '100%' }}
                    />
                  </ReactCrop>
                </div>

              </ModalBody>

              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  {t('cancel')}
                </Button>
                <Button
                  color="primary"
                  onPress={handleSave}>
                  {t('save')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>

  )
}