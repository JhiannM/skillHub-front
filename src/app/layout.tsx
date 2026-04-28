import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { UserProvider } from "../contexts/UserContext";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SkillHub - Conectando Talento Local",
    description:
        "La plataforma colombiana que une profesionales independientes con clientes.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="es"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-screen flex flex-col bg-background text-foreground">
                <UserProvider>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </UserProvider>
            </body>
        </html>
    );
}
