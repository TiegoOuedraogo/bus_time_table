import Container from '@mui/material/Container';
import Search from './pages/Search';
import Between from './pages/Between';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="between" element={<Between />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;