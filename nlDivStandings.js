import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const NLDivisionStandings = () => {
    const [nlEastStandings, setNLEastStandings] = useState([]);
    const [nlCentralStandings, setNLCentralStandings] = useState([]);
    const [nlWestStandings, setNLWestStandings] = useState([]);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await axios.get('https://statsapi.mlb.com/api/v1/standings?leagueId=104');
                const records = response.data.records;
                const nlEast = records.find(record => record.division.id === 204);
                const nlCentral = records.find(record => record.division.id === 205);
                const nlWest = records.find(record => record.division.id === 203);

                setNLEastStandings(nlEast ? nlEast.teamRecords : []);
                setNLCentralStandings(nlCentral ? nlCentral.teamRecords : []);
                setNLWestStandings(nlWest ? nlWest.teamRecords : []);
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
                <Text style={styles.divisionHeaderText}>NL East</Text>
                <FlatList
                    data={nlEastStandings}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.divisionStandings}>
                <Text style={styles.divisionHeaderText}>NL Central</Text>
                <FlatList
                    data={nlCentralStandings}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.divisionStandings}>
                <Text style={styles.divisionHeaderText}>NL West</Text>
                <FlatList
                    data={nlWestStandings}
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

export default NLDivisionStandings;
