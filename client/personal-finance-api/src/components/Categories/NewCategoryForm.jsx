import { Form, Input, Button } from "antd";

const NewCategoryForm = ({ onSave }) => {
    const [form] = Form.useForm();

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