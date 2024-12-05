import { CommentSection } from "@/components/engagement/comment/CommentSection";
import { SidebarProvider } from "@/components/ui/sidebarContent";
import { ReactNode } from "react";

interface ConetnetLayoutProps {
  children: ReactNode; // Type for children prop
}

const ContentLayout: React.FC<ConetnetLayoutProps> = ({ children }) => {
  return <>
  <SidebarProvider>
        <div className="h-full flex">

          {children}
        </div>
      </SidebarProvider>
  </>;
};

export default ContentLayout;
