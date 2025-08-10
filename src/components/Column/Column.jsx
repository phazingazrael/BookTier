import Book from '../Book/Book';
import './Column.css'


function Column({ column, books }) {
    return (
        <div className="tier-container">
            <div className={`tier-${column.title.toLowerCase()}`}>
                <div className="row-container">
                    <div className="tier-header">
                        <div>
                            <h3>{column.title}</h3>
                        </div>
                    </div>
                    <div className="tier-list-wrapper">
                        <div className="tier-list">
                            {books.map((book) => (
                                <Book key={book.id} book={book} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="tier-divider" />
            </div>
        </div>
    );
}

export default Column;