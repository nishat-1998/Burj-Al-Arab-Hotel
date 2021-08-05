import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    const [loggedInUser,setLoggedInUser]= useContext(UserContext);
const history= useHistory();
const location =useLocation();
const { from } = location.state || { from: { pathname: "/" } };

    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
    const handleSignIn=() =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName,email} = result.user;
    const signedInUser={name:displayName,email}
    setLoggedInUser(signedInUser);
    storeAuthToken();
    
    // ...
   
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode,errorMessage,email,credential)

    // ...
  });


    }

    const storeAuthToken =()=>{
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        sessionStorage.setItem('token',idToken);
        history.replace(from);
        // ...
      }).catch(function(error) {
        // Handle error
      });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;