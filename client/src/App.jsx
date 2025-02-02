import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { Container } from "react-bootstrap";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Container>
  );
}

export default App;
