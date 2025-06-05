import { useState } from "react";
import { Button, Table, Modal } from 'antd';
import NewAccountForm from '../components/accounts/NewAccountForm';

const AccountsPage = () => {
    const [accounts, setAccounts] = useState([
        { id: 1, name: 'Caja', balance: 5000 },
        { id: 2, name: 'Banco', balance: 15000 },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddAccount = (account) => {
        setAccounts((prev) => [...prev, { ...account, id: Date.now() }]);
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Saldo',
            dataIndex: 'balance',
            key: 'balance',
            render: (balance) => `$${balance.toFixed(2)}`,
        },
    ];

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
            <h1>Cuentas</h1>
            <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
                + Nueva Cuenta
            </Button>

            <Table
                dataSource={accounts.map(acc => ({ ...acc, key: acc.id }))}
                columns={columns}
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: 'No hay cuentas cargadas' }}
            />
            <Modal
                title='Nueva Cuenta'
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose>
                <NewAccountForm onSave={handleAddAccount} />
            </Modal>
        </div>
    )



}

export default AccountsPage;