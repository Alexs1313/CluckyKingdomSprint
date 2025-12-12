import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CluckySprintKingdomLayout from '../CluckyKingdomSprintComponents/CluckySprintKingdomLayout';
import { cluckySprintKingdomWallpapers } from '../CluckyKingdomSprintConsts/cluckySprintKingdomWallpapers';

const { height } = Dimensions.get('window');

const CluckyKingdomSprintMarket = () => {
  const navigation = useNavigation();
  const [cluckySprintKingdomFruits, setCluckySprintKingdomFruits] = useState({
    orange: 0,
    grape: 0,
    lemon: 0,
    cherry: 0,
  });
  const [cluckySprintKingdomBought, setCluckySprintKingdomBought] = useState([
    0,
  ]);
  const [cluckySprintKingdomSelected, setCluckySprintKingdomSelected] =
    useState(0);
  const [cluckySprintKingdomIndex, setCluckySprintKingdomIndex] = useState(0);

  useEffect(() => {
    cluckySprintKingdomLoadData();
  }, []);

  const cluckySprintKingdomLoadData = async () => {
    const cluckySprintKingdomFruitsData = await AsyncStorage.getItem(
      'cluckySprintFruitBank',
    );
    const cluckySprintKingdomBoughtData = await AsyncStorage.getItem(
      'cluckySprintKingdomWallpapersBought',
    );
    const cluckySprintKingdomSelectedData = await AsyncStorage.getItem(
      'cluckySprintKingdomSelectedWallpaper',
    );

    if (cluckySprintKingdomFruitsData)
      setCluckySprintKingdomFruits(JSON.parse(cluckySprintKingdomFruitsData));
    if (cluckySprintKingdomBoughtData)
      setCluckySprintKingdomBought(JSON.parse(cluckySprintKingdomBoughtData));
    if (cluckySprintKingdomSelectedData)
      setCluckySprintKingdomSelected(
        parseInt(cluckySprintKingdomSelectedData, 10),
      );
  };

  const cluckySprintKingdomSaveBought = async updatedValue => {
    setCluckySprintKingdomBought(updatedValue);
    await AsyncStorage.setItem(
      'cluckySprintKingdomWallpapersBought',
      JSON.stringify(updatedValue),
    );
  };

  const cluckySprintKingdomSaveSelected = async id => {
    setCluckySprintKingdomSelected(id);
    await AsyncStorage.setItem(
      'cluckySprintKingdomSelectedWallpaper',
      String(id),
    );
  };

  const cluckySprintKingdomSaveFruits = async updatedValue => {
    setCluckySprintKingdomFruits(updatedValue);
    await AsyncStorage.setItem(
      'cluckySprintFruitBank',
      JSON.stringify(updatedValue),
    );
  };

  const cluckySprintKingdomTryBuy = async cluckySprintWallpaper => {
    const cluckySprintCost = cluckySprintWallpaper.price;

    if (cluckySprintKingdomFruits.lemon < cluckySprintCost) return;

    const cluckySprintKingdomNewFruits = {
      ...cluckySprintKingdomFruits,
      lemon: cluckySprintKingdomFruits.lemon - cluckySprintCost,
    };

    await cluckySprintKingdomSaveFruits(cluckySprintKingdomNewFruits);

    const cluckySprintKingdomNewBought = [
      ...cluckySprintKingdomBought,
      cluckySprintWallpaper.id,
    ];
    await cluckySprintKingdomSaveBought(cluckySprintKingdomNewBought);
  };

  const cluckySprintWallpaper =
    cluckySprintKingdomWallpapers[cluckySprintKingdomIndex];
  const cluckySprintIsBought = cluckySprintKingdomBought.includes(
    cluckySprintWallpaper.id,
  );
  const cluckySprintIsSelected =
    cluckySprintKingdomSelected === cluckySprintWallpaper.id;

  let cluckySprintKingdomState = 'blocked';

  if (cluckySprintIsSelected) cluckySprintKingdomState = 'selected';
  else if (cluckySprintIsBought) cluckySprintKingdomState = 'unlocked';

  return (
    <CluckySprintKingdomLayout>
      <View style={styles.cluckySprintKingdomContainer}>
        <TouchableOpacity
          style={styles.cluckySprintKingdomBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/cluckySprintBack.png')} />
          <Text style={styles.cluckySprintKingdomHeaderText}>MARKET</Text>
        </TouchableOpacity>

        <Text style={styles.cluckySprintKingdomSubHeader}>
          Exchange fruits for new gameplay wallpapers
        </Text>

        <View style={styles.cluckySprintKingdomWallpaperBox}>
          <Image
            source={cluckySprintWallpaper.image}
            style={styles.cluckySprintKingdomWallpaperImage}
          />

          {cluckySprintKingdomState === 'blocked' && (
            <View style={styles.cluckySprintKingdomBlockedOverlay}>
              <Text style={styles.cluckySprintKingdomBlockedText}>Blocked</Text>
            </View>
          )}

          {cluckySprintKingdomState === 'unlocked' && (
            <View style={styles.cluckySprintKingdomUnlockedOverlay}>
              <Text style={styles.cluckySprintKingdomUnlockedText}>
                Unlocked
              </Text>
            </View>
          )}

          {cluckySprintKingdomState === 'selected' && (
            <View style={styles.cluckySprintKingdomUnlockedOverlay}>
              <Text style={styles.cluckySprintKingdomUnlockedText}>Elect</Text>
            </View>
          )}
        </View>

        {cluckySprintKingdomState === 'blocked' && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => cluckySprintKingdomTryBuy(cluckySprintWallpaper)}
          >
            <ImageBackground
              source={require('../../assets/images/cluckySprintbtn.png')}
              style={styles.cluckySprintKingdomActionBtn}
            >
              <Text style={styles.cluckySprintKingdomActionBtnText}>
                Unlock for {cluckySprintWallpaper.price} 🍋
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}

        {cluckySprintKingdomState === 'unlocked' && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              cluckySprintKingdomSaveSelected(cluckySprintWallpaper.id)
            }
          >
            <ImageBackground
              source={require('../../assets/images/cluckySprintbtn.png')}
              style={styles.cluckySprintKingdomActionBtn}
            >
              <Text style={styles.cluckySprintKingdomActionBtnText}>
                Choose
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}

        {cluckySprintKingdomState === 'selected' && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              setCluckySprintKingdomIndex(
                prev => (prev + 1) % cluckySprintKingdomWallpapers.length,
              )
            }
          >
            <ImageBackground
              source={require('../../assets/images/cluckySprintbtn.png')}
              style={styles.cluckySprintKingdomActionBtn}
            >
              <Text style={styles.cluckySprintKingdomActionBtnText}>Next</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      </View>
    </CluckySprintKingdomLayout>
  );
};

const styles = StyleSheet.create({
  cluckySprintKingdomContainer: {
    flex: 1,
    paddingTop: height * 0.08,
    alignItems: 'center',
    padding: 17,
    paddingBottom: 30,
  },
  cluckySprintKingdomBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  cluckySprintKingdomHeaderText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  cluckySprintKingdomSubHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 30,
    marginTop: 10,
  },
  cluckySprintKingdomWallpaperBox: {
    width: 330,
    height: 420,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#40a6ffc3',
  },
  cluckySprintKingdomWallpaperImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cluckySprintKingdomBlockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cluckySprintKingdomBlockedText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 20,
  },
  cluckySprintKingdomUnlockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
  },
  cluckySprintKingdomUnlockedText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  cluckySprintKingdomActionBtn: {
    width: 240,
    height: 102,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  cluckySprintKingdomActionBtnText: {
    color: '#6D1300',
    fontSize: 24,
    fontWeight: '900',
  },
});

export default CluckyKingdomSprintMarket;
