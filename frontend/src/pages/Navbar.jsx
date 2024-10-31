import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: '#333', marginBottom: '1rem' }}>
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                            <DepartureBoardIcon sx={{ marginRight: '0.5rem' }} />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            MTA Bus App
                        </Typography>
                        <Button color="inherit" component={Link} to="/">
                            Search
                        </Button>
                        <Button color="inherit" component={Link} to="/time-table">
                            Time Table
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet />
        </>
    );
};

export default Navbar;
