import { lazy } from "react";

export const Layout = lazy(() => import("./Layout"));
export const Footer = lazy(() => import("./Footer"));
export const NavBar = lazy(() => import("./NavBar"));
export const DashboardLayout = lazy(() => import("./DashboardLayout"));
export const Sidebar = lazy(() => import("./SideBar"));
export const LabelContainer = lazy(() => import("./LabelContainer"));
export const ModalDisplayButton = lazy(() => import("./ModalDisplayButton"));
export const StaffTable = lazy(() => import("./Staff/StaffTable"));
export const CategoryTable = lazy(() => import("./Category/CategoryTable"));
export const ArticleTable = lazy(() => import("./Article/ArticleTable"));
export const ColorPickerPalette = lazy(() => import("./ColorPickerPalette"));
