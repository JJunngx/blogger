import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Root from "./layout/Root";
import { SearchKeyWordProvider } from "./context/SearchKeyword";
import PostUser from "./pages/PostUser";
import EditPost from "./pages/EditPost";

const Login = lazy(() => import("./auth/Login"));
const Signup = lazy(() => import("./auth/Signup"));
const Home = lazy(() => import("./pages/Home"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const Questions = lazy(() => import("./pages/Questions"));
const DetailPost = lazy(() => import("./pages/DetailPost"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "createPost", element: <CreatePost /> },
        { path: "question", element: <Questions /> },
        { path: "detailPost/:id", element: <DetailPost /> },
        { path: "postUser", element: <PostUser /> },
        { path: "getEditPost/:id", element: <EditPost /> },
      ],
    },
  ]);
  return (
    <HelmetProvider>
      <SearchKeyWordProvider>
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </SearchKeyWordProvider>
    </HelmetProvider>
  );
}

export default App;
