import HomeLayout from "@/components/layout/HomeLayout";
import Home from "../components/pages/HomePages";

export default function page() {
    return( 
      <HomeLayout showTrending={false}>
        <Home />
      </HomeLayout>
    );
}
