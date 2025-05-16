// pages/_app.js
import "../styles/globals.css";
import { useRouter } from "next/router";
import DashboardSidebar from "../components/DashboardSidebar";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboardLayout =
    router.pathname.startsWith("/dashboard") ||
    router.pathname.startsWith("/features") ||
    router.pathname === "/pricing";

  return (
    <>
      {/* Show public NavBar on non-dashboard routes */}
      {!isDashboardLayout && <NavBar />}

      {/* Always render sidebar on dashboard, features, and pricing */}
      {isDashboardLayout && <DashboardSidebar />}

      {/* Main content shifts right when sidebar is present */}
      <div
        className={`transition-all duration-300 ${
          isDashboardLayout ? "ml-16 md:ml-64" : ""
        }`}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
