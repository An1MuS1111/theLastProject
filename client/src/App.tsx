import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import Profile from "./pages/Profile";
import PageTitle from "./components/PageTitle";
import Users from "./pages/Users/index";
import SignUp from "./pages/Authentication/SignUp";
import SignIn from "./pages/Authentication/SignIn";
import Products from "./pages/Products";

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
    // <AdminLayout>
    //   <Routes>
    //     <Route
    //       path="/profile"
    //       element={
    //         <>
    //           <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <Profile />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/users"
    //       element={
    //         <>
    //           <PageTitle title="Users" />
    //           <Users />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/signup"
    //       element={
    //         <>
    //           <PageTitle title="Sign Up" />
    //           <SignUp />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/signin"
    //       element={
    //         <>
    //           <PageTitle title="Sign In" />
    //           <SignIn />
    //         </>
    //       }
    //     />

    //     <Route
    //       path="/products"
    //       element={
    //         <>
    //           <PageTitle title="Products | Landing" />
    //           <Products />
    //         </>
    //       }
    //     />
    //   </Routes>
    // </AdminLayout>

    <UserLayout>
      <Routes>
        <Route
          path="/products"
          element={
            <>
              <PageTitle title="Products | Landing" />
              <Products />
            </>
          }
        />
      </Routes>
    </UserLayout>
  );
}

export default App;
