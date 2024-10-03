"use client";

import { ActivityPhotos, TripAdvisorActivity } from "@app/models";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { LuMapPin } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import { FaInternetExplorer, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


interface Props {
  photos?: ActivityPhotos[];
  activity: TripAdvisorActivity;
}

export function ActivityDetails(props: Props) {
  // Current photo index
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  // Data
  const { activity, photos } = props;

  // Photo dimensions
  const photoHeight = 300;

  // Translations
  const t = useTranslations();

  // Handle previous photo
  const handlePreviousPhoto = () => {
    if (currentPhotoIndex === 0) return;
    setCurrentPhotoIndex(currentPhotoIndex - 1);
  }

  // Handle next photo
  const handleNextPhoto = () => {
    if (photos && currentPhotoIndex === photos.length - 1) return;
    setCurrentPhotoIndex(currentPhotoIndex + 1);
  }

  //Got to site to see all photos
  const onClick = () => window.open(activity.web_url, "_blank");

  /**
   * Get width of the photo based on the height to maintain aspect ratio
   * @param {number} height Current height of the photo
   * @param {number} width Current width of the photo
   * @returns {number} width of the photo
   */
  const getPhotoWidth = (height: number, width: number): number => {
    return (width / height) * photoHeight;
  }

  return (
    <div className="flex flex-col justify-center">
      {/* Rating */}
      {activity?.rating_image_url && (
        <div className="my-2">
          <Image src={activity.rating_image_url} alt="Rating" width={120} height={50} />
        </div>
      )}

      {/* Activity Name */}
      <h2 className="flex justify-center text-xl font-semibold">
        {activity?.name}
      </h2>

      {/* Photos */}
      {photos && photos.length > 0 && (
        <div className="hidden justify-between items-center h-[350px] select-none md:flex">
          <Button
            size='md'
            variant='light'
            isDisabled={currentPhotoIndex === 0}
            isIconOnly
            onClick={handlePreviousPhoto}
            color='default'>
            <BiSolidLeftArrow size={24} />
          </Button>

          <Image
            onClick={onClick}
            src={photos[currentPhotoIndex].url}
            alt={photos[currentPhotoIndex].caption}
            className='cursor-pointer hover:opacity-80 rounded-md'
            width={getPhotoWidth(photos[currentPhotoIndex].height, photos[currentPhotoIndex].width)}
            height={photos[currentPhotoIndex].height}
          />

          <Button
            size='md'
            variant='light'
            isDisabled={currentPhotoIndex === photos.length - 1}
            isIconOnly
            onClick={handleNextPhoto}
            color='default'>
            <BiSolidRightArrow size={24} />
          </Button>
        </div>
      )}

      {/* Description */}
      {activity?.description && (
        <p className="mt-2 text-grey-extra-light text-justify">
          {activity.description}
        </p>
      )}

      {/* Contact Info */}
      <div className="flex flex-col mt-4 gap-2">
        <h3 className="font-semibold">{t('contactInfo')}</h3>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${activity?.address_obj?.address_string}`}
            target="_blank"
            className="flex items-center cursor-pointer gap-2 hover:opacity-70">
            <LuMapPin className="text-purple-semi-bold" />
            {activity?.address_obj?.address_string}
          </Link>

          {activity?.web_url && (
            <Link
              href={activity.web_url}
              target="_blank"
              className="flex items-center cursor-pointer gap-2 hover:opacity-70 ">
              <FaInternetExplorer className="text-purple-semi-bold" />
              {t('visitWebsite')}
            </Link>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">

          {activity?.email && (
            <Link href={`mailto:${activity.email}`} className="text-blue-500">
              <MdEmail className="text-purple-semi-bold" />
              {activity.email}
            </Link>
          )}

          {activity?.phone && (
            <Link href={`tel:${activity?.phone}`} className="text-blue-500">
              <FaPhoneAlt className="text-purple-semi-bold" />
              {activity.phone}
            </Link>
          )}
        </div>
      </div>

      {/* Amenities */}
      {activity?.amenities && (
        <div className="mt-4">
          <h3 className="font-semibold">{t('features')}</h3>
          <p className="text-grey-extra-light text-sm mt-2 text-justify">
            {activity.amenities.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
