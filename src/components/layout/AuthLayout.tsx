import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function AuthLayout() {
  return (
    <div className="bg-background relative min-h-screen">
      <main className="mx-auto">
        <Outlet />
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
