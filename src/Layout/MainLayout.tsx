import NavBar from "../components/NavBar";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
    return ( 
        <>
            <NavBar />
            {children}
        </>
     );
}
 
export default MainLayout;
