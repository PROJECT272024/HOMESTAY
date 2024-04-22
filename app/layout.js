import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Providers";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HomeStay Survey | DOT&CA",
  description: "Homestay present in Sikkim",
  keywords:"HomeStay in Sikkim, sikkim, sikkim tourism, sikkim"
};
//className={inter.className}
export default async function RootLayout({ children}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body >
        <AuthProvider session={session}>
          {children}
          <ToastContainer autoClose={2000}/>
        </AuthProvider>
      </body>
    </html>
  );
}
