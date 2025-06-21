import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Modal } from "antd";
import { getAllCategories, createCategory } from '../features/categories/categoriesSlice';
import NewCategoryForm from '../components/Categories/NewCategoryForm';

const CategoriesPage = () => {

    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.categories);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleAddCategory = async (categoryData) => {
        try {
            await dispatch(createCategory(categoryData)).unwrap();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error al crear categoría', error);
        }
    }

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    //datos para la tabla
    const dataSource = categories.map(cat => ({
        ...cat,
        key: cat._id
    }));
    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
            <h1>Categorías</h1>
            <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
                + Nueva Categoría
            </Button>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
                loading={loading}
                locale={{ emptyText: 'No hay categorías cargadas' }}
            />
            <Modal
                title='Nueva Categoría'
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose
            >
                <NewCategoryForm onSave={handleAddCategory} />
            </Modal>
        </div>
    )


}

export default CategoriesPage;