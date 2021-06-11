import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

function NavigationBar() {

    return (
        <Layout>
            <Header style={{ 
                        lineHeight: '64px', 
                        backgroundColor: "black",
                        border: "black"
                    }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ 
                        lineHeight: '64px', 
                        backgroundColor: "black",
                        border: "black"
                    }}
                >
                    <Menu.Item key="1">
                        <Link to="/">
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/Descriptive-Statistics">
                            View Descriptive Statistics for S&P
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/Prescriptive-Statistics">
                            View Prescriptive Statistics for S&P
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/About">
                            About
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
        </Layout>
    )
}

export default NavigationBar;