import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Container>
  );
}

export default App;
