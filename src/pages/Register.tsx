import React, { useState } from 'react';
import Header from '../components/Register/Header';
import RegisterForm from '../components/Register/Form';
import Footer from '../components/Footer';
import FormSubmit from '../components/Register/FormSubmit';

export default function Register() {
  const [isRegistered, setIsRegistered] = useState(false);
  const handleRegister = () => {
    setIsRegistered(!isRegistered);
  };
  return (
    <>
      <Header isRegistered={isRegistered} />
      {!isRegistered ? (
        <RegisterForm
          isRegistered={isRegistered}
          handleRegister={handleRegister}
        />
      ) : (
        <FormSubmit />
      )}
      <Footer />
    </>
  );
}
