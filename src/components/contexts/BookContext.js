import { createContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

export const BookContext = createContext(null);

const BookContextProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        id: uuidv4(),
        author: "",
        title: "",
        pages: "",
        read: false,
    });
    // isLoading ? (this will be important so that components will have there own loading handler and I can just pass this into them)
    // And I can also pass setIsLoading to be handled the same way, if user modifies a book for example just set loading to true and itll rerender
    // Not allowing user to edit anything (disable stuff, low opacity) (or just put overlays on stuff)

    let value = {
        books,
        setBooks,
        newBook,
        setNewBook,
    };

    return (
        <BookContext.Provider value={value}>{children}</BookContext.Provider>
    );
};

export default BookContextProvider;
