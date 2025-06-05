import { useState } from "react";
import { Button, Table, Modal } from "antd";
import NewCategoryForm from '../components/Categories/NewCategoryForm';

const CategoriesPage = () => {

    const [categories, setCategories] = useState([
        { id: 1, name: 'Comida' },
        { id: 2, name: 'Transporte' },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleAddCategory = (category) => {
        setCategories((prev) => [...prev, { ...category, id: Date.now() }]);
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
            <h1>Categorías</h1>
            <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
                + Nueva Categoría
            </Button>
            <Table
                dataSource={categories.map(cat => ({ ...cat, key: cat.id }))}
                columns={columns}
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: 'No hay categorías cargadas' }}
            />
            <Modal
            title='Nueva Categoría'
            open={isModalVisible}
            footer={null}
            onCancel={()=>setIsModalVisible(false)}
            destroyOnClose
            >
                <NewCategoryForm onSave={handleAddCategory}/>
            </Modal>
        </div>
    )


}

export default CategoriesPage;