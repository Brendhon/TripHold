import { createContext, useContext, useState, ReactNode } from 'react';

interface FlagContextType {
  flagUrl: string;
  setFlagUrl: (flagUrl: string) => void;
};

// Create a context
const FlagContext = createContext<FlagContextType>({
  flagUrl: '',
  setFlagUrl: () => {},
});

// Hook to use the context
export const useFlag = () => useContext(FlagContext);

// Create a provider
export const FlagProvider = ({ children }: { children: ReactNode }) => {
  const [flagUrl, setFlagUrl] = useState<string>('');

  return (
    <FlagContext.Provider value={{ flagUrl, setFlagUrl }}>
      {children}
    </FlagContext.Provider>
  );
};
