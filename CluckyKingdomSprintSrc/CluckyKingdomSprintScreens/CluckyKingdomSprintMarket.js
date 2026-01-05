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
import LinearGradient from 'react-native-linear-gradient';

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
    try {
      const cluckySprintKingdomFruitsData = await AsyncStorage.getItem(
        'cluckySprintFruitBank',
      );
      const cluckySprintKingdomBoughtData = await AsyncStorage.getItem(
        'cluckySprintKingdomWallpapersBought',
      );
      const cluckySprintKingdomSelectedData = await AsyncStorage.getItem(
        'cluckySprintKingdomSelectedWallpaper',
      );

      if (cluckySprintKingdomFruitsData) {
        setCluckySprintKingdomFruits(JSON.parse(cluckySprintKingdomFruitsData));
      }

      if (cluckySprintKingdomBoughtData) {
        setCluckySprintKingdomBought(JSON.parse(cluckySprintKingdomBoughtData));
      } else {
        // дефолт: id 0 и 1 куплены (синяя доступна)
        const defaultBought = [0, 1];
        setCluckySprintKingdomBought(defaultBought);
        await AsyncStorage.setItem(
          'cluckySprintKingdomWallpapersBought',
          JSON.stringify(defaultBought),
        );
      }

      if (cluckySprintKingdomSelectedData !== null) {
        const selectedId = parseInt(cluckySprintKingdomSelectedData, 10);
        setCluckySprintKingdomSelected(selectedId);

        const idx = cluckySprintKingdomWallpapers.findIndex(
          w => w.id === selectedId,
        );
        setCluckySprintKingdomIndex(idx >= 0 ? idx : 0);
      } else {
        // если нет выбранного — выставим 1 (синяя) и preview на неё
        const defaultSelected = 1;
        setCluckySprintKingdomSelected(defaultSelected);
        await AsyncStorage.setItem(
          'cluckySprintKingdomSelectedWallpaper',
          String(defaultSelected),
        );

        const idx = cluckySprintKingdomWallpapers.findIndex(
          w => w.id === defaultSelected,
        );
        setCluckySprintKingdomIndex(idx >= 0 ? idx : 0);
      }
    } catch (e) {
      console.warn('Market load error', e);
    }
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
      ...new Set([...cluckySprintKingdomBought, cluckySprintWallpaper.id]),
    ];
    await cluckySprintKingdomSaveBought(cluckySprintKingdomNewBought);
  };

  const onPrev = () =>
    setCluckySprintKingdomIndex(prev =>
      prev === 0 ? cluckySprintKingdomWallpapers.length - 1 : prev - 1,
    );

  const onNext = () =>
    setCluckySprintKingdomIndex(
      prev => (prev + 1) % cluckySprintKingdomWallpapers.length,
    );

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

          {/* overlays показывают статус, но не перехватывают клики (pointerEvents="none") */}
          {cluckySprintKingdomState === 'blocked' && (
            <View
              pointerEvents="none"
              style={styles.cluckySprintKingdomBlockedOverlay}
            >
              <Text style={styles.cluckySprintKingdomBlockedText}>Blocked</Text>
            </View>
          )}

          {cluckySprintKingdomState === 'unlocked' && (
            <View
              pointerEvents="none"
              style={styles.cluckySprintKingdomUnlockedOverlay}
            >
              <Text style={styles.cluckySprintKingdomUnlockedText}>
                Unlocked
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.arrowBtn, styles.arrowLeft]}
            onPress={onPrev}
            activeOpacity={0.8}
          >
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.arrowBtn, styles.arrowRight]}
            onPress={onNext}
            activeOpacity={0.8}
          >
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 30 }}>
          {cluckySprintKingdomState === 'blocked' && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => cluckySprintKingdomTryBuy(cluckySprintWallpaper)}
            >
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
                <Text style={styles.cluckySprintKingdomActionBtnText}>
                  Unlock for {cluckySprintWallpaper.price}
                </Text>
                <Image source={require('../../assets/images/lemon.png')} />
              </LinearGradient>
            </TouchableOpacity>
          )}

          {cluckySprintKingdomState === 'unlocked' && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                cluckySprintKingdomSaveSelected(cluckySprintWallpaper.id)
              }
            >
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
                <Text style={styles.cluckySprintKingdomActionBtnText}>
                  Choose
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {cluckySprintKingdomState === 'selected' && (
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
              <Text
                style={[
                  styles.cluckySprintKingdomActionBtnText,
                  { opacity: 0.6 },
                ]}
              >
                Selected
              </Text>
            </LinearGradient>
          )}
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 259,
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  cluckySprintKingdomActionBtnText: {
    color: '#6D1300',
    fontSize: 24,
    fontWeight: '900',
  },
  disabledBtn: {
    opacity: 0.9,
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    marginTop: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
    elevation: 8,
  },
  arrowLeft: {
    left: 12,
  },
  arrowRight: {
    right: 12,
  },
  arrowText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 36,
  },
});

export default CluckyKingdomSprintMarket;
