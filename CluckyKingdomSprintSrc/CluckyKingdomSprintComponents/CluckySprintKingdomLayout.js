import { ImageBackground, ScrollView } from 'react-native';

const CluckySprintKingdomLayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/cluckySprintBg1.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default CluckySprintKingdomLayout;
