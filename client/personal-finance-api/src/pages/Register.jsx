import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import { registerUser } from '../features/auth/authSlice';



const { Title } = Typography;

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated } = useSelector(state => state.auth);

    //redirige si ya estoy logueado 
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);


    const onFinish = async (values) => {
        try {
            //Enviamos los datos y accedemos directamente al resultado si fue exitoso
            await dispatch(registerUser(values)).unwrap();
            message.success('Registro exitoso');
            navigate('/login')
        } catch (error) {
            //Si ocurre un error (viene del thunkAPI.rejectWithValue) lo mostramos en un mensaje de error.
            message.error(error);
        }
    }


    return (
        <div style={{ maxWidth: 400, margin: '80px auto' }}>
            <Title level={2}>Registrarse</Title>
            <Form layout='vertical' onFinish={onFinish}>

                <Form.Item label='Nombre' name='username' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label='Correo' name='email' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label='Contraseña' name='password' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Button type='primary' htmlType='submit' block loading={loading}>
                    Registrarse
                </Button>

            </Form>

        </div>
    )
};

export default Register;



