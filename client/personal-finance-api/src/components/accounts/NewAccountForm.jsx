import { Form, Input, Button } from 'antd';
import { useEffect } from 'react';

const NewAccountForm = ({ onSave, initialValues}) => {

    const [form] = Form.useForm();

    useEffect(()=> {
        if(initialValues){
            form.setFieldValue(initialValues);
        }
    },[initialValues, form])

    const onFinish = (values) => {
        onSave({
            name: values.name,
            balance: parseFloat(values.balance),
        });
        form.resetFields();
    };

    return (
        <Form form={form} layout='vertical' onFinish={onFinish}>
            <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: 'Por favor ingrese el nombre de la cuenta' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Saldo inicial"
                name="balance"
                rules={[
                    { required: true, message: 'Ingrese un saldo válido' },
                    { pattern: /^\d+(\.\d{1,2})?$/, message: 'Debe ser un número válido' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    )


};

export default NewAccountForm;