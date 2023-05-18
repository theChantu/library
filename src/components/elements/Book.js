import { ReactComponent as TrashSvg } from "../../img/trash.svg";
import { ReactComponent as EditSvg } from "../../img/edit.svg";
import { ReactComponent as AuthorSvg } from "../../img/author.svg";
import { ReactComponent as TitleSvg } from "../../img/title.svg";
import { ReactComponent as PagesSvg } from "../../img/pages.svg";

const Book = ({
    id,
    author,
    title,
    pages,
    setEditBookClicked,
    setBookToEdit,
    setBookToDelete,
    setBooks,
    books,
    setShouldPost,
    setIsLoading,
    setCreateBookClicked,
}) => {
    const handleEditClick = () => {
        setCreateBookClicked(false);
        setBookToEdit(id);
        setEditBookClicked(true);
    };

    const handleDeleteClick = (e) => {
        setCreateBookClicked(false);
        setEditBookClicked(false);
        const index = books.findIndex((book) => book.id === id);
        const copyBooks = [...books];
        copyBooks.splice(index, 1);
        setBooks(copyBooks);
        setIsLoading(true);
        setShouldPost(true);
    };

    return (
        <div data-id={id} className="book">
            <div className="book-info">
                <div className="book-info-div">
                    <AuthorSvg />
                    <p className="book-author-p underline">{author}</p>
                </div>
                <div className="book-info-div">
                    <TitleSvg />
                    <p className="book-title-p">{title}</p>
                </div>
                <div className="book-info-div">
                    <PagesSvg />
                    <p className="book-pages-p">{pages}</p>
                </div>
            </div>
            <div className="book-buttons">
                <EditSvg onClick={handleEditClick} />
                <TrashSvg onClick={handleDeleteClick} />
            </div>
        </div>
    );
};

export default Book;
