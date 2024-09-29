"use client";

import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { updateLocalData, useUserData, useUserId } from "@utils/session";
import StepsStructure from "components/Steps/StepsStructure";
import { sendEmailVerification } from "lib/email/user";
import { confirmUserEmail } from "lib/firebase/auth/users";
import { getFirestoreUser } from "lib/firebase/firestore/users";
import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  setShowModal: (value: boolean) => void;
  errors: ('email' | 'zipCode')[];
}

export function IncompleteProfile(props: Props) {
  // Translations
  const t = useTranslations('Button');
  const tModal = useTranslations('Modal');

  // Router
  const router = useRouter();

  // User id
  const user = useUserData();

  // Locale
  const locale = useLocale();

  // Handle email confirmation
  const handleEmailConfirmation = async () => {
    // Check if email exists
    if (!user?.id) return;

    // Send email verification
    await sendEmailVerification(user.id, user.name, user.email, locale)
  }

  const ZipCode = () => {
    return (
      <>
        <p className="text-md mb-4">{tModal(`message.incompleteProfileCep`)}</p>
        <Image
          src="/cep-exemple.gif"
          alt="ZIP Code"
          className="rounded-sm"
          width={900}
          height="0"
          style={{ height: 'auto' }}
        />
      </>
    )
  }

  const Email = () => {
    return (
      <>
        <p className="text-sm mb-4">{tModal(`message.incompleteProfileEmailValidation`)}</p>

        <Button size="lg" color="primary" onClick={handleEmailConfirmation}>
          {t(`resendEmail`)}
        </Button>
      </>
    )
  }

  const onfinish = () => {
    if (props.errors.includes('zipCode')) {
      router.push('/profile');
    }

    props.setShowModal(false);
  }

  return (
    <Modal isOpen={props.isOpen} onClose={() => props.setShowModal(false)}>
      <ModalContent className="max-w-3xl">
        {(onClose) => (
          <>
            <ModalBody className="mt-5">
              <StepsStructure
                hideBreakLine
                onfinish={onfinish}
                goBack={onClose}
                titles={[tModal(`title.emailNotVerified`), tModal(`title.incompleteProfile`)]}>
                {props.errors.includes('email') && <Email />}
                {props.errors.includes('zipCode') && <ZipCode />}
              </StepsStructure>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
