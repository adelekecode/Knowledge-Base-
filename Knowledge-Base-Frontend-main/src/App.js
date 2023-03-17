import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./App.css";
import {
  Article,
  Category,
  Dashboard,
  Home,
  Login,
  NotFound,
  AdminProfile,
  StaffProfile,
  Setting,
  Staff,
  ViewMore,
} from "./pages";
import { Suspense } from "react";
import { DashboardLayout, Layout } from "./components";
import LazyLoader from "./components/LazyLoader";
import { notifyError, ToastContainer } from "./components/ToastAlert";
import ProtectRoutes from "./components/ProtectRoutes";
import LoadingState from "./components/LoadingState";
import { AppContext } from "./contexts/AppProvider";
import AdminRoutes from "./components/AdminRoutes";
import axios from "./api/axios";

function App() {
  const {
    userID,
    userRole,
    userName,
    userEmail,
    userAccessToken,
    userRefreshToken,
    createAxiosInstance,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const accessToken = localStorage.getItem("accessToken");
      await axios
        .post("/auth/token/verify", { token: accessToken })
        // .then((response) => console.log("res: /> ", response))
        .catch(async (error) => {
          if (error.response?.status === 401) {
            notifyError("You are not authenticated");
            return navigate("/login");
          }
        });
    })();

    if (
      userID &&
      userAccessToken &&
      userRefreshToken &&
      userRole &&
      userName &&
      userEmail
    ) {
      const data = {
        name: userName,
        email: userEmail,
        role: userRole,
        time_of_visit: new Date().toLocaleString(),
      };
      createAxiosInstance()
        .post("/admin/total/visits", data)
        .then((response) => {
          console.log(">>> ", response.data.response);
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.status === 401) {
            navigate("/login");
            throw new Error("You are not authorized");
          }
        });
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <LoadingState>
        <Routes>
          <Route
            path="/"
            index
            element={
              <Suspense fallback={<LazyLoader />}>
                <ProtectRoutes>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectRoutes>
              </Suspense>
            }
          />
          <Route
            path="/view/:cardID/:cardSlug"
            index
            element={
              <Suspense fallback={<LazyLoader />}>
                <ProtectRoutes>
                  <Layout>
                    <ViewMore />
                  </Layout>
                </ProtectRoutes>
              </Suspense>
            }
          />
          <Route
            path="/staff/profile"
            index
            element={
              <Suspense fallback={<LazyLoader />}>
                <ProtectRoutes>
                  <Layout>
                    <StaffProfile />
                  </Layout>
                </ProtectRoutes>
              </Suspense>
            }
          />
          <Route
            element={
              <Suspense fallback={<LazyLoader />}>
                <ProtectRoutes>
                  <AdminRoutes>
                    <DashboardLayout />
                  </AdminRoutes>
                </ProtectRoutes>
              </Suspense>
            }
          >
            <Route
              index
              path="/dashboard"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/article"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Article />
                </Suspense>
              }
            />
            <Route
              path="/category"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Category />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <AdminProfile />
                </Suspense>
              }
            />
            <Route
              path="/staff"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Staff />
                </Suspense>
              }
            />
            <Route
              path="/setting"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Setting />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={<LazyLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LazyLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </LoadingState>
    </div>
  );
}

export default App;
