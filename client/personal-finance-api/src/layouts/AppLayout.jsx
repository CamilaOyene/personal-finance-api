import { Layout, Menu } from 'antd';
import { PieChartOutlined, UserOutlined, DollarOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    //Menú Sider
    const menuItems = [
        {
            key: '1',
            icon: <PieChartOutlined />,
            label: <Link to='dashboard'>Dashboard</Link>,
        },
        {
            key: '2',
            icon: <DollarOutlined />,
            label: <Link to='transactions'>Transacciones</Link>,
        },
        {
            key: '3',
            icon: <UserOutlined />,
            label: <Link to='accounts'>Cuentas</Link>,
        },
        {
            key: '4',
            icon: <LogoutOutlined />,
            label: <Link to='logout'>Cerrar sesión</Link>,
        },
    ];
    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>

                <div style={{ color: '#fff', padding: 16, textAlign: 'center' }}>
                    {collapsed ? '💰' : 'Mis Finanzas 💰'}
                </div>

                <Menu theme='dark' mode='inline' items={menuItems} />


            </Sider>

            <Layout>
                <Header style={{ backgroud: '#fff', padding: 0 }} />

                <Content style={{ margin: '16px' }}>
                    <Outlet />
                </Content>

            </Layout>
        </Layout>


    )
}

export default AppLayout;