import { useEffect } from 'react';
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;


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
        onSave({ name: values.name, type: values.type });
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


            <Form.Item
                label='Tipo'
                name='type'
                rules={[{ required: true, message: 'Seleccione el tipo de categoría' }]}>
                <Select placeholder="Seleccioná un tipo">
                    <Option value="income">Ingreso</Option>
                    <Option value="expense">Gasto</Option>
                </Select>
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