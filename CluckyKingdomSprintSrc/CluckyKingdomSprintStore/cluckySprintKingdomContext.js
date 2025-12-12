import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [cluckySprintKingdomCurrentLevel, setCluckySprintKingdomCurrentLevel] =
    useState(1);

  const cluckySprintKingdomLoadLevel = async () => {
    try {
      const cluckySprintKingdomLvl = await AsyncStorage.getItem(
        'cluckySprintLevel',
      );
      if (cluckySprintKingdomLvl)
        setCluckySprintKingdomCurrentLevel(
          parseInt(cluckySprintKingdomLvl, 10),
        );
    } catch (error) {
      console.log('error');
    }
  };

  const cluckySprintKingdomValues = {
    cluckySprintKingdomCurrentLevel,
    setCluckySprintKingdomCurrentLevel,
    cluckySprintKingdomLoadLevel,
  };

  return (
    <StoreContext.Provider value={cluckySprintKingdomValues}>
      {children}
    </StoreContext.Provider>
  );
};
