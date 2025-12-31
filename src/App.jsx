import { useEffect, useState } from 'react';
import FormSection from './sections/FormSection';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { MdOutlineMessage } from "react-icons/md";
import CarouselSlot from './components/CarruselSlot/CarruselSlot';
import Header from './components/Header';
import Footer from './components/Footer';
import ShortsSections from './sections/ShortsSections.jsx';
import Testimonios from './sections/Testimonios.jsx';
import './App.css';

function App() {
  
const [allMessages, setAllMessages] = useState([]);
const [loading, setLoading] = useState(true);
const [newestMessages, setNewestMessages] = useState([]);
const [randomMessages1, setRandomMessages1] = useState([]);
const [randomMessages2, setRandomMessages2] = useState([]);
const [oldestMessages, setOldestMessages] = useState([]);
const [randomMessages3, setRandomMessages3] = useState([]);
const [randomMessages4, setRandomMessages4] = useState([]);
  
const [openForm, setOpenForm] = useState(false);
const [openWall, setOpenWall] = useState(false);
const [openButton, setOpenButton] = useState(true);


// Helper functions to organize messages
const getNewestMessages = (messages) => {
  return messages.sort((a, b) => b.timestamp - a.timestamp).slice(0, 6);
};

const getRandomMessages = (messages, count = 6) => {
  const shuffled = [...messages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getOldestMessages = (messages) => {
  return messages.sort((a, b) => a.timestamp - b.timestamp).slice(0, 6);
  };

const fetchMessages = async () => {
  try {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'messages'));
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });
    setAllMessages(messages);
    console.log(allMessages);
    // Organize messages for each carousel
    setNewestMessages(getNewestMessages(messages));
    setOldestMessages(getOldestMessages(messages));
    setRandomMessages1(getRandomMessages(messages, 6));
    setRandomMessages2(getRandomMessages(messages, 6));
    setRandomMessages3(getRandomMessages(messages, 6));
    setRandomMessages4(getRandomMessages(messages, 6));
  } catch (error) {
    console.error('Error fetching messages:', error);
  } finally {
    setLoading(false);
  }
  };
  
  useEffect(() => {
  fetchMessages();
}, []);


  useEffect(() => {
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

const handleClickOpenForm = () => {
  document.querySelector('#form-send').scrollIntoView({ behavior: 'smooth' });
  setOpenForm(true);
  setOpenWall(false);
  setOpenButton(false);
  }

  return (
    <div className="app">
        

      <main>
        
        <Header />
        
        <FormSection
          onMessageSubmit={fetchMessages}
          openFormState={openForm}
          openWallState={openWall}
          openButtonState={openButton}
          setOpenFormState={setOpenForm}
          setOpenWallState={setOpenWall}
          setOpenButtonState={setOpenButton}
        />

        <ShortsSections />

        <Testimonios />
   

<section id="brick-wall" className="brick-wall-section">
          <h3 className="video-section-title"><MdOutlineMessage className="icono__yellow" /> Muro de Mensajes</h3>
          
            <button 
            // onClick={() => document.querySelector('#form-send').scrollIntoView({ behavior: 'smooth' })}
            onClick={handleClickOpenForm}
              className="button-message__styles wall-styles"
            >
              Comparte lo que importa para ti
            </button>
  
  {loading ? (
    <p className="loading-text">Cargando mensajes...</p>
  ) : (
    <div className="brick-wall-container">
                <div className="wall-grid">
                          <div className="carousel-column">
                  <CarouselSlot messages={newestMessages} speed={5000} />
            
                  <CarouselSlot messages={randomMessages1} speed={6000} />
                    <CarouselSlot messages={randomMessages2} speed={5500} />
                  </div>
                  
                  <div className="carousel-column mobile-hide">
                    <CarouselSlot messages={oldestMessages} speed={7000} />
                    <CarouselSlot messages={randomMessages3} speed={6500} />
                    <CarouselSlot messages={randomMessages4} speed={5800} />
                   </div>

        </div>
    </div>
  )}
        </section>
        
        </main>

      <Footer />

    </div>
  )
}

export default App;