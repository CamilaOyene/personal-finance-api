import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, InputNumber, Select, Button, DatePicker } from "antd";
import { getAllCategories } from '../../features/categories/categoriesSlice';
import { getAllAccounts } from '../../features/accounts/accountsSlice';
import dayjs from "dayjs";


const { Option } = Select;

/**
 * Formulario reutilizable para agregar o editar una transacción.
 * Si recibe `initialValues`, carga los datos en el formulario.
 */

const NewTransactionForm = ({ onSave, initialValues }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);
    const { accounts } = useSelector((state) => state.accounts);


    //cargar categorías y cuentas al cargar
    useEffect(() => {
        if (!categories.length) dispatch(getAllCategories());
        if (!accounts.length) dispatch(getAllAccounts());
    }, [dispatch, categories.length, accounts.length]);

    //Cargar los valores initiales al editar
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                date: initialValues.date ? dayjs(initialValues) : null,
                category: initialValues.category?._id || initialValues.category,
                account: initialValues.account?._id || initialValues.account,
            })
        } else {
            form.resetFields();
        }
    }, [initialValues, form])

    const handleFinish = (values) => {
        //Convierte la fecha a string si es Moment
        const data = {
            ...values,
            date: values.date.format('YYYY-MM-DD'),
        };
        onSave?.(data);
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
                label='Categoría'
                name='category'
                rules={[{ required: true, message: 'Selecciona una categoría' }]}
            >
                <Select placeholder='Elegí una categoría'>
                    {categories.map((cat) => (
                        <Select.Option key={cat._id} value={cat._id}>
                            {cat.name}
                        </Select.Option>))}
                </Select>
            </Form.Item>


            <Form.Item
                label='Cuenta'
                name='account'
                rules={[{ required: true, message: 'Selecciona una cuenta' }]}
            >
                <Select placeholder='Elegí una cuenta'>
                    {accounts.map((acc) => (
                        <Option key={acc._id} value={acc._id}>
                            {acc.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>


            <Form.Item
                label='Fecha'
                name='date'
                rules={[{ required: true, message: 'Selecciona una fecha' }]}
            >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>


            <Form.Item>
                <Button type='primary' htmlType="submit">
                    {initialValues ? 'Actualizar Transacción' : 'Agregar Transacción'}
                </Button>
            </Form.Item>


        </Form>
    );
};


export default NewTransactionForm;