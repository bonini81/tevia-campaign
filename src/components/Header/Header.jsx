import logo from '../../assets/1-logo.png'; 
import { MdVideocam } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

const Header = () => {
  return (
    <>
      <header> 
           <div className="container header-container">
            <div>
              <img src={logo} alt="Campaign Logo" className="logo" />
            </div>
            <nav>
            <a href="#que-importa"><FaHashtag className="icono__yellow" /> Lo qué importa</a>
               <a href="#testiominos"><MdVideocam className="icono__yellow" /> Testimonios</a>
              <a href="#brick-wall"><MdOutlineMessage className="icono__yellow" /> Muro</a>
           
       
            </nav>
           </div>
        </header>
    </>
  );
};

export default Header;