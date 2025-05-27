import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        localStorage.setItem('ser', JSON.stringify(values));
        message.success('Registro exitoso');
        navigate('/login');
        setLoading(false);
    }

    return (
        <div style={{ maxWidth: 400, margin: '80px auto' }}>
            <Title level={2}>Registrarse</Title>
            <Form layout='vertical' onFinish={onFinish}>

                <Form.Item label='Nombre' name='name' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label='Correo' name='email' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label='Contraseña' name='password' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Button type='primary' htmlType='submit' loading={loading}>
                    Registrarse
                </Button>

            </Form>

        </div>
    )
}

export default Register;