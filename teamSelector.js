import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TeamSelector = () => {
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [searched, setSearched] = useState(false);

  const fetchAllGames = async () => {
    try {
      if (!teamId) return;
      const response = await axios.get(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&teamId=${teamId}&startDate=2024-03-28&endDate=2024-05-08`);
      setAllGames(response.data.dates);
    } catch (error) {
      console.error('Error fetching all games: ', error);
    }
  };

  useEffect(() => {
    if (searched) {
      fetchAllGames();
    }
  }, [teamId, searched]);

  const handleSearch = () => {
    setSearched(true);
  };

  const teamNametoId = {
    'Angels': '108', 'Diamondbacks': '109', 'Orioles': '110', 'Red Sox': '111', 'Cubs': '112', 'Reds': '113',
    'Indians': '114', 'Guardians': '114', 'Rockies': '115', 'Tigers': '116', 'Astros': '117', 'Royals': '118',
    'Dodgers': '119', 'Nationals': '120', 'Mets': '121', 'Athletics': '133', 'Pirates': '134', 'Padres': '135',
    'Mariners': '136', 'Giants': '137', 'Cardinals': '138', 'Rays': '139', 'Rangers': '140', 'Blue Jays': '141',
    'Twins': '142', 'Phillies': '143', 'Braves': '144', 'White Sox': '145', 'Marlins': '146', 'Yankees': '147',
    'Brewers': '158'
  };

  const convertTeamNametoId = (inputName) => {
    return teamNametoId[inputName] || '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.fullSeasonText}>MLB Team Full Schedule</Text>
      <TextInput
        placeholder="Enter Team Name"
        onChangeText={(text) => {
          setTeamName(text);
          setTeamId(convertTeamNametoId(text));
        }}
        value={teamName}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {searched && (
        <FlatList
          data={allGames}
          keyExtractor={item => item.date}
          renderItem={({ item }) => (
            <View style={styles.gameContainer}>
              <Text style={styles.date}>Date: {item.date}</Text>
              <FlatList
                data={item.games}
                keyExtractor={game => game.gamePk.toString()}
                renderItem={({ item: game }) => (
                <View style={styles.game}>
                  <Text style={styles.gameText}>
                    <Text style={styles.teamName}>{game.teams.away.team.name}</Text>: {game.teams.away.score}
                  </Text>
                  <Text style={styles.gameText}>
                    <Text style={styles.teamName}>{game.teams.home.team.name}</Text>: {game.teams.home.score}
                  </Text>
                </View>
                )}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  gameContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
    color: '#666',
  },
  game: {
    marginLeft: 10,
  },
  gameText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#444',
  },
  fullSeasonText: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7a1c15',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  teamName: {
    fontWeight: 'bold',
    color: '#7a1c15',
  },
});

export default TeamSelector;
