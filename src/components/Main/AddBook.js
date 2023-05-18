import Loading from "../elements/Loading";

const AddBook = ({
    handlePostNewBook,
    handleChangeTextInput,
    handleChangeCheckedInput,
    setCreateBookClicked,
    isLoading,
}) => {
    return isLoading ? (
        <Loading />
    ) : (
        <div id="book-creator">
            <form onSubmit={handlePostNewBook} id="book-form">
                <svg
                    onClick={() => setCreateBookClicked(false)}
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
                            onChange={handleChangeTextInput}
                            className="input-text-focus"
                            required
                            id="author"
                            type="text"
                            name="author"
                            maxLength={20}
                        />
                    </div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            onChange={handleChangeTextInput}
                            className="input-text-focus"
                            required
                            id="title"
                            type="text"
                            name="title"
                            maxLength={20}
                        />
                    </div>
                    <div>
                        <label htmlFor="pages">Pages</label>
                        <input
                            onChange={handleChangeTextInput}
                            className="input-text-focus"
                            required
                            id="pages"
                            type="number"
                            name="pages"
                            max={999999}
                        />
                    </div>
                </div>
                <input id="createbtn" type="submit" value="Create book" />
            </form>
        </div>
    );
};

export default AddBook;
