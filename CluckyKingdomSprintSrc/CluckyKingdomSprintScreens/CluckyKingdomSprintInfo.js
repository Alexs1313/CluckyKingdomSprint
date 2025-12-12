import { useNavigation } from '@react-navigation/native';
import CluckySprintKingdomLayout from '../CluckyKingdomSprintComponents/CluckySprintKingdomLayout';
import {
  Dimensions,
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const CluckyKingdomSprintInfo = () => {
  const navigation = useNavigation();

  const CluckySprintShareInfo = async () => {
    await Share.share({
      message: `Clucky Kingdom Sprint is a fast-paced fruit sprint where you run through short levels, crush the right fruits, and move on. As you play, you'll unlock crowns and new backgrounds that you can use to decorate. Simple gameplay, bright art, and gradual discoveries make each level enjoyable and easy.`,
    });
  };

  return (
    <CluckySprintKingdomLayout>
      <View style={styles.wlcmwrap}>
        <TouchableOpacity
          style={styles.cluckySprintHeader}
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/cluckySprintBack.png')} />
          <Text style={styles.cluckySprintBackText}>INFO</Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/cluckySprintInfoLogo.png')}
          style={{ width: 219, height: 219, borderRadius: 62 }}
        />

        <Text style={styles.cluckySprintFruitInfoText}>
          Clucky Kingdom Sprint is a fast-paced fruit sprint where you run
          through short levels, crush the right fruits, and move on. As you
          play, you'll unlock crowns and new backgrounds that you can use to
          decorate. Simple gameplay, bright art, and gradual discoveries make
          each level enjoyable and easy.
        </Text>

        <TouchableOpacity activeOpacity={0.6} onPress={CluckySprintShareInfo}>
          <ImageBackground
            source={require('../../assets/images/cluckySprintbtn.png')}
            style={styles.cluckySprintBtn}
          >
            <Text style={styles.cluckySprintBtnText}>SHARE</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </CluckySprintKingdomLayout>
  );
};

const styles = StyleSheet.create({
  wlcmwrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.08,
    padding: 17,
    paddingBottom: 30,
  },
  cluckySprintBtnText: {
    color: '#6D1300',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  cluckySprintBtn: {
    marginTop: 67,
    width: 242,
    height: 103,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cluckySprintFruitInfoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 21,
    lineHeight: 26,
  },
  cluckySprintBackText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  cluckySprintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 46,
    alignSelf: 'flex-start',
  },
});

export default CluckyKingdomSprintInfo;
