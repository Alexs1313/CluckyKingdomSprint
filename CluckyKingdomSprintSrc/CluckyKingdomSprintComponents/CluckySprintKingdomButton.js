import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const CluckySprintKingdomButton = ({ onPress, btnTitle }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onPress()}>
      <ImageBackground
        source={require('../../assets/images/cluckySprintbtn.png')}
        style={{
          width: 242,
          height: 103,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.cluckySprintBtnText}>{btnTitle}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cluckySprintBtnText: {
    color: '#6D1300',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default CluckySprintKingdomButton;
