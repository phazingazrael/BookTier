import { useState } from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import Column from "./components/Column/Column.test.jsx";
import Sidebar from "./components/Sidebar/Sidebar.test.jsx";
import InitialDataJson from "./data/initialList.json";
import "./App.css";

export default function App() {
    const [data, setData] = useState(InitialDataJson);
    const [dragging, setDragging] = useState(null); // { fromTier, index }
    const [hoverIndex, setHoverIndex] = useState(null); // { tier, index, before }

    function onDragStart(e, fromTier, index) {
        setDragging({ fromTier, index });
        e.dataTransfer.setData("text/plain", `${fromTier}:${index}`);
        e.dataTransfer.effectAllowed = "move";
    }

    function onDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }

    function parsePayload(e) {
        let payload = dragging;
        const fallback = e.dataTransfer.getData("text/plain");
        if (!payload?.fromTier && fallback) {
            const [fromTier, idx] = fallback.split(":");
            payload = { fromTier, index: Number(idx) };
        }
        return payload;
    }

    function moveItem(fromTier, fromIndex, toTier, toIndex) {
        if (fromTier == null || fromIndex == null || toTier == null || toIndex == null) return;

        const next = structuredClone(data);
        const item = next.tiers[fromTier].books[fromIndex];
        if (!item) return;

        // remove from source
        next.tiers[fromTier].books.splice(fromIndex, 1);

        // adjust index if moving forward within same array
        let insertIndex = toIndex;
        if (fromTier === toTier && fromIndex < toIndex) insertIndex = toIndex - 1;

        // insert into target
        next.tiers[toTier].books.splice(insertIndex, 0, item);

        setData(next);
        console.log(next);
        console.log(data);
    }

    function onDropInBox(e, toTier) {
        e.preventDefault();
        const payload = parsePayload(e);
        if (!payload) return;
        const toIndex = data.tiers[toTier].books.length;
        moveItem(payload.fromTier, payload.index, toTier, toIndex);
        setDragging(null);
        setHoverIndex(null);
    }

    function onItemDragOver(e, tier, index) {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const midpoint = rect.left + rect.width / 2;
        const before = e.clientX < midpoint;
        setHoverIndex({ tier, index, before });
    }

    function onDropOnItem(e, toTier, index) {
        e.preventDefault();
        e.stopPropagation(); // prevent bubbling to the tier container (which appends)
        const payload = parsePayload(e);
        if (!payload) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const midpoint = rect.left + rect.width / 2;
        const before = e.clientX < midpoint;
        const insertAt = before ? index : index + 1;

        moveItem(payload.fromTier, payload.index, toTier, insertAt);
        setDragging(null);
        setHoverIndex(null);
    }

    function addBook(book) {
        // book contains ALL original OL fields (e.g., key, cover_i, author_name, etc.)
        // plus: book.id, book.img
        const exists = data.tiers.Unranked.books.some((b) => b.id === book.id);
        if (exists) return;
        const next = structuredClone(data);
        next.tiers.Unranked.books.push(book);
        setData(next);
    }

    return (
        <div className="App">
            <AppBar position="sticky" className="header">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h5"
                            className="header-title"
                            sx={{ fontFamily: "monospace", fontWeight: 900, letterSpacing: ".3rem" }}
                        >
                            BookTier
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

            <div className="main">
                <div className="sidebar">
                    <Sidebar onAdd={addBook} />
                </div>
                <div className="content">
                    <Container className="body">
                        {data.order.map((tierId) => (
                            <Column
                                key={data.tiers[tierId].id}
                                column={data.tiers[tierId]}
                                books={data.tiers[tierId].books}
                                tierId={tierId}
                                onDragStart={onDragStart}
                                onItemDragOver={onItemDragOver}
                                onDropOnItem={onDropOnItem}
                                onDropInBox={onDropInBox}
                                onDragOverBox={onDragOver}
                                hoverIndex={hoverIndex}
                            />
                        ))}
                    </Container>
                </div>
            </div>
        </div>
    );
}