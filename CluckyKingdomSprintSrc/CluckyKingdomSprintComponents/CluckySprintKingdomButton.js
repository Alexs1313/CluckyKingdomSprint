import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CluckySprintKingdomButton = ({ onPress, btnTitle }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onPress()}>
      <LinearGradient
        colors={['#FAA506', '#F6FA7E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 242,
          height: 104,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 22,
        }}
      >
        <Text style={styles.cluckySprintBtnText}>{btnTitle}</Text>
      </LinearGradient>
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
