import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <h1 style={{
          fontSize: '120px',
          fontWeight: 'bold',
          color: '#1877f2',
          margin: '0',
          lineHeight: '1'
        }}>
          404
        </h1>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '600',
          color: '#1c1e21',
          marginTop: '20px',
          marginBottom: '10px'
        }}>
          Page Not Found
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#65676b',
          marginBottom: '30px'
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#1877f2',
            color: 'white',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#166fe5'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1877f2'}
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default NotFound
