
function Book({ book }) {
    return (
        <div className="tier-item">a
            <img src={book.img} alt={book.title} />
        </div>
    );
}

export default Book;