import { Trip } from '@app/models';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ActivityCreationData {
  trip: Trip;
  date: Date;
  pin?: Pin;
}

interface ActivityCreationDataContextType {
  data: ActivityCreationData | null;
  setData: (data: ActivityCreationData | null) => void;
};

// Create a context
const ActivityCreationDataContext = createContext<ActivityCreationDataContextType>({
  data: null,
  setData: () => { }
});

// Hook to use the context
export const useActivityCreationData = () => useContext(ActivityCreationDataContext);

// Create a provider
export const ActivityCreationDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ActivityCreationData | null>(null);

  return (
    <ActivityCreationDataContext.Provider value={{ data, setData }}>
      {children}
    </ActivityCreationDataContext.Provider>
  );
};
