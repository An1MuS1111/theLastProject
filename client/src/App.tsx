import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import DefaultLayout from "./layout/DefaultLayout";
import Profile from "./pages/Profile";
import PageTitle from "./components/PageTitle";
import Users from "./pages/Users/index";
import SignUp from "./pages/Authentication/SignUp";
import SignIn from "./pages/Authentication/SignIn";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users" />
              <Users />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="Sign Up" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="Sign In" />
              <SignIn />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
