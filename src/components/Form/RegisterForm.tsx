"use client";

import { Button, Link, Tooltip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FaCity, FaEnvelopeOpenText, FaMap, FaMapMarkerAlt, FaRegQuestionCircle } from "react-icons/fa";
import { FiGlobe, FiHome } from "react-icons/fi";
import { MdAddLocation, MdEmail, MdLock, MdLooksOne, MdPerson } from "react-icons/md";
import { CInput } from "./CInput";
import { CSelect } from "./CSelect";
;

interface Props {
  action: () => void;
}

/**
 * Register Form
 */
export function RegisterForm(props: Props) {

  // Handle sign up
  const handleSignUp = () => {
    console.log("Sign up");
  }

  // Translations
  const tPage = useTranslations("LoginAndRegister");
  const tButton = useTranslations("Button");

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'es', label: 'Spain' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'de', label: 'Germany' },
  ]

  const states = [
    { value: 'ny', label: 'New York' },
    { value: 'ca', label: 'California' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' },
    { value: 'il', label: 'Illinois' },
  ]

  return (
    <form className="flex flex-col gap-4 pt-3">

      <div className="form-row">
        <CInput placeholder="name" type="text" startContent={<MdPerson />} />
        <CInput placeholder="email" type="email" startContent={<MdEmail />} />
      </div>

      <div className="form-row">
        <CInput placeholder="newPassword" type="password" startContent={<MdLock />} />
        <CInput placeholder="confirmNewPassword" type="password" startContent={<MdLock />} />
      </div>

      <div className="form-row">
        <CSelect placeholder="countrySelect" options={countries} startContent={<FiGlobe />} />
        <CInput placeholder="zipCode" type="number" startContent={<FaEnvelopeOpenText />} />
      </div>

      <Tooltip content={tPage('address.whyInfo')} placement="right-end">
        <span className="text-sm text-grey-extra-light flex items-center gap-1 w-fit">
          {tPage('address.why')}
          <FaRegQuestionCircle className="text-green-regular cursor-text" />
        </span>
      </Tooltip>

      <div className="form-row">
        <CSelect placeholder="stateSelect" options={states} startContent={<FaMap />} />
        <CInput placeholder="city" type="text" startContent={<FaCity />} />
      </div>

      <div className="form-row">
        <CInput placeholder="neighborhood" type="text" startContent={<FaMapMarkerAlt />} />
        <CInput placeholder="address" type="text" startContent={<FiHome />} />
      </div>

      <div className="form-row">
        <CInput placeholder="number" type="number" startContent={<MdLooksOne />} />
        <CInput placeholder="complement" type="text" startContent={<MdAddLocation />} />
      </div>

      <p className="text-center text-small">
        {tPage('alreadyHaveAccount')}{" "}
        <Link className="cursor-pointer" size="sm" onPress={() => props.action()}>
          {tPage('login')}
        </Link>
      </p>

      <div className="form-row justify-center">
        <Button onClick={handleSignUp} color="primary" type="button">
          {tButton('confirm')}
        </Button>
      </div>

    </form>
  )
}