import Loading from "../elements/Loading";
import Book from "../elements/Book";

const Library = ({
    books,
    setBooks,
    setEditBookClicked,
    setCreateBookClicked,
    setBookToEdit,
    isLoading,
    setShouldPost,
    setIsLoading,
}) => {
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <button
                        onClick={() => {
                            setEditBookClicked(false);
                            setCreateBookClicked(true);
                        }}
                        type="button"
                        id="bookbtn"
                    >
                        + Add Book
                    </button>
                    <div id="books">
                        {books.map((book) => {
                            return (
                                <Book
                                    key={book.id}
                                    id={book.id}
                                    author={book.author}
                                    title={book.title}
                                    pages={book.pages}
                                    setEditBookClicked={setEditBookClicked}
                                    setBookToEdit={setBookToEdit}
                                    setBooks={setBooks}
                                    books={books}
                                    setShouldPost={setShouldPost}
                                    setIsLoading={setIsLoading}
                                    setCreateBookClicked={setCreateBookClicked}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default Library;
