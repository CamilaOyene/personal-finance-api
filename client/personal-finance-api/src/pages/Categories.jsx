import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Modal, Space, Popconfirm, message } from "antd";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../features/categories/categoriesSlice';
import NewCategoryForm from '../components/Categories/NewCategoryForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const CategoriesPage = () => {

    const dispatch = useDispatch();
    // Extraemos las categorías y estado de carga desde el slice
    const { categories, loading, error } = useSelector((state) => state.categories);
    // Estado para mostrar/ocultar el modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // Al montar el componente, obtenemos todas las categorías
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);



    //Guardar o actualizar categoría
    const handleSaveCategory = (category) => {
        if (editingCategory) {
            dispatch(updateCategory({ ...category, _id: editingCategory._id }))
                .unwrap()
                .then(() => {
                    message.success('Categoría actualizada');
                    setIsModalVisible(false);
                    setEditingCategory(null);
                })
        } else {
            dispatch(createCategory(category))
                .unwrap()
                .then(() => {
                    message.success('Categoría creada');
                    setIsModalVisible(false);
                })
        }
    };

    //Preparar edición
    const handleEdit = (category) => {
        setEditingCategory(category);
        setIsModalVisible(true);
    };

    //Eliminar

    const handleDelete = (id) => {
        dispatch(deleteCategory(id))
            .unwrap()
            .then(() => message.success('Categoría eliminada'))
    }

    //Agregar categoría
    const handleAddCategory = () => {
        setEditingCategory(null);
        setIsModalVisible(true);
    }


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Editar
                    </Button>

                    <Popconfirm
                        title='¿Seguro que querés eliminar esta categoría?'
                        okText='Sí'
                        cancelText='No'
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button danger icon={<DeleteOutlined />} >
                            Eliminar
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    // Adaptamos las categorías al formato que necesita Ant Design
    const dataSource = categories.map(cat => ({
        ...cat,
        key: cat._id
    }));



    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
            <h1>Categorías</h1>

            <Button type="primary" onClick={handleAddCategory} style={{ marginBottom: 16 }}>
                + Nueva Categoría
            </Button>

            {error && (
                <Alert message={error} type='error' showIcon style={{ marginBottom: 16 }} />
            )}

            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
                loading={loading}
                locale={{ emptyText: loading ? 'Cargando...' : 'No hay categorías cargadas' }}
            />

            <Modal
                title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                open={isModalVisible}
                footer={null}
                onCancel={() => {
                    setIsModalVisible(false)
                    setEditingCategory(null)
                }}
                destroyOnHidden
            >
                <NewCategoryForm onSave={handleSaveCategory} initialValues={editingCategory} />
            </Modal>
        </div>
    );

};

export default CategoriesPage; 