"use client";

import { FormValidation, RegisterFormProps } from "@app/models";
import { Checkbox, Link, Tooltip } from "@nextui-org/react";
import { emailRegex, passwordRegex, testRegex } from "@utils/regex";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaCity, FaEnvelopeOpenText, FaMap, FaMapMarkerAlt, FaRegQuestionCircle } from "react-icons/fa";
import { FiGlobe, FiHome } from "react-icons/fi";
import { MdAddLocation, MdEmail, MdLock, MdLooksOne, MdPerson } from "react-icons/md";
import { CForm } from "./CForm";
import { CInput } from "./CInput";
import { CSelect } from "./CSelect";

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
  terms: boolean;
}

/**
 * Register Form
 */
export function RegisterForm(props: RegisterFormProps) {
  // Translations
  const tPage = useTranslations("LoginAndRegister");

  // Init form state
  const [form, setForm] = useState<Partial<Form>>({});

  // Handle input
  const handleInput = (e: any) => setForm((prevState) => ({
    ...prevState,
    [e.target.name]: !!e.target.value ? e.target.value : e.target.checked
  }));

  // Handle sign up
  const handleSignUp = () => console.log(form);

  // User fields
  const validations: FormValidation[] = [
    { key: 'name', required: true },
    { key: 'email', required: true, pattern: emailRegex },
    { key: 'password', required: true, pattern: passwordRegex },
    { key: 'confirmPassword', required: true, equal: 'password' },
    { key: 'country', required: true },
    { key: 'zipCode', required: true },
    { key: 'terms', required: true },
  ]

  // Mock data
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
    <CForm
      form={form}
      validations={validations}
      submit={{ action: handleSignUp, text: 'signUp' }}
      className={`flex flex-col gap-2 pt-3 sm:min-w-0 md:min-w-[50%] lg:min-w-[700px] ${props.className}`} >

      <div className="form-row">
        <CInput
          autoFocus
          name="name"
          type="text"
          placeholder="name"
          onChange={handleInput}
          startContent={<MdPerson />} />
        <CInput
          name="email"
          type="email"
          placeholder="email"
          onChange={handleInput}
          isInvalid={testRegex(emailRegex, form.email!)}
          errorMessage="email.pattern"
          startContent={<MdEmail />}
        />
      </div>

      <div className="form-row">
        <CInput
          name="password"
          type="password"
          placeholder="newPassword"
          onChange={handleInput}
          isInvalid={testRegex(passwordRegex, form.password!)}
          errorMessage="password.pattern"
          startContent={<MdLock />} />
        <CInput
          name="confirmPassword"
          type="password"
          placeholder="confirmNewPassword"
          onChange={handleInput}
          isInvalid={form.password != form.confirmPassword}
          errorMessage="password.notMatch"
          startContent={<MdLock />} />
      </div>

      <div className="form-row">
        <CSelect
          name="country"
          placeholder="countrySelect"
          options={countries}
          onChange={handleInput}
          startContent={<FiGlobe />} />
        <CInput
          name="zipCode"
          type="text"
          placeholder="zipCode"
          className="small-field"
          onChange={handleInput}
          startContent={<FaEnvelopeOpenText />}
        />
      </div>

      <Tooltip content={tPage('address.whyInfo')} placement="right-end">
        <span className="text-sm text-grey-extra-light flex items-center gap-1 w-fit pt-2">
          {tPage('address.why')}
          <FaRegQuestionCircle className="text-green-regular cursor-text" />
        </span>
      </Tooltip>

      <div className="form-row">
        <CSelect
          name="state"
          placeholder="stateSelect"
          className="small-field"
          options={states}
          onChange={handleInput}
          startContent={<FaMap />} />
        <CInput
          name="city"
          type="text"
          placeholder="city"
          onChange={handleInput}
          startContent={<FaCity />} />
      </div>

      <div className="form-row">
        <CInput
          name="neighborhood"
          type="text"
          placeholder="neighborhood"
          onChange={handleInput}
          startContent={<FaMapMarkerAlt />} />
        <CInput
          name="street"
          placeholder="street"
          type="text"
          onChange={handleInput}
          startContent={<FiHome />} />
      </div>

      <div className="form-row">
        <CInput
          name="number"
          type="number"
          placeholder="number"
          className="small-field"
          onChange={handleInput}
          startContent={<MdLooksOne />} />
        <CInput
          name="complement"
          type="text"
          placeholder="complement"
          onChange={handleInput}
          startContent={<MdAddLocation />} />
      </div>

      <Checkbox size="sm" color="primary" name="terms" onChange={handleInput}>
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