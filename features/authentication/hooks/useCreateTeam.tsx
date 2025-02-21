import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/Auth/useAuth";
import { createTeam } from "../../../services/authentication/userAuth";


export function useCreateTeam() {
  const { getUserID } = useAuth();
  return useMutation({
    mutationFn: ({ teamName, adminId }: { teamName: string; adminId: string }) =>
      createTeam(teamName, adminId),
    onSuccess: (data: { user: { id: string } }) => {
      if (!data || !data.user) {
        return { user: { id: "" } };
      }
      getUserID(data.user.id);
      console.log("Team created successfully", data.user.id);
    },
    onError: (error: any) => {
      throw new Error(error.message);
    },

  });

}

