import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Button from '../components/ui/Button';
import { useCreateTeam } from "../features/authentication/hooks/useCreateTeam";
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
    <View style={styles.buttonContainer}>
      <Text>Team Name</Text>
      <TextInput
        value={teamName}
        onChangeText={setTeamName}
        placeholder="Enter a name for your team"
        style={styles.input}
      />
      <View style={styles.buttonRow}>
        <View style={{ width: "50%", marginRight: 10 }}>
          <Button variant="primary" onPress={handleCancel}>
            Cancel
          </Button>
        </View>
        <Button variant="primary" onPress={handleCreateTeam}>
          Create Team
        </Button>
      </View>

   
      <Text style={{ marginTop: 20 }}>Created Teams: {teamCreated.join(", ")}</Text>  

      <Text style={{ marginTop: 20 }}>Teams List</Text>
      {isFetchingTeams ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
          ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>No Teams Found</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    padding: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "50%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default CreateTeam;
