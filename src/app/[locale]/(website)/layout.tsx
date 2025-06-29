import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserProvider } from "@/context/userContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <Header />
      <div className='pt-18 min-h-[50vh]'>
        {children}
      </div>
      <Footer />
    </UserProvider>
  );
};

export default layout;
