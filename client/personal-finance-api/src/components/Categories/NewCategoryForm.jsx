import { Form, Input, Button } from "antd";
import { useEffect } from 'react';

const NewCategoryForm = ({ onSave, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form])

    const onFinish = (values) => {
        onSave({ name: values.name });
        form.resetFields();
    };

    return (
        <Form form={form} layout='vertical' onFinish={onFinish}>
            <Form.Item
                label='Nombre'
                name='name'
                rules={[{ required: true, message: 'Ingrese el nombre de la categoría' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block >
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewCategoryForm;