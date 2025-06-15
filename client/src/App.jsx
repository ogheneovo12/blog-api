import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import AppLayout from "./components/layouts/AppLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
