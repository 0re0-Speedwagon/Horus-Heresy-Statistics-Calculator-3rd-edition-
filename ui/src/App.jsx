import React, {useState} from "react";
import { Flex,
         Layout,
         Divider,
         Radio,
         Card,
         Input,
         InputNumber,
         Checkbox,
         Button,
         Select,
         Space,
         Form,} from 'antd';
import {FullscreenExitOutlined} from '@ant-design/icons';
import AttackerInput from "./Attacker";
import DefenderInput from "./Defender";
const { Header, Footer, Sider, Content } = Layout;

export default function App() {

  //API URL
  const API_URL =
    import.meta.env.VITE_API_URL !== undefined
        ? import.meta.env.VITE_API_URL // address for production architecture
        : 'http://localhost:8000'; // address for local architecture

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
      border: '5px solid black',
    };

    //Content
    const contentStyle = {
      textAlign: 'center',
      fontSize: '24px',
      minHeight: 120,
      lineHeight: '32px',
      color: '#000000ff',
      backgroundColor: '#939393ff',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      minWidth: '500px',
    };

    //Sider
    const siderStyle = {
      textAlign: 'center',
      lineHeight: '16px',
      fontSize: '16px',
      color: '#000000ff',
      backgroundColor: '#525252ff',
      border: '5px solid black',
    };

    //Footer
    const footerStyle = {
      textAlign: 'center',
      color: '#000000ff',
      backgroundColor: '#939393ff',
    };

    //Total Layout
    const layoutStyle = {
      borderRadius: 8,
      overflow: 'hidden',
    };

  function refreshAttacker() {
        setRefreshTrigger((prev) => prev + 1);
    }

  function refreshDefender() {
        setRefreshTrigger((prev) => prev + 1);
    }

  //Card Styling
  const cStyle = {
    width: ' 50% ',
    background: 'transparent',
    border: '3px solid black',
    justifyContent: 'center',
    align: 'center',
    margin: '5px',
    minWidth: '130px',
  };

  //Input Styling
  const inStyle = {
      width: 100
  };

  //Button Styling
  const bStyle = {
    size:'large',
    
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
            <b>Please only input the numerical values for attacking and defending units</b>
          </Sider>

          <Content style={contentStyle}>
            <Card title = "Attacking Unit"
                  style={ cStyle }>
              <AttackerInput
                  API_URL={API_URL}
                  onAttackerSet={refreshAttacker}
              />{' '}
            </Card>

            <Card title = "Defending Unit"
                  style={ cStyle }>
                <DefenderInput
                  API_URL={API_URL}
                  onDefenderSet={refreshDefender}
              />{' '}
            </Card>
            
          </Content>
            </Layout>
              <Footer style={footerStyle}>
            <Button type="primary" 
                    htmlType="submit"
                    style={bStyle}>Generate</Button>
                </Footer>
              <Footer style={footerStyle}>
                <b>Graphing data goes here!</b>
                </Footer>
            </Layout>
        </Flex>
    );
}