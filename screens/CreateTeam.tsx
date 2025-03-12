import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Button from '../components/ui/Button';
import { useCreateTeam } from "../features/authentication/hooks/teams/useCreateTeam"
import { useFetchTeams } from "../features/authentication/hooks/useFetchTeams";
import { useAuthUser } from "../features/authentication/hooks/useAuthUser";
import { GlobalStyles } from "../styles/globalStyles";

const { colors } = GlobalStyles;

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [teamCreated, setCreatedTeams] = useState<string[]>([]);
  const { mutate, isPending: isCreatingTeam } = useCreateTeam();
  const { data: teams, isPending: isFetchingTeams } = useFetchTeams(); 
  const user = useAuthUser();

  const handleCreateTeam = () => {
    if (!user) {
      alert("Please login first to create a team");
      return;
    }

    mutate({ teamName, adminId: user.id });

    if (teamName.trim()) {
      if (teamCreated.includes(teamName)) {
        alert("Team name already exists.");
      } else if (teamCreated.length >= 15) {
        alert("Cannot create more than 15 teams.");
      } else {
        setCreatedTeams([...teamCreated, teamName]);
        setTeamName("");
      }
    }
  };

  const handleCancel = () => {
    setTeamName("");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <Text>Team Name</Text>
        <TextInput
          value={teamName}
          onChangeText={setTeamName}
          placeholder="Enter a name for your team"
          style={styles.input}
        />


        {isFetchingTeams ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (

          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>ID</Text>
              <Text style={styles.headerText}>Team Name</Text>
              <Text style={styles.headerText}>Email</Text>
            </View>


            <FlatList data={teams}
           
              keyExtractor={(item) => item?.member_id ? item.member_id.toString() : Math.random().toString()}
           
              renderItem={({ item }) => (
                <View style={styles.row}>
                  
                  <Text style={styles.cell}>{item.member_id}</Text>
                  <Text style={styles.cell}>{item.team_name}</Text>
                  <Text style={styles.cell}>{item.member_email}</Text>
                </View>
              )}
            />
          </View>

        )}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <Button variant="primary" onPress={handleCancel}>
              Cancel
            </Button>
          </View>
          <View style={styles.button}>
            <Button variant="primary" onPress={handleCreateTeam}>
              Create Team
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  bottomContainer: {
    padding: 20,
    // borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  container: {
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
 
});

export default CreateTeam;
