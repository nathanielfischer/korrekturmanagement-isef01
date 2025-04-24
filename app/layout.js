import { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "IU Korrekturmanagement System",
  description: "Prototyp / inoffzielle Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      {/* <header className="flex justify-center mt-3 text-red-600">
        <p>Keine offizielle IU App!</p>
      </header> */}
      <body className="m-1 sm:m-5 lg:m-10 lg:mt-5">
        <main>{children}</main>
      </body>
    </html>
  );
}
