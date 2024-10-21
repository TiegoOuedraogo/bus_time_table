import Container from '@mui/material/Container';
import Search from './pages/Search';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Container maxWidth="xl">
      <Search />
      <BrowserRouter>
        <Routes>
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
