import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CluckySprintKingdomButton from '../CluckyKingdomSprintComponents/CluckySprintKingdomButton';

const CluckyKingdomSprintStartOnboard = () => {
  const [currentCluckySprintIndex, setCurrentCluckySprintIndex] = useState(0);
  const nav = useNavigation();

  return (
    <ImageBackground
      source={
        currentCluckySprintIndex === 0
          ? require('../../assets/images/cluckySprintbgonb.png')
          : require('../../assets/images/cluckySprintbg.png')
      }
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wlcmwrap}>
          {currentCluckySprintIndex === 1 && (
            <>
              <Image
                source={require('../../assets/images/cluckySprintonb1.png')}
                style={{ left: -60, top: 20 }}
              />
              <Image
                source={require('../../assets/images/cluckySprintonb2.png')}
                style={{ left: 60 }}
              />
            </>
          )}
          {currentCluckySprintIndex === 2 && (
            <Image
              source={require('../../assets/images/cluckySprintonb3.png')}
              style={{ marginBottom: 40 }}
            />
          )}

          <LinearGradient
            colors={['#40A6FF', '#720022']}
            style={styles.cluckySprintGradient}
          >
            <View style={styles.cluckySprintWelcomeContainer}>
              <Text style={styles.cluckySprintWelcomeText}>
                {currentCluckySprintIndex === 0
                  ? `Welcome to Clucky Kingdom Sprint! Get ready for an egg-citing adventure filled with fun challenges and`
                  : currentCluckySprintIndex === 1
                  ? `During the game you get different fruits.
With them, additional backgrounds for decoration become available.`
                  : `After a certain number of levels, special crowns appear.
Collect them to personalize your space in the game.`}
              </Text>

              <View style={{ marginTop: 40 }} />

              <CluckySprintKingdomButton
                onPress={() =>
                  currentCluckySprintIndex === 2
                    ? nav.navigate('CluckyKingdomSprintHome')
                    : setCurrentCluckySprintIndex(currentCluckySprintIndex + 1)
                }
                btnTitle={
                  currentCluckySprintIndex === 0
                    ? `HELLO`
                    : currentCluckySprintIndex === 1
                    ? `GOOD`
                    : `START`
                }
              />
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wlcmwrap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cluckySprintGradient: {
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: '100%',
  },
  cluckySprintWelcomeContainer: {
    padding: 20,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    alignItems: 'center',
    backgroundColor: '#720022',
    margin: 2,
    paddingVertical: 40,
    minHeight: 340,
  },
  cluckySprintWelcomeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default CluckyKingdomSprintStartOnboard;
