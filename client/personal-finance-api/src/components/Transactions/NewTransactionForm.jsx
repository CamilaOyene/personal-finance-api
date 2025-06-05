import { Form, Input, InputNumber, Select, Button, DatePicker } from "antd";

const { Option } = Select;

const NewTransactionForm = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        //Convierte la fecha a string si es Moment
        const data = {
            ...values,
            date: values.date.format('YYYY-MM-DD'),
        };
        onSubmit?.(data);
        form.resetFields();
    };

    return (
        <Form form={form} layout='vertical' onFinish={handleFinish}>
            <Form.Item
                label='Descripción'
                name='description'
                rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                label='Monto'
                name='amount'
                rules={[{ required: true, message: 'Por favor ingresa un monto' }]}
            >
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>


            <Form.Item
                label='Tipo'
                name='type'
                rules={[{ required: true, message: 'Selecciona un tipo' }]}
            >
                <Select>
                    <Option value='income'>Ingreso</Option>
                    <Option value='expense'>Gasto</Option>
                </Select>
            </Form.Item>

            <Form.Item
            label='Fecha'
            name='date'
            rules={[{required: true, message:'Selecciona una fecha'}]}
            >
                <DatePicker style={{width:'100%'}} />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType="submit">
                    Agregar Transacción
                </Button>
            </Form.Item>


        </Form>
    );
};


export default NewTransactionForm;