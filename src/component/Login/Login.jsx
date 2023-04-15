import React, { useState } from 'react';
import app from '../../firebase/firebase.init';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";


const Login = () => {
    const [user, setUser] = useState(null); // Initialize user to null

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const githubProvider = new GithubAuthProvider();




    const handleGoogleSignIn = () => {
       signInWithPopup(auth, googleProvider)
       .then(result => {
          const loggedInUser = result.user; // Get user info from result object
          console.log(loggedInUser);
          setUser(loggedInUser); // Set user info to user state variable
       })
       .catch(error => {
            console.log(error);
       })
    }



    const handelSingOut = () => {
        signOut(auth)
        .then(result => {
            console.log(result)
            setUser(null)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
           {/* user ? logout : sing in */}

            { user ?
                <button onClick={handelSingOut}>Sing Out</button> :
                <>
                    <button onClick={handleGoogleSignIn}>Google Login</button>
                    <button>Github Login</button>
                </>
            }

            { user && <div> {/* Render user information only if user is not null */}
                <h2>User: {user.displayName}</h2> {/* Display user's display name */}
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;
