import React, { useEffect, useState } from 'react';
import styles from './Auth.module.css'; // Importing CSS module for component styling
import { useNavigate } from 'react-router-dom'; // Hook for navigation after successful login
import { useTranslation } from 'react-i18next'; // Importing translation hook

const Auth = () => {
  // State variables for managing user input and errors
  const [username, setUsername] = useState(''); // Stores the username input
  const [password, setPassword] = useState(''); // Stores the password input
  const [error, setError] = useState<string | null>(null); // Stores error message if login fails
  const navigate = useNavigate(); // Hook for page redirection
  const { t } = useTranslation('auth'); // Add translation hook to access the t function

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission
    const payload = {
      username, // Username entered by the user
      password, // Password entered by the user
    };
  
    // API call to authenticate the user
    (global as any).api
      .post('/auth/login', payload) // Sending POST request with username and password
      .then((response: any) => {
        console.log('Login Successful:', response.data);
  
        // Save token and workspace data in localStorage for further use
        localStorage.setItem('token', response.data.token_id);
        localStorage.setItem('workspaces', JSON.stringify(response.data.workspaces));
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_role', response.data.user_role);
  
        // Reset form states on success
        setError(null);
        setUsername('');
        setPassword('');
        
        // Redirect the user to the chat page
        navigate('/chat');
      })
      .catch((err: any) => {
        console.error('Login Failed:', err);
        // Set error message for invalid login attempt
        setError(t('error')); // Use translated error message
      });
  };

  return (
    <div className={styles.section}> {/* Wrapper section for styling */}
      <div className={styles.container}> {/* Container for the login form */}
        <div className={styles.logo}> {/* Logo section */}
          <img src={'/img/AskYourDataLogo.png'} alt="Logo" /> {/* Company Logo */}
        </div>
        <div className={styles.subText}> {/* Informational text below the logo */}
          {t('subText')} {/* Translated subtext */}
        </div>
        {/* Login Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Username Input Field */}
          <label className={styles.label}>
            <p>{t('username')}</p> {/* Translated label for username */}
            <input
              type="email" // Input type for username (email format)
              placeholder={t('username')} // Placeholder in translated text
              className={styles.input} // Styled input field
              value={username} // Binds state to input value
              onChange={(e) => setUsername(e.target.value)} // Updates username state
            />
          </label>

          {/* Password Input Field */}
          <label className={styles.label}>
            <p>{t('password')}</p> {/* Translated label for password */}
            <input
              type="password" // Input type for password
              placeholder={t('password')} // Placeholder in translated text
              className={styles.input} // Styled input field
              value={password} // Binds state to input value
              onChange={(e) => setPassword(e.target.value)} // Updates password state
            />
            <p className={styles.forgot}>{t('forgotPassword')}</p> {/* Translated forgot password text */}
          </label>

          {/* Display error message if login fails */}
          {error && <p className={styles.error}>{error}</p>} {/* Translated error message */}

          {/* Action Buttons */}
          <div className={styles.buttons}>
            <button type="submit" className={styles.log}> {/* Login button */}
              {t('logIn')}
            </button>
            <button type="button" className={styles.reg}> {/* Register button */}
              {t('register')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth; // Exporting the Auth component for use in other parts of the app
