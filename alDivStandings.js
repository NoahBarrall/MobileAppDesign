import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ALDivisionStandings = () => {
    const [alEastStandings, setAlEastStandings] = useState([]);
    const [alCentralStandings, setAlCentralStandings] = useState([]);
    const [alWestStandings, setAlWestStandings] = useState([]);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await axios.get('https://statsapi.mlb.com/api/v1/standings?leagueId=103');
                const records = response.data.records;
                const alEast = records.find(record => record.division.id === 201);
                const alCentral = records.find(record => record.division.id === 202);
                const alWest = records.find(record => record.division.id === 200);

                setAlEastStandings(alEast ? alEast.teamRecords : []);
                setAlCentralStandings(alCentral ? alCentral.teamRecords : []);
                setAlWestStandings(alWest ? alWest.teamRecords : []);
            } catch (error) {
                console.error('Error fetching standings: ', error);
            }
        };

        fetchStandings();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item.divisionRank}</Text>
            <Text style={styles.text}>{item.team.name}</Text>
            <Text style={styles.text}>{item.divisionGamesBack}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.divisionStandings}>
                <Text style={styles.divisionHeaderText}>AL East</Text>
                <FlatList
                    data={alEastStandings}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.divisionStandings}>
                <Text style={styles.divisionHeaderText}>AL Central</Text>
                <FlatList
                    data={alCentralStandings}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.divisionStandings}>
                <Text style={styles.divisionHeaderText}>AL West</Text>
                <FlatList
                    data={alWestStandings}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%'
    },
    text: {
        fontSize: 15,
    },
    standingsViews: {
        flex: 1,
        marginTop: 10
    },
    standingsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        marginRight: 5
    },
    standingsText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    GBText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    divisionStandings: {
        marginBottom: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    divisionHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    }
});

export default ALDivisionStandings;
