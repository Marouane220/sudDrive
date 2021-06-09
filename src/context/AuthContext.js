import React, { useContext, useEffect, useState } from 'react';
import {auth, providerGoogle, providerFacebook} from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password, name) {
        return auth.createUserWithEmailAndPassword(email, password).then((user) => {
            const displayName = name
            return auth.currentUser.updateProfile({ displayName,
                                                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/devoir1-1af3d.appspot.com/o/1200px-Crystal_Clear_app_Login_Manager.svg.png?alt=media&token=1e8ad994-a84a-47c4-b49a-12879426b1ff' })
        });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    function updateName(name){
        const displayName = name
        return auth.currentUser.updateProfile({ displayName })
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    function signupGoogle(){
        return auth.signInWithPopup(providerGoogle);
    }


    function signupFacebook(){
        return auth.signInWithPopup(providerFacebook);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updateName,
        updatePassword,
        signupGoogle,
        signupFacebook
    }
    
    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}