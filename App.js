import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import CustomMenu from './topMenu';

import AngelsLogo from './images/Angels.png';
import DiamondbacksLogo from './images/Diamondbacks.png';
import OriolesLogo from './images/Orioles.png';
import RedSoxLogo from './images/RedSox.png';
import CubsLogo from './images/Cubs.png';
import RedsLogo from './images/Reds.png';
import GuardiansLogo from './images/Guardians.png';
import RockiesLogo from './images/Rockies.png';
import TigersLogo from './images/Tigers.png';
import AstrosLogo from './images/Astros.png';
import RoyalsLogo from './images/Royals.png';
import DodgersLogo from './images/Dodgers.png';
import NationalsLogo from './images/Nationals.png';
import MetsLogo from './images/Mets.png';
import AthleticsLogo from './images/Athletics.png';
import PiratesLogo from './images/Pirates.png';
import PadresLogo from './images/Padres.png';
import MarinersLogo from './images/Mariners.png';
import GiantsLogo from './images/Giants.png';
import CardinalsLogo from './images/Cardinals.png';
import RaysLogo from './images/Rays.png';
import RangersLogo from './images/Rangers.png';
import BlueJaysLogo from './images/BlueJays.png';
import TwinsLogo from './images/Twins.png';
import PhilliesLogo from './images/Phillies.png';
import BravesLogo from './images/Braves.png';
import WhiteSoxLogo from './images/WhiteSox.png';
import MarlinsLogo from './images/Marlins.png';
import YankeesLogo from './images/Yankees.png';
import BrewersLogo from './images/Brewers.png';

//Link to GitHub with main urls for api: https://github.com/brianhaferkamp/mlbapidata


const teamLogos = {
  'Los Angeles Angels': AngelsLogo,
  'Arizona Diamondbacks': DiamondbacksLogo,
  'Baltimore Orioles': OriolesLogo,
  'Boston Red Sox': RedSoxLogo,
  'Chicago Cubs': CubsLogo,
  'Cincinnati Reds': RedsLogo,
  'Cleveland Guardians': GuardiansLogo,
  'Colorado Rockies': RockiesLogo,
  'Detroit Tigers': TigersLogo,
  'Houston Astros': AstrosLogo,
  'Kansas City Royals': RoyalsLogo,
  'Los Angeles Dodgers': DodgersLogo,
  'Washington Nationals': NationalsLogo,
  'New York Mets': MetsLogo,
  'Oakland Athletics': AthleticsLogo,
  'Pittsburgh Pirates': PiratesLogo,
  'San Diego Padres': PadresLogo,
  'Seattle Mariners': MarinersLogo,
  'San Francisco Giants': GiantsLogo,
  'St. Louis Cardinals': CardinalsLogo,
  'Tampa Bay Rays': RaysLogo,
  'Texas Rangers': RangersLogo,
  'Toronto Blue Jays': BlueJaysLogo,
  'Minnesota Twins': TwinsLogo,
  'Philadelphia Phillies': PhilliesLogo,
  'Atlanta Braves': BravesLogo,
  'Chicago White Sox': WhiteSoxLogo,
  'Miami Marlins': MarlinsLogo,
  'New York Yankees': YankeesLogo,
  'Milwaukee Brewers': BrewersLogo
};

const App = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1');
        setGames(response.data.dates);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const renderGameItem = ({ item, index }) => (
    <View style={styles.gameContainer}>
      <Text style={styles.dateText}>Date: {item.date}</Text>
      <Text style={styles.gamesText}>Total Games: {item.totalGames}</Text>
      <FlatList
        data={item.games}
        keyExtractor={game => game.gamePk.toString()}
        renderItem={({ item: game }) => (
          <View style={styles.gameItemContainer}>
            <View style={styles.teamContainer}>
              <Image source={teamLogos[game.teams.away.team.name]} style={styles.teamLogo} />
              <Text style={styles.teamText}>
                {game.teams.away.team.name} (W: {game.teams.away.leagueRecord.wins} - L: {game.teams.away.leagueRecord.losses})
              </Text>
            </View>
            <View style={styles.teamContainer}>
              <Image source={teamLogos[game.teams.home.team.name]} style={styles.teamLogo} />
              <Text style={styles.teamText}>
                {game.teams.home.team.name} (W: {game.teams.home.leagueRecord.wins} - L: {game.teams.home.leagueRecord.losses})
              </Text>
            </View>
            <Text style={styles.locationText}>Location: {game.venue.name}</Text>
          </View>
        )}
      />
      {index < games.length - 1 && <View style={styles.divider} />}
        <CustomMenu />
    </View>

  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={styles.heading}>MLB Games</Text>
      </View>
      <FlatList
        data={games}
        keyExtractor={item => item.date}
        renderItem={renderGameItem}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 25,
    color: '#333'
  },
  gameContainer: {
    marginBottom: 20,
    borderRadius: 15, 
    shadowColor: '#000', 
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', 
  },
  gamesText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', 
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamLogo: {
    width: 35,
    height: 35,
    marginLeft: -5,
    marginRight: 5,
  },
  teamText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333', 
  },
  locationText: {
    fontSize: 14,
    color: '#555', 
  },
  gameItemContainer: {
    borderWidth: 2,
    borderColor: '#ccc', 
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9', 
  },
});


export default App;