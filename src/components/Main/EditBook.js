import { useEffect, useState } from "react";

const EditBook = ({
    books,
    setBooks,
    setEditBookClicked,
    bookToEdit,
    isLoading,
    setIsLoading,
    setShouldPost,
}) => {
    const [copyOfBookToEdit, setCopyOfBookToEdit] = useState(null);
    const [bookToEditIndex, setBookToEditIndex] = useState(null);
    const [author, setAuthor] = useState(null);
    const [title, setTitle] = useState(null);
    const [pages, setPages] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const index = books.findIndex((book) => book.id === bookToEdit);
        const copyBook = { ...books[index] };
        setCopyOfBookToEdit(copyBook);
        setBookToEditIndex(index);
    }, []);

    useEffect(() => {
        if (copyOfBookToEdit) {
            setAuthor(copyOfBookToEdit.author);
            setTitle(copyOfBookToEdit.title);
            setPages(copyOfBookToEdit.pages);
            setIsLoading(false);
        }
    }, [copyOfBookToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditBookClicked(false);
        setIsLoading(true);
        const copyBooks = [...books];
        copyBooks.splice(bookToEditIndex, 1);
        setBooks([...copyBooks, copyOfBookToEdit]);
        setShouldPost(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCopyOfBookToEdit((prevBook) => ({ ...prevBook, [name]: value }));
    };

    return (
        <div id="book-creator">
            <form onSubmit={handleSubmit} id="book-form">
                <svg
                    onClick={() => setEditBookClicked(false)}
                    id="x-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="26"
                    viewBox="0 96 960 960"
                    width="26"
                >
                    <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                </svg>
                <div id="book-form-inputs">
                    <div>
                        <label htmlFor="author">Author</label>
                        <input
                            onChange={handleChange}
                            className="input-text-focus"
                            required
                            id="author"
                            type="text"
                            name="author"
                            maxLength={20}
                            value={author || ""}
                        />
                    </div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            onChange={handleChange}
                            className="input-text-focus"
                            required
                            id="title"
                            type="text"
                            name="title"
                            maxLength={20}
                            value={title || ""}
                        />
                    </div>
                    <div>
                        <label htmlFor="pages">Pages</label>
                        <input
                            onChange={handleChange}
                            className="input-text-focus"
                            required
                            id="pages"
                            type="number"
                            name="pages"
                            max={999999}
                            value={pages || ""}
                        />
                    </div>
                </div>
                <input id="createbtn" type="submit" value="Edit Book" />
            </form>
        </div>
    );
};

export default EditBook;
