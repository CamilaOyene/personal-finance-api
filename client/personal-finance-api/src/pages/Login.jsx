import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Typography, message } from 'antd';
import { loginUser } from '../features/auth/authSlice';

const { Title } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated, error } = useSelector(state => state.auth);

    //redirige si ya estoy logueado 
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);


    const onFinish = async (values) => {
        try {
            await dispatch(loginUser(values)).unwrap();

            message.success('Inicio de sesión exitoso');
            navigate('/dashboard');
        } catch (error) {
            message.error(error)
        }
    }

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

                {error && (
                    <Form.Item>
                        <Typography.Text type="danger">{error}</Typography.Text>
                    </Form.Item>
                )}
                <Button type='primary' htmlType='submit' loading={loading}>
                    Entrar
                </Button>
            </Form>
        </div>
    );
};



export default Login;

