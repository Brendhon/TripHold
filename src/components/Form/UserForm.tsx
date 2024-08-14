"use client";

import { RegisterFormProps, UserFormModel } from "@app/models";
import { Link, Tooltip } from "@nextui-org/react";
import { createValidator, useForm } from "@utils/forms";
import { emailRegex, passwordRegex, testRegex } from "@utils/regex";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCity, FaEnvelopeOpenText, FaMap, FaMapMarkerAlt, FaRegQuestionCircle } from "react-icons/fa";
import { FiGlobe, FiHome } from "react-icons/fi";
import { MdAddLocation, MdEmail, MdLock, MdLooksOne, MdPerson } from "react-icons/md";
import { CAutocomplete } from "./CAutocomplete";
import { CCheckbox } from "./CCheckbox";
import { CForm } from "./CForm";
import { CInput } from "./CInput";

interface SelectItem {
  name: string;
  key: string;
  [key: string]: any;
}

/**
 * User Form
 */
export function UserForm(props: RegisterFormProps) {
  // Variables to receive country options, states options and cities options
  const [countries, setCountries] = useState<SelectItem[]>([]);
  const [states, setStates] = useState<SelectItem[]>([]);
  const [cities, setCities] = useState<SelectItem[]>([]);

  // Form state
  const { form, setForm } = useForm<UserFormModel>();

  // Translations
  const tPage = useTranslations("LoginAndRegister");

  // Fetch countries, states and cities
  useEffect(() => {
    // Get current domain
    const { origin } = window.location;

    // Fetch states
    fetch(origin + '/api/countries/states')
      .then(response => response.json())
      .then((countries: Country[]) => setCountries(countries));
  }, []);


  // Use effect - Change states when country changes
  useEffect(() => {
    // Get current country
    const country = countries.find((c) => c.key === form.country);

    // Set states
    setStates(country?.states || []);

    // Reset form fields
    setForm({ ...form, state: '', city: '', neighborhood: '', street: '', number: '', complement: '' });

    // Reset cities
    setCities([]);
  }, [form.country]);


  // Use effect - Change cities when state changes
  const fetchData = async () => {
    // Get current domain
    const { origin } = window.location;

    // Get current state
    const state = states.find((s) => s.key === form.state);

    // Get current country
    const country = countries.find((c) => c.key === form.country);

    // Reset form fields
    setForm({ ...form, city: '', neighborhood: '', street: '', number: '', complement: '' });

    // Reset cities
    setCities([]);

    // Set cities
    if (state) {
      try {
        const response = await fetch(`${origin}/api/countries/cities?state=${state.name}&country=${country?.name}`);
        const data: CityResponse = await response.json();
        const cities = data.cities.map((city) => ({ name: city, key: city }));
        setCities(cities);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => { fetchData() }, [form.state]);

  // User fields validations
  const { validations } = createValidator<UserFormModel>([
    { key: 'name', required: true },
    { key: 'email', required: true, pattern: emailRegex },
    { key: 'password', required: true, pattern: passwordRegex },
    { key: 'confirmPassword', required: true, equal: 'password' },
    { key: 'country', required: true },
    { key: 'zipCode', required: true },
    { key: 'terms', required: true },
  ]);

  // Handle sign up
  const handleSignUp = () => {
    console.log(form);
    toast.success(tPage('signUpSuccess'));
  }

  // Render form
  return (
    <CForm
      formdata={{ form, setForm, validations }}
      submit={{ action: handleSignUp, text: 'signUp' }}
      className={`flex flex-col gap-2 pt-3 sm:min-w-0 md:min-w-[50%] lg:min-w-[700px] ${props.className}`} >

      <div className="form-row">
        <CInput
          autoFocus
          name="name"
          type="text"
          placeholder="name"
          startContent={<MdPerson />} />
        <CInput
          name="email"
          type="email"
          placeholder="email"
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
          isInvalid={testRegex(passwordRegex, form.password!)}
          errorMessage="password.pattern"
          startContent={<MdLock />} />
        <CInput
          name="confirmPassword"
          type="password"
          placeholder="confirmNewPassword"
          isInvalid={form.password != form.confirmPassword}
          errorMessage="password.notMatch"
          startContent={<MdLock />} />
      </div>

      <div className="form-row">
        <CInput
          name="zipCode"
          type="text"
          placeholder="zipCode"
          className="small-field"
          startContent={<FaEnvelopeOpenText />}
        />
        <CAutocomplete
          name="country"
          isDisabled={!form.zipCode}
          placeholder="countrySelect"
          options={countries}
          startContent={<FiGlobe />} />
      </div>

      <Tooltip content={tPage('address.whyInfo')} placement="right-end">
        <span className="text-sm text-grey-extra-light flex items-center gap-1 w-fit pt-2">
          {tPage('address.why')}
          <FaRegQuestionCircle className="text-green-regular cursor-text" />
        </span>
      </Tooltip>

      <div className="form-row">
        <CAutocomplete
          name="state"
          isDisabled={!form.country}
          placeholder="stateSelect"
          className="medium-field"
          options={states}
          startContent={<FaMap />} />
        <CAutocomplete
          name="city"
          isDisabled={!form.state}
          placeholder="citySelect"
          options={cities}
          startContent={<FaCity />} />
      </div>

      <div className="form-row">
        <CInput
          name="neighborhood"
          type="text"
          disabled={!form.city}
          placeholder="neighborhood"
          startContent={<FaMapMarkerAlt />} />
        <CInput
          name="street"
          disabled={!form.neighborhood}
          placeholder="street"
          type="text"
          startContent={<FiHome />} />
      </div>

      <div className="form-row">
        <CInput
          name="number"
          type="number"
          disabled={!form.street}
          placeholder="number"
          className="small-field"
          startContent={<MdLooksOne />} />
        <CInput
          name="complement"
          type="text"
          placeholder="complement"
          startContent={<MdAddLocation />} />
      </div>

      <CCheckbox name="terms" >
        {tPage('terms.accept')}{" "}
        <Link isExternal className="cursor-pointer" size="sm" href="https://nextui.org/docs/components/link">
          {tPage('terms.terms')}
        </Link>
      </CCheckbox>

      <p className="text-center text-small pt-2">
        {tPage('alreadyHaveAccount')}{" "}
        <Link className="cursor-pointer" size="sm" onPress={() => props.action()}>
          {tPage('login')}
        </Link>
      </p>

    </ CForm>
  )
}