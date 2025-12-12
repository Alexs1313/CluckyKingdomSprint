import React, { useEffect, useRef, useState } from 'react';
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
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { captureRef } from 'react-native-view-shot';
import { cluckySprintKingdomCrownImages } from '../CluckyKingdomSprintConsts/cluckySprintKingdomAssets';

const { height } = Dimensions.get('window');

const CluckyKingdomSprintCrowns = () => {
  const navigation = useNavigation();
  const [cluckySprintKingdomScreen, setCluckySprintKingdomScreen] =
    useState('info');
  const [cluckySprintKingdomCrowns, setCluckySprintKingdomCrowns] = useState(0);
  const [cluckySprintKingdomCurrentLevel, setCluckySprintKingdomCurrentLevel] =
    useState(1);

  const cluckySprintKingdomImageRef = useRef(null);

  useEffect(() => {
    cluckySprintKingdomLoadProgress();
  }, []);

  const cluckySprintKingdomLoadProgress = async () => {
    try {
      const cluckySprintLvl = await AsyncStorage.getItem('cluckySprintLevel');
      const cluckySprintCrown = await AsyncStorage.getItem(
        'cluckySprintCrowns',
      );

      if (cluckySprintLvl)
        setCluckySprintKingdomCurrentLevel(parseInt(cluckySprintLvl, 10));
      if (cluckySprintCrown)
        setCluckySprintKingdomCrowns(parseInt(cluckySprintCrown, 10));
    } catch {}
  };

  const cluckySprintKingdomShareWallpaper = async () => {
    try {
      const cluckySprintShareUri = await captureRef(
        cluckySprintKingdomImageRef,
        {
          format: 'png',
          quality: 1,
          result: 'tmpfile',
        },
      );

      let savedCluckySprintUri = cluckySprintShareUri.startsWith('file://')
        ? cluckySprintShareUri
        : 'file://' + cluckySprintShareUri;
      const pathToCheckCluckySprint = savedCluckySprintUri.replace(
        'file://',
        '',
      );
      const cluckySprintExists = await RNFS.exists(pathToCheckCluckySprint);
      if (!cluckySprintExists) return;

      await Share.open({
        title: 'Wallpaper from Thai Dreams with Flowers',
        url: savedCluckySprintUri,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (error) {
      if (!error?.message?.includes('error')) {
        console.error(error);
      }
    }
  };

  const cluckySprintKingdomRenderInfo = () => (
    <CluckySprintKingdomLayout>
      <View style={styles.cluckySprintKingdomInfoWrap}>
        <TouchableOpacity
          style={styles.cluckySprintKingdomBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/cluckySprintBack.png')} />
          <Text style={styles.cluckySprintKingdomHeaderText}>CROWNS</Text>
        </TouchableOpacity>

        <Text style={styles.cluckySprintKingdomInfoTitle}>
          How are crowns obtained?
        </Text>

        <Text style={styles.cluckySprintKingdomInfoText}>
          1 crown – after completing 10 levels
        </Text>
        <Text style={styles.cluckySprintKingdomInfoText}>
          2 crown – after 20 levels
        </Text>
        <Text style={styles.cluckySprintKingdomInfoText}>
          3 crown – after 30 levels
        </Text>
        <Text style={styles.cluckySprintKingdomInfoText}>
          4 crown – after 40 levels
        </Text>
        <Text style={styles.cluckySprintKingdomInfoText}>
          5 crown – after 50 levels
        </Text>

        <Text style={[styles.cluckySprintKingdomInfoText, { marginTop: 20 }]}>
          After receiving all five crowns, you can collect them – it opens a
          special exclusive background.
        </Text>

        <View style={styles.cluckySprintKingdomCenterFlex}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCluckySprintKingdomScreen('crowns')}
          >
            <ImageBackground
              source={require('../../assets/images/cluckySprintbtn.png')}
              style={styles.cluckySprintKingdomOkayBtn}
            >
              <Text style={styles.cluckySprintKingdomOkayText}>OKAY</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </CluckySprintKingdomLayout>
  );

  const cluckySprintKingdomRenderCrowns = () => (
    <CluckySprintKingdomLayout>
      <View style={styles.cluckySprintKingdomContainer}>
        <TouchableOpacity
          style={styles.cluckySprintKingdomBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/cluckySprintBack.png')} />
          <Text style={styles.cluckySprintKingdomHeaderText}>CROWNS</Text>
        </TouchableOpacity>

        {cluckySprintKingdomCrowns === 0 && (
          <View style={styles.cluckySprintKingdomLevelBar}>
            <Image
              source={require('../../assets/images/cluckySprintLvl.png')}
            />
            <Text style={styles.cluckySprintKingdomLevelText}>
              LEVEL {cluckySprintKingdomCurrentLevel}
            </Text>
          </View>
        )}

        {cluckySprintKingdomCrowns === 0 && (
          <Text style={styles.cluckySprintKingdomNoCrownsText}>
            You don't have any crowns yet
          </Text>
        )}

        {cluckySprintKingdomCrowns === 1 && (
          <View style={styles.cluckySprintKingdomOneCrownWrap}>
            <Image
              source={cluckySprintKingdomCrownImages[0]}
              style={styles.cluckySprintKingdomBigCrown}
            />
          </View>
        )}

        {cluckySprintKingdomCrowns > 1 && cluckySprintKingdomCrowns < 4 && (
          <View style={styles.cluckySprintKingdomCrownsGrid}>
            {[...Array(cluckySprintKingdomCrowns)].map((_, i) => (
              <Image
                key={i}
                source={cluckySprintKingdomCrownImages[i]}
                style={styles.cluckySprintKingdomSmallCrown}
              />
            ))}
          </View>
        )}

        {cluckySprintKingdomCrowns >= 4 && (
          <>
            <View style={styles.cluckySprintKingdomCrownsGrid}>
              {[...Array(cluckySprintKingdomCrowns)].map((_, i) => (
                <Image
                  key={i}
                  source={cluckySprintKingdomCrownImages[i]}
                  style={styles.cluckySprintKingdomSmallCrown}
                />
              ))}
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setCluckySprintKingdomScreen('wallpaper')}
            >
              <ImageBackground
                source={require('../../assets/images/cluckySprintbtn.png')}
                style={styles.cluckySprintKingdomWallpaperBtn}
              >
                <Text style={styles.cluckySprintKingdomWallpaperText}>
                  Wallpaper
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </>
        )}
      </View>
    </CluckySprintKingdomLayout>
  );

  const cluckySprintKingdomRenderWallpaper = () => (
    <CluckySprintKingdomLayout>
      <View style={styles.cluckySprintKingdomWallWrap}>
        <View style={styles.cluckySprintKingdomWallpaperBox}>
          <Image
            source={require('../../assets/images/cluckySprintWall.png')}
            style={styles.cluckySprintKingdomWallpaperPreview}
            ref={cluckySprintKingdomImageRef}
            collapsable={false}
          />

          <TouchableOpacity
            style={[
              styles.cluckySprintKingdomBackBtn,
              { position: 'absolute', top: 30, left: 50 },
            ]}
            onPress={() => setCluckySprintKingdomScreen('crowns')}
          >
            <Image
              source={require('../../assets/images/cluckySprintBack.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={cluckySprintKingdomShareWallpaper}
        >
          <ImageBackground
            source={require('../../assets/images/cluckySprintbtn.png')}
            style={styles.cluckySprintKingdomShareBtn}
          >
            <Text style={styles.cluckySprintKingdomShareText}>SHARE</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </CluckySprintKingdomLayout>
  );

  if (cluckySprintKingdomScreen === 'info')
    return cluckySprintKingdomRenderInfo();
  if (cluckySprintKingdomScreen === 'crowns')
    return cluckySprintKingdomRenderCrowns();
  if (cluckySprintKingdomScreen === 'wallpaper')
    return cluckySprintKingdomRenderWallpaper();

  return null;
};

const styles = StyleSheet.create({
  cluckySprintKingdomContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.08,
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  cluckySprintKingdomBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    alignSelf: 'flex-start',
    marginBottom: 40,
  },
  cluckySprintKingdomHeaderText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  cluckySprintKingdomInfoWrap: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: height * 0.08,
    paddingBottom: 40,
  },
  cluckySprintKingdomInfoTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 20,
  },
  cluckySprintKingdomInfoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
  cluckySprintKingdomCenterFlex: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  cluckySprintKingdomOkayBtn: {
    width: 242,
    height: 102,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  cluckySprintKingdomOkayText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#6D1300',
  },
  cluckySprintKingdomLevelBar: {
    width: '100%',
    height: 34,
    backgroundColor: '#6D1300',
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  cluckySprintKingdomLevelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  cluckySprintKingdomNoCrownsText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 100,
  },
  cluckySprintKingdomOneCrownWrap: {
    marginTop: 120,
  },
  cluckySprintKingdomBigCrown: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  cluckySprintKingdomCrownsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  cluckySprintKingdomSmallCrown: {},
  cluckySprintKingdomWallpaperBtn: {
    width: 232,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cluckySprintKingdomWallpaperText: {
    color: '#6D1300',
    fontSize: 26,
    fontWeight: '900',
  },
  cluckySprintKingdomWallWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.08,
  },
  cluckySprintKingdomWallpaperBox: {
    width: '100%',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cluckySprintKingdomWallpaperPreview: {
    width: 360,
    height: 600,
    resizeMode: 'contain',
  },
  cluckySprintKingdomShareBtn: {
    width: 242,
    height: 102,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cluckySprintKingdomShareText: {
    color: '#6D1300',
    fontSize: 26,
    fontWeight: '900',
  },
});

export default CluckyKingdomSprintCrowns;
