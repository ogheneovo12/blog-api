import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import AppLayout from "./components/layouts/AppLayout";
import NotFound from "./pages/NotFound";
import ReadPost from "./pages/Posts/ReadPost";
import MyPosts from "./pages/Posts/MyPosts";
import EditPost from "./pages/Posts/EditPost";
import CreatePost from "./pages/Posts/CreatePost";
import ProtectedPage from "./components/ProtectedPage";
import ReadMyPost from "./pages/Posts/ReadMyPost";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog-posts/:id" element={<ReadPost />} />
        <Route element={<ProtectedPage />}>
          <Route path="/my-posts" element={<MyPosts />} />
           <Route path="/my-posts/view/:id" element={<ReadMyPost />} />
          <Route path="/my-posts/create" element={<CreatePost />} />
          <Route path="/my-posts/edit/:id" element={<EditPost />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
