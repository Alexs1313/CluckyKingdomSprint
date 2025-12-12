import { ImageBackground, ScrollView } from 'react-native';

const CluckySprintKingdomLayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/cluckySprintbg.png')}
      style={{ flex: 1 }}
      blurRadius={3}
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
