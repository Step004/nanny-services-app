import { useState, useEffect } from "react";
import { app } from "../firebase/firebase.js";
import { getDatabase, ref, get } from "firebase/database";

export function useDatabase() {
  const [nannieArray, setNannieArray] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "/");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setNannieArray(Object.values(snapshot.val()));
      } else {
        console.error("Error: No data found");
      }
      setLoading(false); 
    };

    fetchData();
  }, []);

  return { nannieArray, loading };
}
