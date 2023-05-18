import { useState, useEffect } from "react";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import book from "../classes/book";
import Nav from "./Nav";
import Main from "./Main";
import Navbar from "./Nav/Navbar";
import Library from "./Main/Library";
import Signup from "./Main/Signup";
import AddBook from "./Main/AddBook";
import EditBook from "./Main/EditBook";

function App() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState(new book());
    const [bookToEdit, setBookToEdit] = useState(null);
    const [shouldPost, setShouldPost] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateBookClicked, setCreateBookClicked] = useState(false);
    const [isEditBookClicked, setEditBookClicked] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) {
            navigate("/");
            (async () => {
                setIsLoading(true);

                try {
                    const userDocRef = doc(db, "users", authUser.uid);
                    const userDocSnapshot = await getDoc(userDocRef);

                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        const booksArray = userData.books;
                        setBooks(booksArray);
                    }
                } catch (error) {
                    console.log(error);
                }

                setIsLoading(false);
            })();
        } else {
            setCreateBookClicked(false);
            setEditBookClicked(false);
            setBooks([]);
        }
    }, [authUser]);

    useEffect(() => {
        if (shouldPost) {
            (async () => {
                try {
                    const userRef = doc(db, "users", authUser.uid);
                    const userSnapshot = await getDoc(userRef);

                    if (userSnapshot.exists()) {
                        await updateDoc(userRef, { books });
                    } else {
                        await setDoc(userRef, { books });
                    }
                } catch (error) {
                    console.log(error);
                }

                setNewBook(new book());

                setIsLoading(false);
                setShouldPost(false);
            })();
        }
    }, [books]);

    const handleChangeTextInput = (e) => {
        const { name, value } = e.target;
        setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleChangeCheckedInput = (e) => {
        const { name, checked } = e.target;
        setNewBook((prevBook) => ({ ...prevBook, [name]: checked }));
    };

    const handlePostNewBook = async (e) => {
        e.preventDefault();
        setCreateBookClicked(false);
        setIsLoading(true);
        setBooks((prevBooks) => [...prevBooks, newBook]);
        setShouldPost(true);
    };

    return (
        <>
            <Nav>
                <Navbar authUser={authUser} setAuthUser={setAuthUser} />
            </Nav>
            {isCreateBookClicked ? (
                <AddBook
                    handlePostNewBook={handlePostNewBook}
                    handleChangeTextInput={handleChangeTextInput}
                    handleChangeCheckedInput={handleChangeCheckedInput}
                    setCreateBookClicked={setCreateBookClicked}
                    isLoading={isLoading}
                />
            ) : isEditBookClicked ? (
                <EditBook
                    books={books}
                    setBooks={setBooks}
                    setEditBookClicked={setEditBookClicked}
                    bookToEdit={bookToEdit}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setShouldPost={setShouldPost}
                />
            ) : null}
            <Main>
                <Routes>
                    {authUser ? (
                        <Route
                            path="/"
                            element={
                                <Library
                                    books={books}
                                    setBooks={setBooks}
                                    setEditBookClicked={setEditBookClicked}
                                    setCreateBookClicked={setCreateBookClicked}
                                    setBookToEdit={setBookToEdit}
                                    isLoading={isLoading}
                                    setShouldPost={setShouldPost}
                                    setIsLoading={setIsLoading}
                                />
                            }
                        />
                    ) : (
                        <>
                            <Route
                                path="/"
                                element={<Navigate to="/signup" />}
                            />
                        </>
                    )}
                    <Route
                        path="/signup"
                        element={
                            <Signup
                                authUser={authUser}
                                setAuthUser={setAuthUser}
                            />
                        }
                    />
                </Routes>
            </Main>
        </>
    );
}

export default App;
