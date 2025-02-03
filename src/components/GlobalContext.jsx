import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    deviceCapabilities: {},
    deviceInfo: [],
    deviceClient: null,
  });

  const setDeviceInfo = (deviceInfo) => {
    setState((prevState) => ({
      ...prevState,
      deviceInfo,
    }));
  };

  const setDeviceCapabilities = (deviceCapabilities) => {
    setState((prevState) => ({
      ...prevState,
      deviceCapabilities: {
        ...prevState.deviceCapabilities,
        ...deviceCapabilities,
      },
    }));
  };

  const setDeviceClient = (deviceClient) => {
    setState((prevState) => ({
      ...prevState,
      deviceClient,
    }));
  };

  return (
    <GlobalContext.Provider value={{ state, setDeviceInfo, setDeviceClient, setDeviceCapabilities }}>
      {children}
    </GlobalContext.Provider>
  );
};