import { lazy } from "react";

// export { default as Layout } from "./Layout";
export const Home = lazy(() => import("./Home"));
export const Dashboard = lazy(() => import("./Dashboard"));
export const Login = lazy(() => import("./Login"));
export const NotFound = lazy(() => import("./NotFound"));
export const Article = lazy(() => import("./Article"));
export const Category = lazy(() => import("./Category"));
export const AdminProfile = lazy(() => import("./Profile/AdminProfile"));
export const StaffProfile = lazy(() => import("./Profile/StaffProfile"));
export const Staff = lazy(() => import("./Staff"));
export const ViewMore = lazy(() => import("./ViewMore"));
export const Setting = lazy(() => import("./Setting"));
