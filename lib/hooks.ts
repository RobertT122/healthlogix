import { auth, db, getIsAdmin } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection } from "firebase/firestore";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(false);
    if (user) {
      const adminRef = collection(db, "admin");
      getIsAdmin(user.uid).then((result) => {
        setIsAdmin(result);
      });
    }
  }, [user]);

  return { user, isAdmin };
}

// export function useStateArray(init=[]) {
//   const [array, setArray] = useState(init);
//   function addToArray(value){
//     setArray(array.concat([value]));
//   }
//   function removeFromArray(index){

//   }
// }