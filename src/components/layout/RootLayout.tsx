import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <div className="bg-background relative min-h-screen">
      <Navbar />
      <main className="mx-auto">
        <Outlet />
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
