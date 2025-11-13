import "./(Home)/home-layout.scss";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import { ReduxProvider } from "@/store/ReduxProvider";
import ClientProviderWrapper from "./clienwrapper";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Next.js + React Query + Redux example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ClientProviderWrapper>
            <div className="wrapper">
              <Header />
              {children}
            </div>
          </ClientProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
