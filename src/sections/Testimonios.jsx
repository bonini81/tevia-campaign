import { MdMic } from "react-icons/md"; 
import poster1 from "../assets/video/poster1.jpg";
import poster2 from "../assets/video/poster2.jpg";
import poster3 from "../assets/video/poster3.jpg";
import poster4 from "../assets/video/poster4.jpg";

const Testimonios = () => { 


  return ( 

      <section id="nuestra-causa" className="video-section2">
               <h3 className="video-section-title"><MdMic className="icono__yellow"  /> Nuestra causa</h3>
               <div className="container multiple-videos-container">
                   <div className="container video-container">
          
          <video controls className="youtube-iframe" poster={poster1}>
            <source src="https://test.pugle-tech.pw/video-stevia/1.mp4" type="video/mp4" />
            <source src="https://test.pugle-tech.pw/video-stevia/1-webm.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
       
               </div>
               
             <div className="container video-container" poster={poster2}>
               <video controls className="youtube-iframe">
            <source src="https://test.pugle-tech.pw/video-stevia/2.mp4" type="video/mp4" />
              <source src="https://test.pugle-tech.pw/video-stevia/2-webm.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
       
              </div>
        
                   <div className="container video-container">
          <video controls className="youtube-iframe" poster={poster3}>
            <source src="https://test.pugle-tech.pw/video-stevia/3.mp4" type="video/mp4" />
            <source src="https://test.pugle-tech.pw/video-stevia/3-webm.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
       
                    </div>
        
            <div className="container video-container">
                 <video controls className="youtube-iframe" poster={poster4}>
            <source src="https://test.pugle-tech.pw/video-stevia/4.mp4" type="video/mp4" />
            <source src="https://test.pugle-tech.pw/video-stevia/4-webm.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
       
            </div>
        
               </div>
             </section>
     
  )

    
}

export default Testimonios;