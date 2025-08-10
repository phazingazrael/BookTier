import Book from "../Book/Book.test.jsx";
import "./Column.test.css";

export default function Column({
    column,
    books,
    tierId,
    onDragStart,
    onItemDragOver,
    onDropOnItem,
    onDropInBox,
    onDragOverBox,
    hoverIndex,
}) {
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
                        <div
                            role="option"
                            className={`tier-list ${books.length === 0 ? 'empty-list' : ''}`}
                            onDragOver={onDragOverBox}
                            onDrop={(e) => {
                                e.preventDefault();
                                // only append if the drop reached the container (i.e., not handled by an item)
                                onDropInBox(e, tierId);
                            }}
                            tabIndex={0}
                        >
                            {books.map((book, i) => {
                                const isHover = hoverIndex && hoverIndex.tier === tierId && hoverIndex.index === i;
                                const highlight = isHover ? (hoverIndex.before ? "before" : "after") : null;
                                return (
                                    <div
                                        role="option"
                                        tabIndex={0}
                                        key={book.id}
                                        onDragOver={(e) => onItemDragOver(e, tierId, i)}
                                        onDrop={(e) => onDropOnItem(e, tierId, i)}
                                    >
                                        <Book book={book} onDragStart={(e) => onDragStart(e, tierId, i)} highlight={highlight} />
                                    </div>
                                );
                            })}
                            {books.length === 0 && (
                                <span style={{ opacity: 0.6, fontSize: 12, marginLeft: 4 }}>Drop items here…</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="tier-divider" />
            </div>
        </div >
    );
}