import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { MdOutlineMessage } from "react-icons/md";
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const FormSection = ({ onMessageSubmit }) => {
  const [formData, setFormData] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openWall, setOpenWall] = useState(false);
  const [openButton, setOpenButton] = useState(true);

  const handleOpenForm = () => {
    setOpenForm(true);
    setOpenButton(false);
  };

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

          // Notify parent to refresh messages
          if (onMessageSubmit) {
            onMessageSubmit();
          }
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
  };

  return (
    <section id="info-section" className="info-section">
      <article className="container info-container">
        <div className="info-content what-matters-content">
          <h3 className="wall-section-title"><span className="icono__yellow">#</span>Lo que importa de verdad</h3>
          <h3 className="wall-section-title--mobile"><span className="icono__yellow">#</span>Lo que importa de verdad</h3>
          <p className="paragraph-initial--styles">Vivimos rodeados de ruido que nos aleja de lo esencial.
            Este espacio nace para pausar, respirar y reconectar.</p>
          <p className="paragraph-initial--styles">Aquí puedes expresarte libremente: comparte una idea, emoción, reflexión… o simplemente una sonrisa.
            Queremos escucharte.
            Lo que tienes para decir, importa.</p>
        </div>
      </article>

      <div className="container wall-container">
        <div className="info-content">
          <div className="text-content">
            <h3>Comparte lo que importa para ti <MdOutlineMessage className="icono__yellow" /></h3>
            {openButton && <button onClick={handleOpenForm} className="button-message__styles">Deja tu mensaje</button>}
          </div>
          
          {openForm && (
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
                      {errors.text && touched.text && <div className="error">{errors.text}</div>}
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
                      {errors.firstName && touched.firstName && <div className="error">{errors.firstName}</div>}
                    </div>

                    <div className="form-group">
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                      />
                      {errors.lastName && touched.lastName && <div className="error">{errors.lastName}</div>}
                    </div>

                    <div className="form-group">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                      {errors.email && touched.email && <div className="error">{errors.email}</div>}
                    </div>

                    <button type="submit" className="submit-button">
                      Enviar
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
            
          {openWall && formData && (
            <div className="message-content">
              <p className="wall-text-content">{formData.text}</p>
              <p className="wall-text-name">- {formData.firstName} {formData.lastName}</p>
              {formData.imageUrl && (
                <img 
                  src={formData.imageUrl} 
                  alt="Uploaded" 
                  style={{ maxWidth: '100%', marginTop: '1rem' }} 
                />
              )}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default FormSection;