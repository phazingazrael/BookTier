/** biome-ignore-all lint/a11y/noStaticElementInteractions: <Drag and drop capabilities> */
import Book from "../Book/Book";
import "./Column.css";

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
                        <div className="tier-list" onDragOver={onDragOverBox} onDrop={(e) => onDropInBox(e, tierId)}>
                            {books.map((book, i) => {
                                const isHover = hoverIndex && hoverIndex.tier === tierId && hoverIndex.index === i;
                                const highlight = isHover ? (hoverIndex.before ? "before" : "after") : null;
                                return (
                                    <div
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
        </div>
    );
}