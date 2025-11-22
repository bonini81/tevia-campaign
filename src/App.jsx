import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import logo from './assets/1-logo.png'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    text: 'Dummy Text',
    photo: null,
    imageUrl: null,
    firstName: 'Andy',
    lastName: '',
    email: ''
  });

  const [openForm, setOpenForm] = useState(false);
  const [openWall, setOpenWall] = useState(false);
  const [openButton, setOpenButton] = useState(true);

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
  });

 const handleFormSubmit = async (values, { setSubmitting }) => {
  let imageUrl = null;
  if (values.photo) {
    imageUrl = URL.createObjectURL(values.photo);
  }

  try {
    // Send form data via Basin
    const response = await fetch('https://usebasin.com/f/994b9c63fbcc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_value: values.email, // Basin field
        name: `${values.firstName} ${values.lastName}`,
        message: values.text,
      })
    });

    if (response.ok) {
      console.log('Form submitted successfully!');
      
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
};

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
        <header> 
           <div className="container header-container">
            <div>
              <img src={logo} alt="Campaign Logo" className="logo" />
        </div>
        <nav>
         
          <a href="#info-section">Lo qué importa para mí</a>
          <a href="#second-video">Testimonios</a>
            </nav>
            </div>
      </header>

      <main>
    
        <section id="info-section" className="info-section">
        <article className="container info-container">
          <h3 className="wall-section-title">Lo que importa de verdad</h3>
        </article>
          <div className="container wall-container">
              
              <div className="info-content">
                
               <div className="text-content">
          
                  <h3>¿Qué es lo que importa de verdad para ti?</h3>
                  <br />
                  {openButton && <button onClick={handleOpenForm} className="button-message__styles">Deja tu mensaje</button>}
                </div>
                {openForm ? 
                 <div className="form-content">
                  <Formik
                    initialValues={{
                      text: '',
                      firstName: '',
                      lastName: '',
                      email: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({ errors, touched, setFieldValue, values }) => (
                      <Form className="campaign-form">
                        <div className="form-group">
                          <Field
                            as="textarea"
                            name="text"
                            className="textarea-field"
                            placeholder="Tu mensaje (máximo 100 caracteres)"
                            maxLength={100}
                            rows={4}
                          />
                          {errors.text && touched.text ? <div className="error">{errors.text}</div> : null}
                        </div>

                       <div className="form-group">
                          <div className="file-input-wrapper">
                            <input
                              type="file"
                              onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                if (file) {
                                  setFieldValue("photo", file);
                                }
                              }}
                              accept=".jpg,.jpeg,.png,.webp"
                              className="file-upload"
                            />
                            {values.photo && (
                                <div className="file-status">
                                  <p style={{ color: 'black', fontWeight: 'bold' }}>Archivo seleccionado:</p>
                                <span className="file-name">{values.photo.name}</span>
                                <span className="check-icon">✓</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group">
                          <Field
                            type="text"
                            name="firstName"
                            placeholder="Nombre"
                          />
                          {errors.firstName && touched.firstName ? <div className="error">{errors.firstName}</div> : null}
                        </div>

                        <div className="form-group">
                          <Field
                            type="text"
                            name="lastName"
                            placeholder="Apellido"
                          />
                          {errors.lastName && touched.lastName ? <div className="error">{errors.lastName}</div> : null}
                        </div>

                        <div className="form-group">
                          <Field
                            type="email"
                            name="email"
                            placeholder="Email"
                          />
                          {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                        </div>

                        <button type="submit" className="submit-button">
                          Enviar
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
                  : ""}
                {openWall ? (
                  <div className="message-content">
                  {formData &&
                    <>
                    <p className="wall-text-content">{formData?.text}</p>
                      <p className="wall-text-name">- {formData?.firstName} {formData?.lastName}</p>
                        {formData.imageUrl && (
                          <img 
                            src={formData.imageUrl} 
                            alt="Uploaded" 
                            style={{ maxWidth: '100%', marginTop: '1rem' }} 
                          />
                        )}
                    </>
                    }
                    <div className="social-share">
          <button
            onClick={() => {
              const url = encodeURIComponent(window.location.href);
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                'facebook-share',
                'width=550,height=400'
              );
            }}
            className="share-button facebook"
          >
            Compartir en Facebook
          </button>
        </div>
    
                  </div>
                ) : ""}
               
              </div>
          </div>
        </section>

        <section id="video-section" className="video-section">
          <div className="container multiple-videos-container">
              <div className="video-container">
                <iframe
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/kcj6RseMUyg?si=XQAkk0jCv24_ZS3D"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                  </iframe>
              </div>
              <div className="container video-container">
                <iframe
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/kcj6RseMUyg?si=XQAkk0jCv24_ZS3D"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                  </iframe>
              </div>
              <div className="container video-container">
                <iframe
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/kcj6RseMUyg?si=XQAkk0jCv24_ZS3D"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                  </iframe>
                </div>
          </div>
        </section>

          <section id="video-section" className="video-section2">
          <div className="container video-container2">
            
              <iframe 
                width="90%" 
                height="70%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Second Sample Video"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
          
            </div>
        </section>

      </main>

      <footer className="footer-styles">
        <p>&copy; 2025 Lo que importa de verdad. Stevia Life</p>
        </footer>
    </div>
  )
}

export default App