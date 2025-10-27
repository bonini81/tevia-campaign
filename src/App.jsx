import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    text: 'Dummy Text',
    photo: null,
    imageUrl: null,  // Add this line
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
            <div className="container">
              <div className="info-content">
                
               <div className="text-content">
          
                  <h3>¿Qué es lo que importa de verdad para ti?</h3>
                  <br />
                  {openButton && <button onClick={handleOpenForm}>Deja tu mensaje</button>}
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
                    onSubmit={(values, { setSubmitting }) => {
                      const formDataToSubmit = new FormData();
                      formDataToSubmit.append('text', values.text);
                      formDataToSubmit.append('firstName', values.firstName);
                      formDataToSubmit.append('lastName', values.lastName);
                      formDataToSubmit.append('email', values.email);
                      
                      let imageUrl = null;
                      if (values.photo) {
                        formDataToSubmit.append('photo', values.photo);
                        imageUrl = URL.createObjectURL(values.photo);
                      }

                      setFormData({
                        ...values,
                        imageUrl: imageUrl
                      });

                      setSubmitting(false);
                      setOpenForm(false);
                      setOpenWall(true);
                    }}
                  >
                    {({ errors, touched, setFieldValue, values }) => (
                      <Form className="campaign-form">
                        <div className="form-group">
                          <Field
                            as="textarea"
                            name="text"
                            placeholder="Tu mensaje (máximo 100 caracteres)"
                            maxLength={100}
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
                              id="file-upload"
                            />
                            {/* Show filename or check icon when file is selected */}
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
                    <p>{formData?.text}</p>
                      <p>{formData?.firstName}</p>
                        {formData.imageUrl && (
                          <img 
                            src={formData.imageUrl} 
                            alt="Uploaded" 
                            style={{ maxWidth: '100%', marginTop: '1rem' }} 
                          />
                        )}
                    </>
                  }
    
                  </div>
                ) : ""}
               
              </div>
          </div>
        </section>

          <section id="second-video" className="video-section">
            <div className="container">
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
