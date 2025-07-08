import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, InputNumber, Select, Button, DatePicker, Modal, message } from "antd";
import { createCategory, getAllCategories } from '../../features/categories/categoriesSlice';
import { getAllAccounts } from '../../features/accounts/accountsSlice';
import dayjs from "dayjs";
import NewCategoryForm from '../../components/Categories/NewCategoryForm';

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

    const [categoryModalVisible, setCategoryModalVisible] = useState(false);


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

    //Guardar transacción
    const handleFinish = (values) => {
        //Convierte la fecha a string si es Moment
        const data = {
            ...values,
            date:dayjs(values.date).isValid() ? dayjs(values.date).format('YYYY-MM-DD') : null
        };
        onSave?.(data);
        form.resetFields();
    };

    //Guardar nueva categoría desde el modal 
    const handleSaveNewCategory = async (data) => {
        try {
            const newCategory = await dispatch(createCategory(data)).unwrap();
            await dispatch(getAllCategories());
            form.setFieldsValue({ category: newCategory._id });
            setCategoryModalVisible(false)
            message.success('Categoría creada correctamente');
        } catch (error) {
            message.error(`Error al crear categoría: ${error}`)
        }
    }

    return (<>
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
                <Select
                    placeholder='Elegí una categoría'
                    popupRender={menu => (
                        <>
                            {menu}
                            <div style={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
                                <Button type="link" onClick={() => setCategoryModalVisible(true)}>
                                    + Nueva categoría
                                </Button>
                            </div>
                        </>
                    )}
                >
                    {categories.map((cat) => (
                        <Option key={cat._id} value={cat._id}>
                            {cat.name}
                        </Option>))}
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

        <Modal
            title='Crear nueva categoría'
            open={categoryModalVisible}
            onCancel={() => setCategoryModalVisible(false)}
            footer={null}
        >
            <NewCategoryForm onSave={handleSaveNewCategory} />
        </Modal>
    </>
    );
};


export default NewTransactionForm;