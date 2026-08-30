import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ink text-paper font-body">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton variant="fab" message="Hi Door Hingers, I have a question." />
    </div>
  );
}
