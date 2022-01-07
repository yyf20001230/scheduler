import { initializeApp } from 'firebase/app';
import { set, getDatabase, onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';


const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        onIdTokenChanged(getAuth(firebase), setUser);
    }, []);

    return [user];
};

const firebaseConfig = {
    apiKey: "AIzaSyBLjoRI5wwgwalznDb82fIzHYWVHpMElBE",
    authDomain: "scheduler-d3ac7.firebaseapp.com",
    projectId: "scheduler-d3ac7",
    storageBucket: "scheduler-d3ac7.appspot.com",
    messagingSenderId: "623904953442",
    appId: "1:623904953442:web:f068a5a953815994bf6d3b",
    measurementId: "G-D8TYWPVLW9"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

ref(database)
ref(database, '/')
ref(database, '/courses')

export const setData = (path, value) => (
    set(ref(database, path), value)
);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};