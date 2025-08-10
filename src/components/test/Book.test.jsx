/** biome-ignore-all lint/a11y/noStaticElementInteractions: <Drag and drop capabilities> */
export default function Book({ book, onDragStart, highlight }) {
    return (
        <div
            className={`tier-item ${highlight === "before" ? "hover-before" : ""} ${highlight === "after" ? "hover-after" : ""}`}
            title={book.title}
            draggable
            onDragStart={onDragStart}
        >
            <img src={book.img} alt={book.title} />
        </div>
    );
}