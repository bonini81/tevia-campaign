import { useEffect, useState } from 'react';
// import { Formik, Form, Field } from 'formik';
import FormSection from './sections/FormSection';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import * as Yup from 'yup';
import { MdOutlineMessage } from "react-icons/md";
import { MdMic } from "react-icons/md"; 
import logo from './assets/1-logo.png'; 
import { MdVideocam } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import CarouselSlot from './components/CarruselSlot.jsx';
import './App.css';

function App() {
 /* const [formData, setFormData] = useState({
    text: 'Dummy Text',
    photo: null,
    imageUrl: null,
    firstName: 'Andy',
    lastName: '',
    email: ''
  });*/

// const [openForm, setOpenForm] = useState(false);
// const [openWall, setOpenWall] = useState(false);
  // const [openButton, setOpenButton] = useState(true);
  
const [allMessages, setAllMessages] = useState([]);
const [loading, setLoading] = useState(true);
const [newestMessages, setNewestMessages] = useState([]);
const [randomMessages1, setRandomMessages1] = useState([]);
const [randomMessages2, setRandomMessages2] = useState([]);
const [oldestMessages, setOldestMessages] = useState([]);
const [randomMessages3, setRandomMessages3] = useState([]);
const [randomMessages4, setRandomMessages4] = useState([]);


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

  
/** END */
/*
    const handleOpenForm = () => {
    setOpenForm(true);
    setOpenButton(false);
  }

  const validationSchema = Yup.object({
    text: Yup.string()
      .max(100, 'El texto no puede exceder 100 caracteres')
      .required('El texto es requerido'),
    firstName: Yup.string()
      .required('El nombre es requerido'),
    lastName: Yup.string()
      .required('El apellido es requerido'),
    email: Yup.string()
      .email('Email inválido')
      .required('El email es requerido'),
  }); */

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

  /* const handleFormSubmit = async (values, { setSubmitting }) => {
    let imageUrl = null;
    if (values.photo) {
      imageUrl = URL.createObjectURL(values.photo);
    }

    try {
      // Send to Basin (email)
      const response = await fetch('https://usebasin.com/f/994b9c63fbcc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_value: values.email,
          name: `${values.firstName} ${values.lastName}`,
          message: values.text,
        })
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        
        // Save to Firebase Firestore
        try {
          await addDoc(collection(db, 'messages'), {
            text: values.text,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            timestamp: new Date(),
            imageUrl: imageUrl || null
          });

          // Refresh messages list
          await fetchMessages();
        } catch (dbError) {
          console.error('Error saving to database:', dbError);
        }

        setFormData({
          ...values,
          imageUrl: imageUrl
        });

        setSubmitting(false);
        setOpenForm(false);
        setOpenWall(true);
      } else {
        alert('Error sending message. Please try again.');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message. Please try again.');
      setSubmitting(false);
    }
  }; */


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





  return (
    <div className="app">
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

        <main>
          
  <FormSection onMessageSubmit={fetchMessages} />

            <section id="que-importa" className="video-section">
          <h3 className="video-section-title"><MdMic className="icono__yellow"  /> Lo que Importa para mí</h3>
          <div className="container multiple-videos-container">
              <div className="video-container">
                <iframe
                    width="100%" 
                    height="500px" 
                    src="https://www.youtube.com/embed/kcj6RseMUyg?si=XQAkk0jCv24_ZS3D"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                    className="youtube-iframe"
                    >
                  </iframe>
              </div>
              <div className="container video-container">
                <iframe
                    width="100%" 
                    height="500px" 
                    src="https://www.youtube.com/embed/kcj6RseMUyg?si=XQAkk0jCv24_ZS3D"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                    className="youtube-iframe"
                    >
                  </iframe>
              </div>
              <div className="container video-container">
                <iframe
                    width="100%" 
                    height="500px" 
                    src="https://www.youtube.com/embed/kcj6RseMUyg?si=XQAkk0jCv24_ZS3D"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                    className="youtube-iframe"
                    >
                  </iframe>
                </div>
          </div>
        </section>

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


<section id="brick-wall" className="brick-wall-section">
  <h3 className="video-section-title"><MdOutlineMessage className="icono__yellow" /> Muro de Mensajes</h3>
  
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

        <footer className="footer-styles">
          <p><span className="icono__yellow">&copy;</span> 2025 Lo que importa de verdad. Stevia Life</p>
        </footer>
    </div>
  )
}

export default App;