"use client";

import { ActivityTransportType } from "@app/models";
import { FlightSteps, TransferSteps } from "components/Steps/Activity";
import { OthersSteps } from "components/Steps/Activity/Transport/Others/OthersSteps";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransportCreation({ searchParams }: { searchParams: any }) {
  // State
  const [type, setType] = useState<ActivityTransportType | null>(null);

  // Router
  const router = useRouter();
  
  // Set type
  useEffect(() => {
    // Check if type is set
    const type = searchParams.type;

    // Check if type is valid
    if (!Object.values(ActivityTransportType).includes(type)) return router.push("/404");

    // Set type
    setType(type);
  }, [searchParams]);

  // Create switch case to render the correct component
  const renderComponent = () => {
    switch (type) {
      case ActivityTransportType.Flight:
        return <FlightSteps />;
      case ActivityTransportType.Transfer:
        return <TransferSteps />;
      default:
        return <OthersSteps />;
    }
  };

  // Render
  return type && renderComponent();
}