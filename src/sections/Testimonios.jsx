import { MdMic } from "react-icons/md"; 
import video1 from "../assets/video/1.mp4";
import video2 from "../assets/video/2.mp4";
import video3 from "../assets/video/3.mp4";
import video4 from "../assets/video/4.mp4";

const Testimonios = () => { 


  return ( 

      <section id="testimonios" className="video-section2">
               <h3 className="video-section-title"><MdMic className="icono__yellow"  /> Lo que Importa para mí</h3>
               <div className="container multiple-videos-container">
                   <div className="container video-container">
          
          <video controls className="youtube-iframe">
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
       
               </div>
               
             <div className="container video-container">
               <video controls className="youtube-iframe">
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
       
              </div>
        
                   <div className="container video-container">
                      <video controls className="youtube-iframe">
            <source src={video3} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
       
                    </div>
        
            <div className="container video-container">
                 <video controls className="youtube-iframe">
            <source src={video4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
       
            </div>
        
               </div>
             </section>
     
  )

    
}

export default Testimonios;