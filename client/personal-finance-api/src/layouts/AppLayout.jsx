import { Layout, Menu } from 'antd';
import { PieChartOutlined, UserOutlined, DollarOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ mihHeigh: '100vh' }}>

            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>

                <div style={{ color: '#fff', padding: 16, textAlign: 'center' }}>
                    {collapsed ? '💰' : 'Mis Finanzas'}
                </div>

                <Menu theme='dark' mode='inline'>
                    <Menu.Item key='1' icon={<PieChartOutlined />}>
                        <Link to='dashboard'>Dashboard</Link>
                    </Menu.Item>

                    <Menu.Item key='2' icon={<DollarOutlined />}>
                        <Link to='transactions'>Transacciones</Link>
                    </Menu.Item>

                    <Menu.Item key='3' icon={UserOutlined}>
                        <Link to='Accounts'>Cuentas</Link>
                    </Menu.Item>

                    <Menu.Item key='2' icon={<LogoutOutlined />}>
                        <Link to='logout'>Cerrar sesión</Link>
                    </Menu.Item>

                </Menu>

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