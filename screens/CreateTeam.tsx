import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, FlatList, Alert } from 'react-native';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState<string[]>([]);

  const handleCreateTeam = () => {
    if (teamName.trim()) {
      if (teams.includes(teamName)) {
        alert('Team name already exists.');
      } else if (teams.length >= 15) {
        alert('Cannot create more than 15 teams.');
      } else if (teamName.length < 4) {
        alert('Team name must be at least 4 characters long.');
      } else {
        setTeams([...teams, teamName]);
        setTeamName('');
      }
    }
  };

  const handleChangeValue = (teamName: string) => {
    if (teamName.length <= 50) {
      setTeamName(teamName);
    } else {
      alert('Team name cannot exceed 50 characters.');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.formContainer} behavior='padding' keyboardVerticalOffset={100}>
        <Text style={styles.title}>Create Team</Text>
        <TextInput
          style={styles.input}
          placeholder='Name'
          placeholderTextColor='#7b7a7a'
          value={teamName}
          onChangeText={handleChangeValue}
          keyboardType='default'
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateTeam}>
          <Text style={styles.buttonText}>Create Team</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <FlatList
        data={teams}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.teamItem}>
            <Text style={styles.teamName}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  keyboardAvoidingView: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#404040',
  },
  inputTitle: {
    color: '#404040',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#404040',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#404040',
  },
  button: {
    width: '100%',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  teamItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginVertical: 5,
  },
  teamName: {
    fontSize: 16,
    color: '#404040',
  },
});

export default CreateTeam;
