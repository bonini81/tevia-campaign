import React, { useState, useEffect } from 'react';
import './CarruselSlot.scss';

const CarouselSlot = ({ messages, speed = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, speed);

    return () => clearInterval(interval);
  }, [messages, speed]);

  if (messages.length === 0) {
    return (
      <div className="carousel-slot">
        <div className="message-card empty-slot">
          <p className="empty-text">Cargando mensajes...</p>
        </div>
      </div>
    );
  }

  const currentMessage = messages[currentIndex];

  return (
    <div className="carousel-slot">
      <div className="message-card">
        <div className="message-card-content">
          <p className="message-text">"{currentMessage.text}"</p>
          <p className="message-author">- {currentMessage.firstName}</p>
        </div>
      </div>
    </div>
  );
};


export default CarouselSlot;