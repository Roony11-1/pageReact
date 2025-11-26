import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Outlet } from "react-router-dom";

import '../../assets/css/Layout/layout.css';

export function Layout() 
{
  return(
    <>
      <Header />
      <main>
        <div className="outlet-container">
          <Outlet />
        </div>
      </main>
      <Footer />  
    </>
  )
}