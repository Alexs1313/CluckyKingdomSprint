import { createStackNavigator } from '@react-navigation/stack';
import CluckySprintKingdomCustomLoader from '../CluckyKingdomSprintComponents/CluckySprintKingdomCustomLoader';
import CluckyKingdomSprintCrowns from '../CluckyKingdomSprintScreens/CluckyKingdomSprintCrowns';
import CluckyKingdomSprintPlayground from '../CluckyKingdomSprintScreens/CluckyKingdomSprintPlayground';
import CluckyKingdomSprintHome from '../CluckyKingdomSprintScreens/CluckyKingdomSprintHome';
import CluckyKingdomSprintInfo from '../CluckyKingdomSprintScreens/CluckyKingdomSprintInfo';
import CluckyKingdomSprintMarket from '../CluckyKingdomSprintScreens/CluckyKingdomSprintMarket';
import CluckyKingdomSprintStartOnboard from '../CluckyKingdomSprintScreens/CluckyKingdomSprintStartOnboard';

const Stack = createStackNavigator();

const CluckySprintKingdomNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CluckySprintKingdomCustomLoader"
        component={CluckySprintKingdomCustomLoader}
      />
      <Stack.Screen
        name="CluckyKingdomSprintStartOnboard"
        component={CluckyKingdomSprintStartOnboard}
      />
      <Stack.Screen
        name="CluckyKingdomSprintHome"
        component={CluckyKingdomSprintHome}
      />
      <Stack.Screen
        name="CluckyKingdomSprintInfo"
        component={CluckyKingdomSprintInfo}
      />

      <Stack.Screen
        name="CluckyKingdomSprintPlayground"
        component={CluckyKingdomSprintPlayground}
      />

      <Stack.Screen
        name="CluckyKingdomSprintCrowns"
        component={CluckyKingdomSprintCrowns}
      />
      <Stack.Screen
        name="CluckyKingdomSprintMarket"
        component={CluckyKingdomSprintMarket}
      />
    </Stack.Navigator>
  );
};

export default CluckySprintKingdomNavigation;
