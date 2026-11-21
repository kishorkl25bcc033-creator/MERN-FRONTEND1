import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Toast from "./Toast.jsx";

export default function SiteLayout() {
  return <><Navbar /><main><Outlet /></main><Footer /><Toast /></>;
}
