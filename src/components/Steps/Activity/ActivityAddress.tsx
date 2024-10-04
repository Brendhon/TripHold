"use client";

import { AddressObj, BaseStepProps, FormSelectItem } from "@app/models";
import { Tooltip } from "@nextui-org/react";
import { useDebounce, useForm } from "@utils/forms";
import { getIntlName } from "@utils/intl";
import { getCountriesPath, getZipCodePath } from "@utils/paths";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCity, FaEnvelopeOpenText, FaMap, FaRegQuestionCircle } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { Autocomplete } from "../../Form/Autocomplete";
import { Input } from "../../Form/Input";
import { Form } from "components/Form";

interface Props extends BaseStepProps<Partial<AddressObj>> {
  title?: string;
  isSubmitEnabled: (isEnabled: boolean) => void;
}

export function ActivityAddress(props: Props) {
  // Variables to receive country options, states options and cities options
  const [countries, setCountries] = useState<FormSelectItem[]>([]);
  const [allCountries, setAllCountries] = useState<FormSelectItem[]>([]);
  const [states, setStates] = useState<FormSelectItem[]>([]);
  const [cities, setCities] = useState<FormSelectItem[]>([]);

  // Form state
  const { form, setForm } = useForm<AddressObj>();

  // Debounce zip code - Fetch zip code info after 500ms of user stop typing
  const debouncedZipCode = useDebounce(form.postalcode!, 500);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Locale
  const locale = useLocale();

  // Translations
  const t = useTranslations("Form");

  // Fetch countries, states and cities
  useEffect(() => {
    // Handle response
    const handleResponse = (data: Country[]) => {
      setCountries(data);
      setAllCountries(data);
      setForm({
        ...props.state!,
        country: props.state?.country ?? '',
        state: props.state?.state,
        city: props.state?.city,
        latitude: props.state?.latitude,
        longitude: props.state?.longitude,
      });
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
      latitude: 0,
      longitude: 0,
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
      setCountries(newCountries.map((country) => ({ name: getIntlName(country, locale), key: country.name })));
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
        latitude: codes.latitude[0],
        longitude: codes.longitude[0],
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

  // Listening to form changes
  useEffect(() => {
    if (!props.setstate) return;

    // Check if all required fields are filled
    const requiredFields = props.requiredFields ?? []

    // Check if all required fields are filled
    const isFilled = requiredFields.every((field) => !!form[field]);

    // Check if all required fields are filled
    if (!isFilled) props.isSubmitEnabled?.(false);
    else {
      // Set state
      props.setstate({
        ...form,
        address_string: `${form.street1}, ${form.city}, ${form.state}, ${form.country}, ${form.postalcode}`,
      });
      props.isSubmitEnabled?.(true);
    }

  }, [form]);

  // Render form
  return (
    <Form
      formdata={{ form, setForm, validations: [] }}
      className={`flex flex-col gap-2 pt-3 sm:min-w-0 md:min-w-[50%] lg:min-w-[700px] ${props.className}`} >

      {
        props.title && <h2 className="text-lg font-semibold text-grey-dark">{t(props.title)}</h2>
      }

      <Tooltip content={t('address.whyInfo')} placement="top-start">
        <span className="text-sm text-grey-extra-light flex items-center gap-1 w-fit pt-2">
          {t('address.why')}
          <FaRegQuestionCircle className="text-green-regular cursor-text" />
        </span>
      </Tooltip>

      <div className="form-row">
        <Input
          name="postalcode"
          type="text"
          autoComplete="none"
          placeholder="zipCode"
          className="medium-field"
          startContent={<FaEnvelopeOpenText />}
        />
        <Autocomplete
          name="country"
          isLoading={!hasLoaded && !!form.postalcode}
          disabled={!form.postalcode}
          placeholder="country"
          autoComplete="none"
          selectedKey={form.country}
          allowsCustomValue={true}
          options={countries}
          startContent={<FiGlobe />} />
      </div>

      <div className="form-row">
        <Autocomplete
          name="state"
          isLoading={!hasLoaded && !!form.postalcode}
          disabled={!form.country}
          placeholder="state"
          autoComplete="none"
          selectedKey={form.state}
          className="medium-field"
          allowsCustomValue={true}
          options={states}
          startContent={<FaMap />} />
        <Autocomplete
          name="city"
          isLoading={!hasLoaded && !!form.postalcode}
          disabled={!form.state}
          allowsCustomValue={true}
          autoComplete="none"
          selectedKey={form.city}
          placeholder="city"
          options={cities}
          startContent={<FaCity />} />
      </div>

      <Input
        name="street1"
        type="text"
        disabled={!form.city}
        autoComplete="none"
        placeholder="address"
        startContent={<FaEnvelopeOpenText />}
      />
    </ Form>
  )
}