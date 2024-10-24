// src/screens/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    setIsTeacher(type === 'teacher');
  }, [location]);

  const handleLogin = async () => {
    const url = isTeacher
      ? 'http://localhost:3000/api/auth/login/teacher'
      : 'http://localhost:3000/api/auth/login/customer';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      let data = await response.json();
      data = data.data;

      if (response.ok) {
        alert('Login realizado com sucesso!');
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('name', data.name);
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('id', data.id);
        navigate('/myClasses');
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <div style={styles.container}>
      {showError && <img src="/src/assets/errorLogin.svg" alt="Erro de Login" style={styles.errorImage} />}
      <div style={styles.background} />
      <div style={styles.content}>
        <h2 style={styles.title}>Login {isTeacher ? 'Professor' : 'Aluno'}</h2>
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
        <button onClick={handleLogin} style={styles.loginButton}>
          Login
        </button>
      </div>
    </div>
  );
};

// Estilos semelhantes ao anterior
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
    padding: '10px',
    fontSize: '1rem',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #ffffff',
    color: '#ffffff',
    outline: 'none',
  },
  loginButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
  },
  errorImage: {
    position: 'absolute',
    top: '10px',
    width: '300px',
    zIndex: 2,
  },
};

export default LoginScreen;
