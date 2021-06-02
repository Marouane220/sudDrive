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
                                                    photoURL: 'https://i.ibb.co/Jc2yCsc/0c3b3adb1a7530892e55ef36d3be6cb8.png' })
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