import React, { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { cluckysprintlevels } from '../CluckyKingdomSprintData/cluckysprintlevels';
import { Image, StyleSheet, Text, View } from 'react-native';
import CluckySprintKingdomLayout from '../CluckyKingdomSprintComponents/CluckySprintKingdomLayout';
import { useStore } from '../CluckyKingdomSprintStore/cluckySprintKingdomContext';
import { cluckySprintKingdomFruitImages } from '../CluckyKingdomSprintConsts/cluckySprintKingdomAssets';
import CluckySprintKingdomButton from '../CluckyKingdomSprintComponents/CluckySprintKingdomButton';

const CluckyKingdomSprintHome = () => {
  const navigation = useNavigation();
  const { cluckySprintKingdomCurrentLevel, cluckySprintKingdomLoadLevel } =
    useStore();

  useFocusEffect(
    useCallback(() => {
      cluckySprintKingdomLoadLevel();
    }, []),
  );

  const cluckySprintKingdomLevelData =
    cluckysprintlevels[cluckySprintKingdomCurrentLevel - 1];
  const cluckySprintKingdomLevelNeeds = cluckySprintKingdomLevelData.needs;

  return (
    <CluckySprintKingdomLayout>
      <View style={styles.cluckySprintKingdomWelcomeWrap}>
        <Image
          source={require('../../assets/images/cluckySprintInfoLogo.png')}
          style={{ width: 113, height: 113, borderRadius: 32 }}
        />
        <View style={styles.cluckySprintKingdomFruitsWrapper}>
          {Object.keys(cluckySprintKingdomLevelNeeds).map(key => (
            <View style={styles.cluckySprintKingdomFruitContainer} key={key}>
              <Image source={cluckySprintKingdomFruitImages[key]} />
              <Text style={styles.cluckySprintKingdomFruitQuantity}>
                {cluckySprintKingdomLevelNeeds[key]}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.cluckySprintKingdomLevelCont}>
          <Image source={require('../../assets/images/cluckySprintLvl.png')} />
          <Text style={styles.cluckySprintKingdomLevelText}>
            LEVEL {cluckySprintKingdomCurrentLevel}
          </Text>
        </View>

        <View style={{ gap: 15 }}>
          <CluckySprintKingdomButton
            onPress={() =>
              navigation.navigate('CluckyKingdomSprintPlayground', {
                level: cluckySprintKingdomCurrentLevel,
              })
            }
            btnTitle={'START PLAY'}
          />
          <CluckySprintKingdomButton
            onPress={() => navigation.navigate('CluckyKingdomSprintCrowns')}
            btnTitle={'CROWNS'}
          />
          <CluckySprintKingdomButton
            onPress={() => navigation.navigate('CluckyKingdomSprintMarket')}
            btnTitle={'MARKET'}
          />
          <CluckySprintKingdomButton
            onPress={() => navigation.navigate('CluckyKingdomSprintInfo')}
            btnTitle={'INFO'}
          />
        </View>
      </View>
    </CluckySprintKingdomLayout>
  );
};

const styles = StyleSheet.create({
  cluckySprintKingdomWelcomeWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  cluckySprintKingdomBtnText: {
    color: '#6D1300',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  cluckySprintKingdomBtn: {
    marginTop: 13,
    width: 242,
    height: 103,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cluckySprintKingdomFruitQuantity: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  cluckySprintKingdomFruitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cluckySprintKingdomFruitsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 20,
  },
  cluckySprintKingdomLevelCont: {
    width: '90%',
    height: 34,
    backgroundColor: '#6D1300',
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  cluckySprintKingdomLevelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
});

export default CluckyKingdomSprintHome;
