import { NavigationContainer as CluckySprintNavigation } from '@react-navigation/native';
import { ContextProvider } from './CluckyKingdomSprintSrc/CluckyKingdomSprintStore/cluckySprintKingdomContext';
import CluckySprintKingdomNavigation from './CluckyKingdomSprintSrc/CluckyKingdomSprintNav/CluckySprintKingdomNavigation';

const App = () => {
  return (
    <CluckySprintNavigation>
      <ContextProvider>
        <CluckySprintKingdomNavigation />
      </ContextProvider>
    </CluckySprintNavigation>
  );
};

export default App;
