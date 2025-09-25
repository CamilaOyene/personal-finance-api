import { Modal, Form, Input, InputNumber, Select } from 'antd';

const DebtForm = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(()=>{
        if(visible){
            form.setFieldsValue(initialValues);
        }else{
            form.resetFields();
        }
    },[visible, initialValues, form]);

    return (
        <Modal
            title={initialValues._id ? 'Editar Deuda' : 'Nueva Deuda'}
            open={visible}
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        onSubmit(values);
                    })
                    .catch((info) => console.log('Validación fallida', info));
            }}
            okText='Guardar'
            cancelText='Cancelar'
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
            >
                <Form.Item
                    label="Descripción"
                    name="description"
                    rules={[{ required: true, message: 'Ingrese una descripción' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Monto"
                    name="amount"
                    rules={[{ required: true, message: 'Ingrese el monto' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        step={0.01}
                    />
                </Form.Item>

                <Form.Item
                    label="Cuenta asociada"
                    name="account"
                    rules={[{ required: true, message: 'Seleccione una cuenta' }]}
                >
                    <Select placeholder="Selecciona una cuenta">
                        {/* Aquí puedes mapear las cuentas si vienen del backend */}
                        <Select.Option value="cuenta1">Cuenta 1</Select.Option>
                        <Select.Option value="cuenta2">Cuenta 2</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default DebtForm;