import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { Container } from "react-bootstrap";
import LoginPage from "./pages/Login/LoginPage";
import RequestsPage from "./pages/RequestsPage/RequestsPage";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/requests" element={<RequestsPage />} />
      </Routes>
    </Container>
  );
}

export default App;
