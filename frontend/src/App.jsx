import Container from '@mui/material/Container';
import Search from './pages/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TimeTable from "./pages/TimeTable.jsx";
import Navbar from "./pages/Navbar.jsx";

function App() {
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Routes>
                    <Route path={"/"} element={<Navbar />}>
                        <Route path="/" element={<Search />} />
                        <Route path="/time-table" element={<TimeTable />} />
                    </Route>
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;