import WithLogging from '../HOC/WithLogging';
import { useState } from 'react';

function Login(props) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    props.logIn(
      formData.email,
      formData.password
    );
  };

  const handleChangeEmail = (event) => {
    const email = event.target.value;

    setFormData({
      ...formData,
      email
    });

    setEnableSubmit(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        formData.password.length >= 8
    );
  };

  const handleChangePassword = (event) => {
    const password = event.target.value;

    setFormData({
      ...formData,
      password,
    });

    setEnableSubmit(
        password.length >= 8 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
  };

  return (
    <div className='App-login flex-1 box-border border-t-[3px] border-[var(--main-color)] p-5'>
      <p className="m-0 mb-5 text-[12px] text-[#2d2d2d]">
        Login to access the full dashboard
      </p>

      <form
        onSubmit={handleLoginSubmit}
        className="flex items-center max-[520px]:flex-col max-[520px]:items-start"
      >
        <label
          htmlFor="email"
          className="mr-[5px] text-[10px] text-[#2d2d2d] max-[520px]:block max-[520px]:mr-0 max-[520px]:mb-1 max-[520px]:text-sm"
        >
          Email:
        </label>

        <input
          onChange={handleChangeEmail}
          value={formData.email}
          type="email"
          id="email"
          className="mr-[5px] box-border h-[12px] w-[85px] border border-[#c8c8c8] px-[2px] max-[520px]:mb-3 max-[520px]:h-9 max-[520px]:w-[200px] max-[520px]:px-2"
        />

        <label
          htmlFor="password"
          className="mr-[5px] text-[10px] text-[#2d2d2d] max-[520px]:block max-[520px]:mr-0 max-[520px]:mb-1 max-[520px]:text-sm"
        >
          Password:
        </label>

        <input
          onChange={handleChangePassword}
          value={formData.password}
          type="password"
          id="password"
          className="mr-[5px] box-border h-[12px] w-[85px] border border-[#c8c8c8] px-[2px] max-[520px]:mb-3 max-[520px]:h-9 max-[520px]:w-[200px] max-[520px]:px-2"
        />

        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className="rounded-[2px] border border-[#c8c8c8] bg-[#eee] px-1 py-[1px] text-[8px] text-[#555] max-[520px]:px-2 max-[520px]:py-1 max-[520px]:text-xs"
        />
      </form>
    </div>
  );
}

export default WithLogging(Login);
