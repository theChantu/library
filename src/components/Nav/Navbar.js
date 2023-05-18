import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Navbar = ({ authUser, setAuthUser }) => {
    const [displayUserDropDown, setDisplayUserDropDown] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (authUser) {
            setUserName(authUser.displayName);
            setUserProfile(authUser.photoURL);
        }
    }, [authUser]);

    const handleClickOutside = () => {
        setDisplayUserDropDown(false);
    };

    const handleSignOut = () => {
        try {
            signOut(auth);
            setAuthUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Library</h1>
            {authUser && (
                <div id="user-profile">
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setDisplayUserDropDown((prevValue) => !prevValue);
                        }}
                    >
                        <img
                            src={userProfile}
                            id="user-profile-image"
                            alt={userName}
                        ></img>
                        <div id="user-profile-name">{userName}</div>
                    </div>

                    {displayUserDropDown && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            id="user-profile-dropdown-container"
                        >
                            <button onClick={handleSignOut} type="button">
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Navbar;
