import { useState } from 'react';

function useLogin(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value;

    setEmail(newEmail);

    setEnableSubmit(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail) &&
      password.length >= 8
    );
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;

    setPassword(newPassword);

    setEnableSubmit(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      newPassword.length >= 8
    );
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    onLogin(email, password);
  };

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}

export default useLogin;