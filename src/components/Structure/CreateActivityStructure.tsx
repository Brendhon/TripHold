"use client";

import { Spinner } from "@nextui-org/react";
import { useUserData } from "@utils/session";
import { useActivityCreationData } from "context/ActivityCreationDataContext";
import { useTrip } from "context/TripContext";
import { getPinFromLastActivity } from "lib/firebase/firestore/activity";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * Create Activity Structure
 */
export function CreateActivityStructure({ children }: { children: React.ReactNode }) {
  // States
  const [hasError, setHasError] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Context
  const { trip } = useTrip();
  const { setData } = useActivityCreationData();

  // Get user data
  const user = useUserData();

  // Translations
  const t = useTranslations('Error');

  // Get date and type from query
  useEffect(() => {
    // Get query
    const query = new URLSearchParams(window.location.search);

    // Set date
    const date = query.get('date') ? new Date(query.get('date')!) : null;

    // Check if both are set
    switch (true) {
      case !date:
      case !trip:
        return;
    }

    // Get pin
    getPinFromLastActivity(trip!, date)
      .then(pin => {
        pin = pin ? pin : { latitude: user.latitude!, longitude: user.longitude! }; // Set default pin
        setData({ date, pin, trip }); // Set data
        setHasError(false); // Reset error
        setIsLoaded(true); // Set loaded
      })
      .catch(() => setHasError(true)); // Set error
  }, [trip]);

  // Structure
  const Structure = ({ children }: any) => <div className="w-full flex justify-center text-center h-96"> {children} </div>

  // Pass to children components the states
  const Error = () => <Structure>{t('invalidActivity')}</Structure>;

  // Loading spinner
  const Loading = () => <Structure> <Spinner size="lg" /> </Structure>;

  // Render children
  return hasError || !isLoaded
    ? isLoaded ? <Error /> : <Loading />
    : children
}