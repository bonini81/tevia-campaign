import { MdVideocam } from "react-icons/md";

const Testimonios = () => { 


  return ( 

      <div className="testimonios-container">
      <section id="testiominos" className="video-section2">
                 <h3 className="video-section-title"><MdVideocam className="icono__yellow" />   Testimonios</h3>
          <div className="container video-container2">
          
              <iframe 
                width="100%" 
                height="500px" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Second Sample Video"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="youtube-iframe2"
            >
              </iframe>
          
            </div>
      </section>
      </div>
  )

    
}

export default Testimonios;