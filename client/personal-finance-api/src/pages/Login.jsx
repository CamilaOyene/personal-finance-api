import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    //redirige si ya estoy logueado 
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [navigate]);

    
    const onFinish = ({ email, password }) => {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            localStorage.setItem('isAuthenticated', 'true');
            message.success('Inicio de sesión exitoso');
            navigate('/dashboard');
        } else {
            message.error('Credenciales incorrectas');
        }

        setLoading(false);

    };

    return (
        <div style={{ maxWidth: 400, margin: '80px auto' }}>
            <Title level={2}>Iniciar Sesión</Title>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label='Correo' name='email' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Contraseña" name="password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>

                <Button type='primary' htmlType='submit' loading={loading}>
                    Entrar
                </Button>
            </Form>
        </div>
    );
};



export default Login;

