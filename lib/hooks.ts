import { auth, db } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// export function useUserData() {
//   const [user] = useAuthState(auth);
//   const [type, setType] = useState<string | null>(null);
//   const [name, setName] = useState<string | null>(null);

//   useEffect(() => {
//     let unsubscribe;

//     if (user) {
//       const ref = db.collection("users").doc(user.uid);
//       unsubscribe = ref.onSnapshot((doc) => {
//         setType(doc.data()?.type);
//         setName(doc.data()?.name);
//       });
//     } else {
//       setType(null);
//       setName(null);
//     }

//     return unsubscribe;
//   }, [user]);

//   return { user, type, name };
// }
