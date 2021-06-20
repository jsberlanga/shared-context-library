import * as React from "react";

interface SharedBellaContextProps {
  isBellaPageType?: boolean;
  featureToggles?: unknown[];
}

const SharedBellaContext = React.createContext<SharedBellaContextProps>({
  isBellaPageType: undefined,
  featureToggles: undefined,
});

const useIsBellaPageType = (pageType?: string) => pageType === "/bella";

interface SharedBellaContextProviderProps {
  value: {
    pageType?: string;
    featureToggles?: unknown[];
  };
  children?: React.ReactNode;
}

const SharedBellaContextProvider = ({
  value,
  children,
}: SharedBellaContextProviderProps) => {
  const isBellaPageType = useIsBellaPageType(value?.pageType);

  const memoizedValue = React.useMemo(
    () => ({
      isBellaPageType,
      featureToggles: value.featureToggles,
    }),
    [isBellaPageType, value.featureToggles]
  );

  return (
    <SharedBellaContext.Provider value={memoizedValue}>
      {children}
    </SharedBellaContext.Provider>
  );
};

const useSharedBellaContext = () => {
  const context = React.useContext(SharedBellaContext);

  return context;
};

export {
  SharedBellaContextProvider,
  SharedBellaContext,
  useSharedBellaContext,
};