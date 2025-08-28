import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SupportChat } from "@/components/support/support-chat";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="pt-18 min-h-[50vh]">
        {children}
      </div>
      <Footer />
      <SupportChat />
    </div>
  );
};

export default layout;
