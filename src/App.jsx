import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // Smooth scroll behavior for menu items
    const menuLinks = document.querySelectorAll('nav a[href^="#"]');
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="app">
     <div>
        <header> 
           <div className="container header-container">
        <div className="logo">
          <h1>Campaign Logo</h1>
        </div>
        <nav>
          <a href="#video-section">Video</a>
          <a href="#info-section">Info</a>
          <a href="#second-video">Second Video</a>
            </nav>
            </div>
      </header>

      <main>
          <section id="video-section" className="video-section">
            <div className="container">
              <div className="video-container">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Sample Video"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
              </div>
            </div>
        </section>

        <section id="info-section" className="info-section">
          <div className="info-content">
            <div className="text-content">
              <h2>Campaign Information</h2>
              <p>This section will contain important campaign information and details. 
                 We can add more complex logic and content here later.</p>
            </div>
          </div>
        </section>

        <section id="second-video" className="video-section">
          <div className="video-container">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Second Sample Video"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Campaign Name. All rights reserved.</p>
        </footer>
        </div>
    </div>
  )
}

export default App
