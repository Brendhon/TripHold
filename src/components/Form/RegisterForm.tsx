"use client";

import { RegisterFormProps } from "@app/models";
import { Button, Checkbox, Link, Tooltip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaCity, FaEnvelopeOpenText, FaMap, FaMapMarkerAlt, FaRegQuestionCircle } from "react-icons/fa";
import { FiGlobe, FiHome } from "react-icons/fi";
import { MdAddLocation, MdEmail, MdLock, MdLooksOne, MdPerson } from "react-icons/md";
import { CInput } from "./CInput";
import { CSelect } from "./CSelect";
import { CForm } from "./CForm";

interface Form {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;
}

/**
 * Register Form
 */
export function RegisterForm(props: RegisterFormProps) {
  // Init form state
  const [form, setForm] = useState<Partial<Form>>({});

  // Handle sign up
  const handleSignUp = () => console.log(form);

  // Handle input
  const handleInput = (e: any) => setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

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
    <CForm submit={handleSignUp} submittext="signUp"
      className={`flex flex-col gap-2 pt-3 sm:min-w-0 md:min-w-[50%] lg:min-w-[700px] ${props.className}`} >

      <div className="form-row">
        <CInput
          isRequired
          onChange={handleInput}
          placeholder="name"
          type="text"
          name="name"
          startContent={<MdPerson />} />
        <CInput
          isRequired
          onChange={handleInput}
          placeholder="email"
          type="email" name="email"
          startContent={<MdEmail />}
        />
      </div>

      <div className="form-row">
        <CInput
          isRequired
          onChange={handleInput}
          placeholder="newPassword"
          type="password"
          startContent={<MdLock />}
          name="password" />
        <CInput
          isRequired
          // Must be equal to password field
          isInvalid={form.password != form.confirmPassword}
          errorMessage="password.notMatch"
          onChange={handleInput}
          placeholder="confirmNewPassword"
          type="password"
          startContent={<MdLock />}
          name="confirmPassword" />
      </div>

      <div className="form-row">
        <CSelect
          onChange={handleInput}
          placeholder="countrySelect"
          options={countries}
          startContent={<FiGlobe />}
          name="country" />
        <CInput
          onChange={handleInput}
          className="small-field"
          placeholder="zipCode"
          type="text"
          startContent={<FaEnvelopeOpenText />}
          name="zipCode" />
      </div>

      <Tooltip content={tPage('address.whyInfo')} placement="right-end">
        <span className="text-sm text-grey-extra-light flex items-center gap-1 w-fit pt-2">
          {tPage('address.why')}
          <FaRegQuestionCircle className="text-green-regular cursor-text" />
        </span>
      </Tooltip>

      <div className="form-row">
        <CSelect
          onChange={handleInput}
          className="small-field"
          placeholder="stateSelect"
          options={states}
          startContent={<FaMap />}
          name="state" />
        <CInput
          onChange={handleInput}
          placeholder="city"
          type="text"
          startContent={<FaCity />}
          name="city" />
      </div>

      <div className="form-row">
        <CInput
          onChange={handleInput}
          placeholder="neighborhood"
          type="text" startContent={<FaMapMarkerAlt />}
          name="neighborhood" />
        <CInput
          onChange={handleInput}
          placeholder="street"
          type="text"
          startContent={<FiHome />}
          name="street" />
      </div>

      <div className="form-row">
        <CInput
          onChange={handleInput}
          className="small-field"
          placeholder="number"
          type="number"
          startContent={<MdLooksOne />}
          name="number" />
        <CInput
          onChange={handleInput}
          placeholder="complement"
          type="text"
          startContent={<MdAddLocation />}
          name="complement" />
      </div>

      <Checkbox size="sm" color="primary">
        {tPage('terms.accept')}{" "}
        <Link isExternal className="cursor-pointer" size="sm" href="https://nextui.org/docs/components/link">
          {tPage('terms.terms')}
        </Link>
      </Checkbox>

      <p className="text-center text-small pt-2">
        {tPage('alreadyHaveAccount')}{" "}
        <Link className="cursor-pointer" size="sm" onPress={() => props.action()}>
          {tPage('login')}
        </Link>
      </p>

    </ CForm>
  )
}