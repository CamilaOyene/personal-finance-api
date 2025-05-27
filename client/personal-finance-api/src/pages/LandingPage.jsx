// src/pages/Home.jsx
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
    return (
        <div style={{ maxWidth: 600, margin: '100px auto', textAlign: 'center' }}>
            <Title>Bienvenido a Mis Finanzas 💰</Title>
            <Paragraph>Organizá tus ingresos, gastos y categorías de forma simple y clara.</Paragraph>

            <div style={{ marginTop: 32 }}>
                <Link to="/login">
                    <Button type="primary" style={{ marginRight: 16 }}>
                        Iniciar sesión
                    </Button>
                </Link>

                <Link to="/register">
                    <Button>Registrarse</Button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
