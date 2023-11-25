/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../../firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);
export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('current user', currentUser);
            setLoading(false)
        })

        return () => {
            return unSubscribe();
        }

    }, [])

    const userCreate = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = ( ) => {
        setLoading(true);
        return signOut(auth)
    }
    const userProfileUpdate = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const authInfo = {
        user,
        loading,
        userCreate,
        logIn,
        logOut,
        userProfileUpdate,
        logInWithGoogle,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;