"use client";

import { ActivityTransportType } from "@app/models";
import { useUserData } from "@utils/session";
import { SelectPlane } from "components/Steps/Activity";
import { SelectTransfer } from "components/Steps/Activity/Transport/SelectTransfer";
import StepsStructure from "components/Steps/StepsStructure";
import { useTrip } from "context/TripContext";
import { getPinFromLastActivity } from "lib/firebase/firestore/activity";
import { useEffect, useState } from "react";

export default function TransportCreation() {
  // States
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState<ActivityTransportType>();
  const [error, setError] = useState<any>();
  const [pin, _setPin] = useState<Pin>();

  // Set pin data
  const setPin = (pin: Pin | undefined) => _setPin(pin ?? { latitude: user.latitude!, longitude: user.longitude! });

  // Context
  const { trip } = useTrip();

  // Get user data
  const user = useUserData();

  // Handle creation
  const handleCreation = async () => {
    console.log('Creating activity...');
  };


  // Get date and type from query
  useEffect(() => {
    // Get query
    const query = new URLSearchParams(window.location.search);

    // Set date
    const date = query.get('date') ? new Date(query.get('date')!) : null;

    // Set type
    const type = query.get('type') as ActivityTransportType;

    // Check if both are set
    switch (true) {
      case !date:
        setError('Invalid date');
        return;
      case !trip:
        setError('Invalid trip');
        return;
      case !Object.values(ActivityTransportType).includes(type):
        setError('Invalid transport type');
        return;
    }

    // Set error
    setError(null);

    // Get pin
    getPinFromLastActivity(trip!, date)
      .then(setPin)
      .catch(setError);

    // Set date
    setDate(date);
    setType(type);
  }, [trip]);

  const Flight = () => {
    return (
      <StepsStructure onfinish={handleCreation}>
        <SelectPlane trip={trip!} date={date} pin={pin} />
        <SelectPlane trip={trip!} date={date} pin={pin} />
      </StepsStructure>
    );
  }

  const Transfer = () => {
    return (
      <StepsStructure onfinish={handleCreation}>
        <SelectTransfer trip={trip!} date={date} pin={pin} />
        <SelectTransfer trip={trip!} date={date} pin={pin} />
      </StepsStructure>
    );
  }

  const Others = () => {
    return (
      <StepsStructure onfinish={handleCreation}>
        <SelectPlane trip={trip!} date={date} pin={pin} />
        <SelectPlane trip={trip!} date={date} pin={pin} />
      </StepsStructure>
    );
  }

  // Create switch case to render the correct component
  const renderComponent = () => {
    switch (type) {
      case ActivityTransportType.Flight:
        return <Flight />;
      case ActivityTransportType.Transfer:
        return <Transfer />;
      default:
        return <Others />;
    }
  };

  // Render
  return (error ? <p>{error}</p> : renderComponent()
  )
}