import { auth, provider } from "../../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

import googleLogo from "../../img/google-g-logo.png";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Signup = ({ authUser, setAuthUser }) => {
    useEffect(() => {
        if (authUser) <Navigate to="/" />;

        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);

    const handleClick = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div onClick={handleClick} id="sign-in-container">
            <img id="google-logo" src={googleLogo} alt="Google logo" />
            <div>Login with Google</div>
        </div>
    );
};

export default Signup;
