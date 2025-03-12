import { useEffect, useState } from "react";
import  supabase  from "../../../services/supabaseClient";
import { User } from "@supabase/supabase-js";

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        setUser(data.user);
      } else {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return user;
};
