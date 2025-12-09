import { MdMic } from "react-icons/md"; 

const ShortsSections = () => {
  return (
    <>
   <section id="que-importa" className="video-section">
          <h3 className="video-section-title"><MdMic className="icono__yellow"  /> Lo que Importa para mí</h3>
          <div className="container multiple-videos-container">
              <div className="video-container">
            <iframe width="100%" height="500" 
              src="https://www.youtube.com/embed/j4cBZFw-A44" 
              title="4 December 2025" frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media;
              gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>

              </iframe>
            
            
              </div>
              <div className="container video-container">
          <iframe width="100%" height="500" 
            src="https://www.youtube.com/embed/7jlFLTjDgzw"
            title="4 December 2025" 
            frameborder="0" allow="accelerometer; 
            autoplay; clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
              </div>
              <div className="container video-container">
                <iframe width="100%" height="500"
                    src="https://www.youtube.com/embed/kcj6RseMUyg" 
                    title="19 November 2025" 
                    frameborder="0" 
                    allow="accelerometer; 
                    autoplay; clipboard-write;
                    encrypted-media; gyroscope; 
                    picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                  </iframe>
                </div>
          </div>
        </section>


      </>
  );
} ;

export default ShortsSections;