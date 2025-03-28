import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGameContext } from '../context/GameContext';
import { DifficultyLevel } from '../types/game';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Leaderboard: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { difficulty, setDifficulty, isMuted, setIsMuted } = useGameContext();

  const difficulties: DifficultyLevel[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Difficulty</Text>
        <View style={styles.difficultyContainer}>
          {difficulties.map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.difficultyButton,
                difficulty === level && styles.difficultyButtonActive,
              ]}
              onPress={() => setDifficulty(level)}
            >
              <Text
                style={[
                  styles.difficultyButtonText,
                  difficulty === level && styles.difficultyButtonTextActive,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sound</Text>
        <View style={styles.soundContainer}>
          <Text style={styles.soundLabel}>Sound Effects</Text>
          <Switch
            value={!isMuted}
            onValueChange={(value) => setIsMuted(!value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={!isMuted ? '#2196F3' : '#f4f3f4'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  difficultyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#4CAF50',
  },
  difficultyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  difficultyButtonTextActive: {
    color: '#FFFFFF',
  },
  soundContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soundLabel: {
    fontSize: 18,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}); 
export default SettingsScreen; 