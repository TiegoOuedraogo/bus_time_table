import Container from '@mui/material/Container';
import Search from './pages/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/" element={<Search />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;