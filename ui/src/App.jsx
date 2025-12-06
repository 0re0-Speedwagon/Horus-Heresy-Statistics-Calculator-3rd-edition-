import React, {useState} from "react";
import { Button, Select, Space } from 'antd';
import { Checkbox } from 'antd';
import { Flex, Layout, Divider, Radio, Table, Input } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default function App() {
  //Change variables
    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    const onChange = e => {
      console.log(`checked = ${e.target.checked}`);
    };
    //==========================
    //Layout variables
    //==========================

    //Header
    const headerStyle = {
      textAlign: 'center',
      color: '#000000ff',
      fontSize: "48px",
      height: 100,
      paddingInline: 48,
      lineHeight: '64px',
      backgroundColor: '#525252ff',
    };

    //Content
    const contentStyle = {
      textAlign: 'center',
      fontSize: '24px',
      minHeight: 120,
      lineHeight: '32px',
      color: '#000000ff',
      backgroundColor: '#939393ff',
    };

    //Sider
    const siderStyle = {
      textAlign: 'center',
      lineHeight: '16px',
      fontSize: '16px',
      color: '#000000ff',
      backgroundColor: '#525252ff',
    };

    //Footer
    const footerStyle = {
      textAlign: 'center',
      color: '#000000ff',
      backgroundColor: '#c9c9c9ff',
    };

    //Total Layout
    const layoutStyle = {
      borderRadius: 8,
      overflow: 'hidden',
    };

    
    //========================RETURN========================
    return (
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>

        <Header style={headerStyle}><b>Warhammer: The Horus Heresy 3.0 
              Statistics Calculator</b></Header>
        <Layout>

          <Sider width="25%" style={siderStyle}>
            <p>How to use:</p>
            <p>1: Select armies for attacker and defender</p>
            <p>2: Select units for attacker and defender</p>
            <p>3: Select additional modifiers</p>
            <p>4: Select attack type</p>
            <p>5: Click generate</p>
          </Sider>

          <Content style={contentStyle}>
            
            
          </Content>
            </Layout>
              <Footer style={footerStyle}>
                </Footer>
                weenis
            </Layout>
        </Flex>
    );
}