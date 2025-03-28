import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Score {
  id: string;
  player: string;
  score: number;
  date: string;
}

const mockScores: Score[] = [
  { id: '1', player: 'Player 1', score: 120, date: '2024-03-20' },
  { id: '2', player: 'Player 2', score: 100, date: '2024-03-19' },
  { id: '3', player: 'Player 3', score: 90, date: '2024-03-18' },
];

export const LeaderboardScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderScore = ({ item, index }: { item: Score; index: number }) => (
    <View style={styles.scoreItem}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{index + 1}</Text>
      </View>
      <View style={styles.scoreInfo}>
        <Text style={styles.playerName}>{item.player}</Text>
        <Text style={styles.scoreDate}>{item.date}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{item.score}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Leaderboard</Text>
      </View>

      <FlatList
        data={mockScores}
        renderItem={renderScore}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 20,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scoreInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scoreDate: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  scoreContainer: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
}); 