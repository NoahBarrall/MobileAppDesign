import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import TeamSelector from './teamSelector';
import StandingsAL from './standings/standingsAL';
import StandingsNL from './standings/standingsNL';
import ALDivisionStandings from './standings/alDivStandings';
import NLDivisionStandings from './standings/nlDivStandings';

//got modal code from: https://reactnative.dev/docs/modal

const CustomMenu = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [showTeamSelector, setShowTeamSelector] = useState(false);
  const [showStandings, setShowStandings] = useState(null); 
  const [showDivStandings, setShowDivStandings] = useState(null);

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const openTeamSelect = () => {
    setShowTeamSelector(true);
    setMenuVisible(false);
    setShowStandings(null); 
    setShowDivStandings(null);
  };

  const openStandings = (type) => {
    setShowStandings(type);
    setMenuVisible(false);
    setShowTeamSelector(false);
    setShowDivStandings(null);
  };

  const openDivStandings = (typeDiv) => {
    setShowDivStandings(typeDiv);
    setMenuVisible(false);
    setShowTeamSelector(false);
    setShowStandings(null);
  }

  return (
    <View>
      <TouchableOpacity onPress={handleMenuPress}>
        <Text style={styles.menuButton}>Options</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={handleCloseMenu}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => openTeamSelect()}>
              <Text style={styles.menuItem}>Team Full Season</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openStandings('AL')}>
              <Text style={styles.menuItem}>AL Standings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openStandings('NL')}>
              <Text style={styles.menuItem}>NL Standings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openDivStandings('ALDiv')}>
              <Text style={styles.menuItem}>AL Divisions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openDivStandings('NLDiv')}>
              <Text style={styles.menuItem}>NL Divisions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showTeamSelector && <TeamSelector />}
      {showStandings === 'AL' && <StandingsAL />}
      {showStandings === 'NL' && <StandingsNL />}
      {showDivStandings === 'ALDiv' && <ALDivisionStandings />}
      {showDivStandings === 'NLDiv' && <NLDivisionStandings />}
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    fontSize: 16,
    padding: 10,
  },
});

export default CustomMenu;
