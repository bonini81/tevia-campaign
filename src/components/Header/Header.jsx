import { MdVideocam } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import './Header.scss';

const Header = () => {
  return (
    <>
      <header> 
           <div className="container header-container">
            <h5 className="logo-header">
              <span className="icono__yellow">#</span>LoQueImportaDeVerdad
            </h5>
            <nav>
            <a href="#que-importa"><FaHashtag className="icono__yellow" /> Lo que importa</a>
               <a href="#testimonios"><MdVideocam className="icono__yellow" /> Testimonios</a>
              <a href="#brick-wall"><MdOutlineMessage className="icono__yellow" /> Muro</a>
           
       
            </nav>
           </div>
        </header>
    </>
  );
};

export default Header;