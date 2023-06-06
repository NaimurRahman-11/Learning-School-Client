import { signInWithPopup, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCreatingUser, setIsCreatingUser] = useState(false); // new state variable



    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, loggedUser => {

            if (!isCreatingUser) {
                setUser(loggedUser);
            }
            else {
                setUser(null)

            }
            setLoading(false);
        })

        return () => {
            unsubscribe();

        }
    }, [isCreatingUser, user])


    const createUser = (email, password) => {
        setLoading(true);
        setIsCreatingUser(true);

        return createUserWithEmailAndPassword(auth, email, password);

    }



    const signIn = (email, password) => {
        console.log("sign in executed")
        setLoading(true);
        setIsCreatingUser(false);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = (googleProvider) => {
        console.log("sign in executed")
        setLoading(true);
        setIsCreatingUser(false);
        return signInWithPopup(auth, googleProvider)

    }

    const logOut = () => {
        setLoading(true);
        setIsCreatingUser(false);
        return signOut(auth);
    }


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;