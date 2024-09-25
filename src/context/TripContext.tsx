import { Trip } from '@app/models';
import { createContext, useContext, useState, ReactNode } from 'react';

interface TripContextType {
  trip: Trip | null;
  setTrip: (trip: Trip | null) => void;
};

// Create a context
const TripContext = createContext<TripContextType>({
  trip: null,
  setTrip: () => {},
});

// Hook to use the context
export const useTrip = () => useContext(TripContext);

// Create a provider
export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trip, setTrip] = useState<Trip | null>(null);

  return (
    <TripContext.Provider value={{ trip, setTrip }}>
      {children}
    </TripContext.Provider>
  );
};
