// Sidebar.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    TextField,
    Typography,
    IconButton,
    Paper,
    Stack,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Sidebar.test.css";

function coverUrlFromDoc(doc) {
    return doc?.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : `https://placehold.co/80x120.png?text=${encodeURIComponent(doc?.title || "No+Title")}`;
}

function toAppBookPreserveAll(doc) {
    const base = (doc.key || doc.edition_key?.[0] || doc.title || Math.random().toString(36))
        .toString()
        .replaceAll("/", "-");
    const id = `ol-${base}`;
    const img = doc.img || coverUrlFromDoc(doc);
    return { ...doc, id, img };
}

export default function Sidebar({ onAdd }) {
    // search input state
    const [q, setQ] = useState("");
    // asynchronous state tracking for search lifecycle
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // pagination control
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    // search results storage
    const [items, setItems] = useState([]);
    const [numFound, setNumFound] = useState(0);

    // state for showing and managing custom book creation
    const [showCustom, setShowCustom] = useState(false);
    const [cTitle, setCTitle] = useState("");
    const [cAuthors, setCAuthors] = useState("");
    const [cCover, setCCover] = useState("");

    // computed value indicating whether the current input is valid for searching
    const canSearch = useMemo(() => q.trim().length > 1, [q]);
    // refs for aborting in-flight API requests and debouncing
    const abortRef = useRef(null);
    const typingTimer = useRef(null);

    // when the search query changes, restart debounce timer and reset page to 1
    useEffect(() => {
        if (!canSearch) {
            setItems([]);
            setNumFound(0);
            setError("");
            setLoading(false);
            return;
        }
        clearTimeout(typingTimer.current);
        typingTimer.current = setTimeout(() => setPage(1), 300);
        return () => clearTimeout(typingTimer.current);
    }, [q, canSearch]);

    // perform the actual API request to Open Library when search parameters change
    useEffect(() => {
        if (!canSearch) return;
        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        (async () => {
            setLoading(true);
            setError("");
            try {
                const params = new URLSearchParams({
                    q: q.trim(),
                    fields: "key,title,cover_i,author_name,first_publish_year,edition_key,language",
                    page: String(page),
                    limit: String(limit),
                });
                const resp = await fetch(`https://openlibrary.org/search.json?${params.toString()}`, {
                    signal: controller.signal,
                });
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const data = await resp.json();
                const docs = Array.isArray(data.docs) ? data.docs : [];
                setItems(page === 1 ? docs : (prev) => [...prev, ...docs]);
                setNumFound(Number.isFinite(data.numFound) ? data.numFound : 0);
            } catch (e) {
                if (e.name !== "AbortError") {
                    setError("Search failed. Please try again.");
                    if (page === 1) {
                        setItems([]);
                        setNumFound(0);
                    }
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [page, canSearch, q, limit]);

    // takes an Open Library search result and converts it into the preserved object format for app storage
    function addOne(rawDoc) {
        if (!onAdd) return;
        onAdd(toAppBookPreserveAll(rawDoc));
    }

    // triggers the loading of the next page of search results
    async function loadMore() {
        if (!canSearch) return;
        setPage((p) => p + 1);
    }

    // builds and adds a custom book object with the same field structure as API results
    function addCustom() {
        if (!cTitle.trim()) return;
        const authorsArr = cAuthors.split(",").map((x) => x.trim()).filter(Boolean);
        const customKey = `/custom/${crypto.randomUUID ? crypto.randomUUID() : `c-${Date.now()}`}`;
        const rawDoc = {
            key: customKey,
            title: cTitle.trim(),
            author_name: authorsArr,
            cover_i: undefined,
            source: "custom",
            created_at: new Date().toISOString(),
            img: cCover.trim() || `https://placehold.co/80x120.png?text=${encodeURIComponent(cTitle.trim())}`,
        };
        addOne(rawDoc);
        setCTitle("");
        setCAuthors("");
        setCCover("");
        setShowCustom(false);
    }

    const totalPages = Math.max(1, Math.ceil(numFound / limit));
    const canPrev = page > 1;
    const canNext = page < totalPages;

    // main sidebar UI layout
    return (
        <Box className="sidebar-root" sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Add books (Open Library)
            </Typography>

            {/* search input */}
            <TextField
                size="small"
                fullWidth
                label="Search by title or author"
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />

            {/* custom book creation section, conditionally visible */}
            <Box sx={{ mt: 2 }}>
                {!showCustom ? (
                    <Button variant="outlined" fullWidth onClick={() => setShowCustom(true)}>
                        + Add Custom Book
                    </Button>
                ) : (
                    <Paper variant="outlined" sx={{ p: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                            Custom book
                        </Typography>
                        <Stack spacing={1}>
                            <TextField size="small" label="Title *" value={cTitle} onChange={(e) => setCTitle(e.target.value)} />
                            <TextField size="small" label="Authors (comma-separated)" value={cAuthors} onChange={(e) => setCAuthors(e.target.value)} />
                            <TextField size="small" label="Cover image URL (optional)" value={cCover} onChange={(e) => setCCover(e.target.value)} />
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" onClick={addCustom} disabled={!cTitle.trim()}>Add</Button>
                                <Button variant="text" onClick={() => setShowCustom(false)}>Cancel</Button>
                            </Stack>
                        </Stack>
                    </Paper>
                )}
            </Box>

            {/* loading indicator */}
            {loading && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={18} />
                    <Typography variant="body2">Loading…</Typography>
                </Box>
            )}
            {/* error display */}
            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}

            {/* search results grid */}
            <div className="sidebarResults">
                {items.map((doc) => {
                    const cover = doc.img || coverUrlFromDoc(doc);
                    const key = `${doc.key || doc.title}`;
                    const authors = Array.isArray(doc.author_name) && doc.author_name.length
                        ? doc.author_name.slice(0, 2).join(", ")
                        : "Unknown author";
                    return (
                        <Grid item xs={6} key={key}>
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    image={cover}
                                    alt={doc.title}
                                    sx={{ width: "100%", aspectRatio: "5/7", objectFit: "cover" }}
                                />
                                <CardContent sx={{ p: 1 }}>
                                    <Typography variant="body2" noWrap title={doc.title} sx={{ fontWeight: 600 }}>
                                        {doc.title || "Untitled"}
                                    </Typography>
                                    <Typography variant="caption" noWrap>{authors}</Typography>
                                </CardContent>
                                <CardActions sx={{ p: 1, pt: 0 }}>
                                    <Button size="small" onClick={() => addOne(doc)}>Add to Unranked</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </div>

            {/* no results message */}
            {!loading && items.length === 0 && q.trim().length > 1 && (
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    No results yet.
                </Typography>
            )}

            {/* pagination controls for navigating result pages */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" disabled={!canPrev} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    <ArrowBackIosNewIcon fontSize="inherit" />
                </IconButton>
                <Typography variant="caption" sx={{ minWidth: 120 }}>
                    Page {page} / {totalPages} · {numFound.toLocaleString()} results
                </Typography>
                <IconButton size="small" disabled={!canNext} onClick={() => setPage((p) => p + 1)}>
                    <ArrowForwardIosIcon fontSize="inherit" />
                </IconButton>
                <Box sx={{ flex: 1 }} />
                <Button size="small" variant="outlined" onClick={loadMore} disabled={!canNext || loading}>
                    Load more
                </Button>
            </Box>
        </Box>
    );
}
