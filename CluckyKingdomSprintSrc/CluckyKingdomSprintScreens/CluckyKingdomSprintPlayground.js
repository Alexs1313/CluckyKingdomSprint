import React, { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Share,
  ScrollView,
} from 'react-native';
import { cluckysprintlevels } from '../CluckyKingdomSprintData/cluckysprintlevels';
import Orientation from 'react-native-orientation-locker';
import {
  cluckySprintKingdomFruitImages,
  cluckySprintKingdomWallpapers,
} from '../CluckyKingdomSprintConsts/cluckySprintKingdomAssets';

const { height, width } = Dimensions.get('window');

const CluckyKingdomSprintPlayground = () => {
  const cluckySprintKingdomNavigation = useNavigation();
  const [cluckySprintKingdomScreen, setCluckySprintKingdomScreen] =
    useState('intro');
  const [cluckySprintKingdomLevel, setCluckySprintKingdomLevel] = useState(1);
  const [cluckySprintKingdomCrowns, setCluckySprintKingdomCrowns] = useState(0);
  const [cluckySprintKingdomTimeLeft, setCluckySprintKingdomTimeLeft] =
    useState(45);
  const navigation = useNavigation();
  const [cluckySprintKingdomNeeds, setCluckySprintKingdomNeeds] = useState({});
  const [cluckySprintKingdomCollected, setCluckySprintKingdomCollected] =
    useState({});
  const [
    cluckySprintKingdomResultSuccess,
    setCluckySprintKingdomResultSuccess,
  ] = useState(false);
  const [
    cluckySprintKingdomResultCrownEarned,
    setCluckySprintKingdomResultCrownEarned,
  ] = useState(false);
  const [cluckySprintKingdomResultNeeds, setCluckySprintKingdomResultNeeds] =
    useState({});
  const [
    cluckySprintKingdomResultCollected,
    setCluckySprintKingdomResultCollected,
  ] = useState({});
  const [cluckySprintKingdomFruits, setCluckySprintKingdomFruits] = useState(
    [],
  );
  const [cluckySprintKingdomFruitBank, setCluckySprintKingdomFruitBank] =
    useState({
      orange: 0,
      grape: 0,
      lemon: 0,
      cherry: 0,
    });
  const [
    cluckySprintKingdomSelectedWallpaper,
    setCluckySprintKingdomSelectedWallpaper,
  ] = useState(0);
  const cluckySprintKingdomTimerRef = useRef(null);
  const cluckySprintKingdomSpawnRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  useEffect(() => {
    const cluckySprintKingdomLoadProgress = async () => {
      try {
        const cluckySprintLvl = await AsyncStorage.getItem('cluckySprintLevel');
        const cluckySprintCrwn = await AsyncStorage.getItem(
          'cluckySprintCrowns',
        );
        const cluckySprintFruits = await AsyncStorage.getItem(
          'cluckySprintFruitBank',
        );
        const cluckySprintWallpaper = await AsyncStorage.getItem(
          'cluckySprintKingdomSelectedWallpaper',
        );

        if (cluckySprintLvl)
          setCluckySprintKingdomLevel(parseInt(cluckySprintLvl, 10));
        if (cluckySprintCrwn)
          setCluckySprintKingdomCrowns(parseInt(cluckySprintCrwn, 10));
        if (cluckySprintFruits)
          setCluckySprintKingdomFruitBank(JSON.parse(cluckySprintFruits));
        if (cluckySprintWallpaper)
          setCluckySprintKingdomSelectedWallpaper(
            parseInt(cluckySprintWallpaper, 10),
          );
      } catch (e) {}
    };

    cluckySprintKingdomLoadProgress();
  }, []);

  const cluckySprintKingdomGetLevelData = selectedLvl => {
    const cluckyIdx = Math.min(Math.max(selectedLvl, 1), 50) - 1;
    return cluckysprintlevels[cluckyIdx];
  };

  const cluckySprintKingdomResetCollectedForNeeds = selectedObj => {
    const cluckySprintInitialValue = {};
    Object.keys(selectedObj).forEach(keys => {
      cluckySprintInitialValue[keys] = 0;
    });
    return cluckySprintInitialValue;
  };

  const cluckySprintKingdomSumNeeds = SelectedObj =>
    Object.values(SelectedObj).reduce((acc, v) => acc + v, 0);

  const cluckySprintKingdomSumCollected = collectedObj =>
    Object.values(collectedObj).reduce(
      (accum, ittValue) => accum + ittValue,
      0,
    );

  const cluckySprintKingdomClearLoops = () => {
    if (cluckySprintKingdomTimerRef.current) {
      clearInterval(cluckySprintKingdomTimerRef.current);
      cluckySprintKingdomTimerRef.current = null;
    }
    if (cluckySprintKingdomSpawnRef.current) {
      clearInterval(cluckySprintKingdomSpawnRef.current);
      cluckySprintKingdomSpawnRef.current = null;
    }
  };

  useEffect(() => () => cluckySprintKingdomClearLoops(), []);

  const cluckySprintKingdomStartLevel = selectedLvl => {
    cluckySprintKingdomClearLoops();
    const cluckySprintData = cluckySprintKingdomGetLevelData(selectedLvl);
    const initialCollected = cluckySprintKingdomResetCollectedForNeeds(
      cluckySprintData.needs,
    );

    setCluckySprintKingdomNeeds(cluckySprintData.needs);
    setCluckySprintKingdomCollected(initialCollected);
    setCluckySprintKingdomTimeLeft(cluckySprintData.time);
    setCluckySprintKingdomFruits([]);
    setCluckySprintKingdomScreen('game');

    cluckySprintKingdomTimerRef.current = setInterval(() => {
      setCluckySprintKingdomTimeLeft(previous => {
        if (previous <= 1) {
          cluckySprintKingdomFinishLevel(false);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    cluckySprintKingdomSpawnRef.current = setInterval(() => {
      cluckySprintKingdomSpawnFruit(cluckySprintData.needs);
    }, 700);
  };

  const cluckySprintKingdomSpawnFruit = SelectedObjs => {
    const cluckySprintFruitTypesAll = Object.keys(
      cluckySprintKingdomFruitImages,
    );
    const cluckySprintNeedTypes = Object.keys(SelectedObjs);
    const cluckySprintPool = [
      ...cluckySprintNeedTypes,
      ...cluckySprintNeedTypes,
      ...cluckySprintFruitTypesAll,
    ];
    const cluckySprintType =
      cluckySprintPool[Math.floor(Math.random() * cluckySprintPool.length)] ||
      'orange';
    const cluckySprintStartX = Math.random() * (width - 80) + 20;
    const cluckySprintAnim = new Animated.Value(-60);
    const cluckySprintId = Date.now().toString() + Math.random().toString();

    const newCluckyFruit = {
      id: cluckySprintId,
      type: cluckySprintType,
      x: cluckySprintStartX,
      anim: cluckySprintAnim,
    };
    setCluckySprintKingdomFruits(prevFruit => [...prevFruit, newCluckyFruit]);

    Animated.timing(cluckySprintAnim, {
      toValue: height + 80,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setCluckySprintKingdomFruits(prevFruit =>
        prevFruit.filter(f => f.id !== newCluckyFruit.id),
      );
    });
  };

  const cluckySprintKingdomOnFruitPress = selectedFruit => {
    const { type, id } = selectedFruit;

    setCluckySprintKingdomFruits(prevFruit =>
      prevFruit.filter(fruit => fruit.id !== id),
    );

    if (!cluckySprintKingdomNeeds[type]) return;

    setCluckySprintKingdomCollected(prevCollected => {
      const cluckySprintCurrent = prevCollected[type];
      const cluckySprintMax = cluckySprintKingdomNeeds[type];

      if (cluckySprintCurrent >= cluckySprintMax) return prevCollected;

      const updatedCluckyCollected = {
        ...prevCollected,
        [type]: cluckySprintCurrent + 1,
      };

      if (
        cluckySprintKingdomSumCollected(updatedCluckyCollected) >=
        cluckySprintKingdomSumNeeds(cluckySprintKingdomNeeds)
      ) {
        cluckySprintKingdomFinishLevel(true, updatedCluckyCollected);
      }

      return updatedCluckyCollected;
    });
  };

  const cluckySprintKingdomAddFruitsToBank = async collectedObs => {
    const cluckySprintUpdated = { ...cluckySprintKingdomFruitBank };

    Object.keys(collectedObs).forEach(currKey => {
      cluckySprintUpdated[currKey] =
        (cluckySprintUpdated[currKey] || 0) + collectedObs[currKey];
    });

    setCluckySprintKingdomFruitBank(cluckySprintUpdated);
    await AsyncStorage.setItem(
      'cluckySprintFruitBank',
      JSON.stringify(cluckySprintUpdated),
    );
  };

  const cluckySprintKingdomFinishLevel = (
    fromTap = false,
    overrideCollected = null,
  ) => {
    cluckySprintKingdomClearLoops();

    const cluckySprintData = cluckySprintKingdomGetLevelData(
      cluckySprintKingdomLevel,
    );
    const cluckySprintFinalCollected =
      overrideCollected || cluckySprintKingdomCollected;

    let cluckySprintSuccess = true;
    Object.keys(cluckySprintData.needs).forEach(k => {
      if ((cluckySprintFinalCollected[k] || 0) !== cluckySprintData.needs[k])
        cluckySprintSuccess = false;
    });

    let cluckySprintEarned = false;
    if (cluckySprintSuccess) {
      cluckySprintEarned = true;
      const newcluckySprintCrowns = cluckySprintKingdomCrowns + 1;
      setCluckySprintKingdomCrowns(newcluckySprintCrowns);
      AsyncStorage.setItem('cluckySprintCrowns', String(newcluckySprintCrowns));
    }

    if (cluckySprintSuccess) {
      cluckySprintKingdomAddFruitsToBank(cluckySprintFinalCollected);
      const newcluckySprintLevel = Math.min(cluckySprintKingdomLevel + 1, 50);
      setCluckySprintKingdomLevel(newcluckySprintLevel);
      AsyncStorage.setItem('cluckySprintLevel', String(newcluckySprintLevel));
    }

    setCluckySprintKingdomResultSuccess(cluckySprintSuccess);
    setCluckySprintKingdomResultCrownEarned(cluckySprintEarned);
    setCluckySprintKingdomResultNeeds(cluckySprintData.needs);
    setCluckySprintKingdomResultCollected(cluckySprintFinalCollected);
    setCluckySprintKingdomFruits([]);
    setCluckySprintKingdomScreen('result');
  };

  const cluckySprintKingdomOnStartPlayPress = () =>
    cluckySprintKingdomStartLevel(cluckySprintKingdomLevel);

  const cluckySprintKingdomOnResultNextLevel = () =>
    cluckySprintKingdomStartLevel(cluckySprintKingdomLevel);

  const cluckySprintKingdomOnResultHome = () => {
    cluckySprintKingdomClearLoops();
    navigation.goBack();
  };

  const cluckySprintKingdomOnShare = async () => {
    try {
      const cluckySprintMessage = cluckySprintKingdomResultSuccess
        ? `I completed level ${
            cluckySprintKingdomLevel - 1
          } and collected ${cluckySprintKingdomCrowns} crowns in Clucky Sprint Kingdom!`
        : `Level failed ${cluckySprintKingdomLevel} in Clucky Sprint Kingdom.`;

      await Share.share({ message: cluckySprintMessage });
    } catch (e) {}
  };

  const cluckySprintKingdomFormatTime = sec =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(
      sec % 60,
    ).padStart(2, '0')}`;

  const cluckySprintKingdomRenderFruitCounters = (
    cluckySprintNeedsObj,
    cluckySprintCollObj,
  ) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        flexWrap: 'wrap',
      }}
    >
      {Object.keys(cluckySprintNeedsObj).map(currKey => {
        const cluckySprintNeed = cluckySprintNeedsObj[currKey];
        const cluckySprintHave = cluckySprintCollObj
          ? cluckySprintCollObj[currKey] || 0
          : cluckySprintNeed;

        return (
          <View
            key={currKey}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 6,
              marginVertical: 4,
            }}
          >
            <Image
              source={cluckySprintKingdomFruitImages[currKey]}
              style={{ marginRight: 6 }}
              resizeMode="contain"
            />
            <Text style={styles.cluckySprintKingdomFruitCounterText}>
              {cluckySprintHave}
            </Text>
          </View>
        );
      })}
    </View>
  );

  const cluckySprintKingdomIntro = () => (
    <ImageBackground
      source={
        cluckySprintKingdomWallpapers[cluckySprintKingdomSelectedWallpaper]
      }
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cluckySprintKingdomWelcomeWrap}>
          <TouchableOpacity
            style={styles.cluckySprintKingdomHeader}
            onPress={() => cluckySprintKingdomNavigation.goBack()}
          >
            <Image
              source={require('../../assets/images/cluckySprintBack.png')}
            />
            <Text style={styles.cluckySprintKingdomBackText}>START PLAY</Text>
          </TouchableOpacity>

          <Text style={styles.cluckySprintKingdomFruitInfoText}>
            {`Fruits appear in each level.

Click only the ones you need for that level.

Complete the tasks within the allotted time.

After completing the levels, you get different fruits.

The fruits can be used to unlock new backgrounds in the corresponding section.`}
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={cluckySprintKingdomOnStartPlayPress}
          >
            <ImageBackground
              source={require('../../assets/images/cluckySprintbtn.png')}
              style={styles.cluckySprintKingdomBtn}
            >
              <Text style={styles.cluckySprintKingdomBtnText}>START PLAY</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );

  const cluckySprintKingdomGame = () => {
    const cluckySprintKingdomData = cluckySprintKingdomGetLevelData(
      cluckySprintKingdomLevel,
    );

    return (
      <ImageBackground
        source={
          cluckySprintKingdomWallpapers[cluckySprintKingdomSelectedWallpaper]
        }
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cluckySprintKingdomGameWrap}>
            <LinearGradient
              colors={['#720022', '#40A6FF']}
              style={styles.cluckySprintKingdomGradient}
            >
              <View style={styles.cluckySprintKingdomWelcomeContainer}>
                <Text style={styles.cluckySprintKingdomLevelTitle}>
                  LEVEL {cluckySprintKingdomData.id}
                </Text>
                {cluckySprintKingdomRenderFruitCounters(
                  cluckySprintKingdomNeeds,
                  cluckySprintKingdomCollected,
                )}
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['#720022', '#40A6FF']}
              style={styles.cluckySprintKingdomGradientTimer}
            >
              <View style={styles.cluckySprintKingdomWelcomeContainerTimer}>
                <Text style={styles.cluckySprintKingdomTimerText}>
                  {cluckySprintKingdomFormatTime(cluckySprintKingdomTimeLeft)}
                </Text>
              </View>
            </LinearGradient>

            <View style={styles.cluckySprintKingdomFruitsArea}>
              {cluckySprintKingdomFruits.map(fruit => (
                <TouchableWithoutFeedback
                  key={fruit.id}
                  onPress={() => cluckySprintKingdomOnFruitPress(fruit)}
                >
                  <Animated.View
                    style={[
                      styles.cluckySprintKingdomFruitItem,
                      {
                        transform: [{ translateY: fruit.anim }],
                        left: fruit.x,
                      },
                    ]}
                  >
                    <Image
                      source={cluckySprintKingdomFruitImages[fruit.type]}
                      style={styles.cluckySprintKingdomFruitImage}
                    />
                  </Animated.View>
                </TouchableWithoutFeedback>
              ))}
            </View>

            <View style={styles.cluckySprintKingdomBottomHomeWrap}>
              <TouchableOpacity
                onPress={() => {
                  cluckySprintKingdomClearLoops();
                  cluckySprintKingdomNavigation.goBack();
                }}
              >
                <ImageBackground
                  source={require('../../assets/images/cluckySprintbtns.png')}
                  style={styles.cluckySprintKingdomHomeBtn}
                >
                  <Text style={styles.cluckySprintKingdomHomeBtnText}>
                    HOME
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  };

  const cluckySprintKingdomResult = () => {
    const cluckySprintLabel = cluckySprintKingdomResultSuccess
      ? cluckySprintKingdomLevel - 1
      : cluckySprintKingdomLevel;

    return (
      <ImageBackground
        source={
          cluckySprintKingdomWallpapers[cluckySprintKingdomSelectedWallpaper]
        }
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cluckySprintKingdomResultWrap}>
            <LinearGradient
              colors={['#720022', '#40A6FF']}
              style={styles.cluckySprintKingdomGradientCompleted}
            >
              <View style={styles.cluckySprintKingdomWelcomeContainerCompleted}>
                <Text style={styles.cluckySprintKingdomResultTitle}>
                  LEVEL {cluckySprintLabel}{' '}
                  {cluckySprintKingdomResultSuccess ? 'Completed' : 'False'}
                </Text>

                <Text style={styles.cluckySprintKingdomResultSubtitle}>
                  {cluckySprintKingdomResultSuccess
                    ? 'All fruits collected!'
                    : 'Some fruits missed.'}
                </Text>

                {cluckySprintKingdomRenderFruitCounters(
                  cluckySprintKingdomResultNeeds,
                  cluckySprintKingdomResultCollected,
                )}
              </View>
            </LinearGradient>

            <View style={styles.cluckySprintKingdomResultButtons}>
              <TouchableOpacity
                onPress={cluckySprintKingdomOnResultNextLevel}
                activeOpacity={0.6}
              >
                <ImageBackground
                  source={require('../../assets/images/cluckySprintbtnRes.png')}
                  style={styles.cluckySprintKingdomResultBtn}
                >
                  <Text style={styles.cluckySprintKingdomResultBtnText}>
                    NEXT LEVEL
                  </Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={cluckySprintKingdomOnShare}
                activeOpacity={0.6}
              >
                <ImageBackground
                  source={require('../../assets/images/cluckySprintbtnRes.png')}
                  style={styles.cluckySprintKingdomResultBtn}
                >
                  <Text style={styles.cluckySprintKingdomResultBtnText}>
                    SHARE
                  </Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={cluckySprintKingdomOnResultHome}
                activeOpacity={0.6}
              >
                <ImageBackground
                  source={require('../../assets/images/cluckySprintbtnRes.png')}
                  style={styles.cluckySprintKingdomResultBtn}
                >
                  <Text style={styles.cluckySprintKingdomResultBtnText}>
                    HOME
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  };

  if (cluckySprintKingdomScreen === 'game') return cluckySprintKingdomGame();
  if (cluckySprintKingdomScreen === 'result')
    return cluckySprintKingdomResult();
  return cluckySprintKingdomIntro();
};

const styles = StyleSheet.create({
  cluckySprintKingdomWelcomeWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.08,
    justifyContent: 'space-between',
    padding: 17,
    paddingBottom: 70,
  },
  cluckySprintKingdomGradient: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    width: '100%',
  },
  cluckySprintKingdomWelcomeContainer: {
    padding: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    backgroundColor: '#720022',
    margin: 2,
    paddingVertical: 60,
  },
  cluckySprintKingdomGradientCompleted: {
    borderRadius: 22,
    width: '100%',
  },
  cluckySprintKingdomWelcomeContainerCompleted: {
    padding: 20,
    borderRadius: 22,
    alignItems: 'center',
    backgroundColor: '#720022',
    margin: 2,
    paddingVertical: 60,
  },
  cluckySprintKingdomGradientTimer: {
    borderRadius: 12,
    width: 167,
    alignSelf: 'center',
    top: -20,
  },
  cluckySprintKingdomWelcomeContainerTimer: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#720022',
    margin: 2,
  },
  cluckySprintKingdomBtnText: {
    color: '#6D1300',
    fontSize: 24,
    fontWeight: '900',
  },
  cluckySprintKingdomBtn: {
    marginTop: 40,
    width: 242,
    height: 103,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cluckySprintKingdomFruitInfoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  cluckySprintKingdomBackText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  cluckySprintKingdomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    alignSelf: 'flex-start',
  },
  cluckySprintKingdomGameWrap: {
    flex: 1,
    paddingBottom: 40,
  },
  cluckySprintKingdomLevelTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  cluckySprintKingdomTimerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  cluckySprintKingdomFruitsArea: {
    flex: 1,
    marginTop: 30,
  },
  cluckySprintKingdomFruitItem: {
    position: 'absolute',
  },
  cluckySprintKingdomFruitCounterText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  cluckySprintKingdomBottomHomeWrap: {
    alignItems: 'center',
    marginTop: 12,
  },
  cluckySprintKingdomHomeBtn: {
    width: 112,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cluckySprintKingdomHomeBtnText: {
    color: '#6D1300',
    fontSize: 12,
    fontWeight: '900',
  },
  cluckySprintKingdomFruitImage: {
    width: 50,
    height: 50,
  },
  cluckySprintKingdomResultWrap: {
    flex: 1,
    paddingHorizontal: 18,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  cluckySprintKingdomResultTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },
  cluckySprintKingdomResultSubtitle: {
    color: '#FFFFFF',
    fontSize: 22,
    marginTop: 50,
    fontWeight: '500',
  },
  cluckySprintKingdomCrownText: {
    color: '#FFD166',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 16,
  },
  cluckySprintKingdomResultButtons: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  cluckySprintKingdomResultBtn: {
    width: 232,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cluckySprintKingdomResultBtnText: {
    color: '#6D1300',
    fontSize: 24,
    fontWeight: '900',
  },
});

export default CluckyKingdomSprintPlayground;
