import { useQuery } from "@tanstack/react-query";
import  supabase  from "../../../services/supabaseClient";
type Team = {
  member_id:number;
  team_id:number;
  team_name:string;
  member_email:string;
  name:string;
  admin_id:number;
}

const fetchTeams = async (): Promise<Team[]> => {
  const { data, error } = await supabase.from("teammembersview").select("*");
  console.log(data,"data")

  if (error) throw new Error(error.message);
  return data || []; //If data is null, return an empty array.
};

export const useFetchTeams = () => {
  return useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });
};
