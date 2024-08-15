"use client";

import { FormSelectItem, RegisterFormProps, UserFormModel } from "@app/models";
import { Link, Tooltip } from "@nextui-org/react";
import { createValidator, useDebounce, useForm } from "@utils/forms";
import { getCountriesPath, getTermsPath, getZipCodePath } from "@utils/paths";
import { emailRegex, passwordRegex, testRegex } from "@utils/regex";
import { createUserSignUp } from "lib/firebase/auth/users";
import { createFirestoreUser, getFirestoreUser } from "lib/firebase/firestore/users";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCity, FaEnvelopeOpenText, FaMap, FaRegQuestionCircle } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Autocomplete } from "./Autocomplete";
import { Checkbox } from "./Checkbox";
import { Form } from "./Form";
import { Input } from "./Input";

/**
 * User Form
 */
export function UserForm(props: RegisterFormProps) {
  // Variables to receive country options, states options and cities options
  const [countries, setCountries] = useState<FormSelectItem[]>([]);
  const [allCountries, setAllCountries] = useState<FormSelectItem[]>([]);
  const [states, setStates] = useState<FormSelectItem[]>([]);
  const [cities, setCities] = useState<FormSelectItem[]>([]);

  // Form state
  const { form, setForm } = useForm<UserFormModel>();

  // Debounce zip code - Fetch zip code info after 500ms of user stop typing
  const debouncedZipCode = useDebounce(form.zipCode, 500);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Translations
  const tPage = useTranslations("LoginAndRegister");

  // User fields validations
  const { validations } = createValidator<UserFormModel>([
    { key: 'name', required: true },
    { key: 'email', required: true, pattern: emailRegex },
    { key: 'password', required: true, pattern: passwordRegex },
    { key: 'confirmPassword', required: true, equal: 'password' },
    { key: 'country', required: true },
    { key: 'zipCode', required: true },
    { key: 'state', required: true },
    { key: 'city', required: true },
    { key: 'terms', required: true },
  ]);

  // Fetch countries, states and cities
  useEffect(() => {
    // Handle response
    const handleResponse = (data: Country[]) => {
      setCountries(data);
      setAllCountries(data);
    }

    // Handle error
    const handleError = (error: any) => console.error('Error fetching countries:', error);

    // Fetch states
    fetch(getCountriesPath())
      .then(response => response.json())
      .then(handleResponse)
      .catch(handleError);
  }, []);

  // Listening to the change of the zip code field and after user fills it, fetch the zip code info
  useEffect(() => {
    // Reset form fields
    const reset = () => setForm((prevForm: any) => ({
      ...prevForm,
      country: '',
      state: '',
      city: '',
    }));

    // Check if zip code is empty
    if (!debouncedZipCode) return reset();

    // Set has loaded to false
    setHasLoaded(false);

    // Create function to set form fields
    const handleResponse = (codes: ZipCode) => {

      // Check if codes is empty object - Reset form fields
      if (!Object.keys(codes).length) return reset();

      // Get country and state from the zip code info
      const newCountries = allCountries.filter((c) => c.codes.includes(codes.countryCode[0]));

      // Set countries
      setCountries(newCountries.map((country) => ({ name: country.name, key: country.name })));
      setStates(codes.state.map((state) => ({ name: state, key: state })));
      setCities(codes.city.map((city) => ({ name: city, key: city })));

      // Set has loaded to true
      setHasLoaded(true);

      // Set form fields
      setForm((prevForm: any) => ({
        ...prevForm,
        country: newCountries.length == 1 ? newCountries[0].name : '',
        state: codes.state.length == 1 ? codes.state[0] : '',
        city: codes.city.length == 1 ? codes.city[0] : '',
      }));
    }

    // Create function to handle errors
    const handleError = (error: any) => {
      console.error('Error fetching zip code info:', error);
      reset();
    }

    fetch(getZipCodePath(debouncedZipCode))
      .then(response => response.json())
      .then(handleResponse)
      .catch(handleError);
  }, [debouncedZipCode]);

  // Handle sign up
  const handleSignUp = async () => {
    try {
      // Get user by email to check if user already exists
      const userExists = await getFirestoreUser(form.email!);

      // Check if user already exists
      if (userExists) {
        props.action();
        return toast.error(tPage(`userExists.${userExists.provider}`));
      }

      // Register user in Firebase Authentication
      const user = await createUserSignUp(form.email!, form.password!);

      // Add user to Firestore
      await createFirestoreUser({
        id: user.uid,
        name: form.name!,
        email: form.email!,
        image: '',
        provider: 'email',
        country: form.country!,
        zipCode: form.zipCode!,
        state: form.state!,
        city: form.city!,
        terms: form.terms,
      });

      // Show success message
      toast.success(tPage('signUpSuccess'));

      // Redirect to home
      props.action();
    } catch (error: any) {
      toast.error(tPage('signUpFailed'));
      console.error("Error signing up:", error);
    }
  }

  // Render form
  return (
    <Form
      formdata={{ form, setForm, validations }}
      submit={{ action: handleSignUp, text: 'signUp' }}
      className={`flex flex-col gap-2 pt-3 sm:min-w-0 md:min-w-[50%] lg:min-w-[700px] ${props.className}`} >

      <div className="form-row">
        <Input
          autoFocus
          name="name"
          type="text"
          autoComplete="none"
          placeholder="name"
          startContent={<MdPerson />} />
        <Input
          name="email"
          type="email"
          placeholder="email"
          isInvalid={testRegex(emailRegex, form.email!)}
          errorMessage="email.pattern"
          startContent={<MdEmail />}
        />
      </div>

      <div className="form-row">
        <Input
          name="password"
          type="password"
          autoComplete="none"
          placeholder="newPassword"
          isInvalid={testRegex(passwordRegex, form.password!)}
          errorMessage="password.pattern"
          startContent={<MdLock />} />
        <Input
          name="confirmPassword"
          type="password"
          autoComplete="none"
          placeholder="confirmNewPassword"
          isInvalid={form.password != form.confirmPassword}
          errorMessage="password.notMatch"
          startContent={<MdLock />} />
      </div>

      <Tooltip content={tPage('address.whyInfo')} placement="top-start">
        <span className="text-sm text-grey-extra-light flex items-center gap-1 w-fit pt-2">
          {tPage('address.why')}
          <FaRegQuestionCircle className="text-green-regular cursor-text" />
        </span>
      </Tooltip>

      <div className="form-row">
        <Input
          name="zipCode"
          type="text"
          autoComplete="none"
          placeholder="zipCode"
          className="medium-field"
          startContent={<FaEnvelopeOpenText />}
        />
        <Autocomplete
          name="country"
          isLoading={!hasLoaded && form.zipCode}
          disabled={!form.zipCode}
          placeholder="country"
          selectedKey={form.country}
          allowsCustomValue={true}
          options={countries}
          startContent={<FiGlobe />} />
      </div>

      <div className="form-row">
        <Autocomplete
          name="state"
          isLoading={!hasLoaded && form.zipCode}
          disabled={!form.country}
          placeholder="state"
          selectedKey={form.state}
          className="medium-field"
          allowsCustomValue={true}
          options={states}
          startContent={<FaMap />} />
        <Autocomplete
          name="city"
          isLoading={!hasLoaded && form.zipCode}
          disabled={!form.state}
          allowsCustomValue={true}
          selectedKey={form.city}
          placeholder="city"
          options={cities}
          startContent={<FaCity />} />
      </div>

      <Checkbox name="terms" >
        {tPage('terms.accept')}{" "}
        <Link isExternal className="cursor-pointer" size="sm" href={getTermsPath()}>
          {tPage('terms.terms')}
        </Link>
      </Checkbox>

      <p className="text-center text-small pt-2">
        {tPage('alreadyHaveAccount')}{" "}
        <Link className="cursor-pointer" size="sm" onPress={() => props.action()}>
          {tPage('login')}
        </Link>
      </p>

    </ Form>
  )
}