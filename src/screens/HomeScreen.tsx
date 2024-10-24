// src/screens/HomeScreen.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Fundo com a imagem */}
      <div style={styles.background} />

      {/* Conteúdo central com os botões */}
      <div style={styles.content}>
        <button style={styles.button} onClick={() => navigate('/login?type=teacher')}>
          Login Professor
        </button>
        <button style={styles.button} onClick={() => navigate('/login?type=student')}>
          Login Aluno
        </button>
        <button style={styles.button} onClick={() => navigate('/register?type=student')}>
          Cadastro Aluno
        </button>
        <button style={styles.button} onClick={() => navigate('/register?type=teacher')}>
          Cadastro Professor
        </button>
      </div>
    </div>
  );
};

// Estilos para a tela inicial
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
  button: {
    width: '200px',
    padding: '15px',
    margin: '10px 0',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#007bff',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
  },
};

export default HomeScreen;
