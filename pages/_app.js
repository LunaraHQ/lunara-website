// pages/_app.js
import "../styles/globals.css";
import { useRouter } from "next/router";
import DashboardSidebar from "../components/DashboardSidebar";
import PublicNavBar from "../components/PublicNavBar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboardLayout =
    router.pathname.startsWith("/dashboard") ||
    router.pathname.startsWith("/features") ||
    router.pathname === "/pricing";

  return (
    <>
      {/* Show public navbar on non-dashboard routes */}
      {!isDashboardLayout && <PublicNavBar />}

      {/* Always render sidebar on dashboard, features, and pricing */}
      {isDashboardLayout && <DashboardSidebar />}

      {/* Push your page content right so it sits next to the sidebar */}
      <div
        className={`transition-all duration-300 ${
          isDashboardLayout
            ? // match your sidebar widths: 64px collapsed, 256px expanded
              "ml-16 md:ml-64"
            : ""
        }`}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
