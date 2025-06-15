import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import AppLayout from "./components/layouts/AppLayout";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
