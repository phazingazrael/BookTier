import { AppBar, Container, Toolbar, Typography } from "@mui/material";

import Column from "./components/Column/Column";
// import TierPage from "./components/TierPage/TierPage";
import './App.css';

import InitialData from "./data/initialList.json";

function App() {

    return (
        <div className="App">
            <AppBar position="sticky" className="header">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h5"
                            className="header-title"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 900,
                                letterSpacing: '.3rem',
                            }}
                        >
                            BookTier
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <div className="main">
                <div className="sidebar">
                    Side Bar
                </div>
                <div className="content">
                    <Container className="body">
                        {InitialData.order.map(tierid => (
                            <Column key={InitialData.tiers[tierid].id} column={InitialData.tiers[tierid]} books={InitialData.tiers[tierid].books} />
                        ))}
                        {/* <TierPage /> */}
                    </Container>
                </div>
            </div>

        </div >
    );
}

export default App;
