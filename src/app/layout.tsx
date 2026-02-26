import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "INDRA NET – Sovereign Defense Digital Twin System | Government of India",
  description: "INDRA NET — India's Sovereign Defense Communication & Digital Twin Platform. Built for National Security, Powered by Indian Engineering.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#0B0F08',
          minHeight: '100vh',
          backgroundImage:
            'linear-gradient(rgba(107,140,66,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(107,140,66,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          margin: 0,
          padding: 0,
          fontFamily: "'Rajdhani', 'Montserrat', sans-serif",
        }}
      >
        <Sidebar />
        <main
          style={{
            marginLeft: '260px',
            minHeight: '100vh',
            overflowY: 'auto',
            color: '#EDE8D0',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
