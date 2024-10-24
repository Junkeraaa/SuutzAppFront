import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = ({ role }: { role: 'teacher' | 'student' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    const url = role === 'teacher'
      ? 'http://localhost:3000/api/auth/register/teacher'
      : 'http://localhost:3000/api/auth/register/student';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      }
    } catch (error) {
      console.error('Erro durante o cadastro:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div style={styles.container} onKeyDown={handleKeyPress}>
      {showError && <img src="/src/assets/errorLogin.svg" alt="Erro de Cadastro" style={styles.errorImage} />}

      <div style={styles.background} />
      
      <div style={styles.content}>
        <h2 style={styles.title}>{role === 'teacher' ? 'Cadastro Professor' : 'Cadastro Aluno'}</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirmar Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.registerButton}>
          Cadastrar
        </button>
      </div>

      <img
        src="/src/assets/logo.svg"
        alt="Logo Suutz Education"
        style={styles.logo}
        onClick={() => navigate('/')}
      />

      <p style={styles.bottomText}>Sign up to go from zero to billion.</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/src/assets/TelaFundo.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    zIndex: 1,
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input: {
    width: '100%',
    marginBottom: '15px',
    padding: '10px 0',
    fontSize: '1rem',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #ffffff',
    color: '#ffffff',
    outline: 'none',
  },
  registerButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
  },
  logo: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '150px',
    cursor: 'pointer',
  },
  bottomText: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    fontSize: '1rem',
    color: '#ffffff',
  },
  errorImage: {
    position: 'absolute',
    top: '10px',
    width: '300px',
    zIndex: 2,
  },
};

export default RegisterScreen;
