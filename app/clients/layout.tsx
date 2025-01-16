import { ClerkProvider } from "@clerk/nextjs";
import "../global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
