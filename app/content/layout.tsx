import { ReactNode } from "react";

interface ConetnetLayoutProps {
  children: ReactNode; // Type for children prop
}

const ContentLayout: React.FC<ConetnetLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default ContentLayout;
