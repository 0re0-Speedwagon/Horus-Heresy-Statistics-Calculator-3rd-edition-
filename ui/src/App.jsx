import React, {useState, useEffect} from "react";
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
import '@ant-design/v5-patch-for-react-19';
import AttackerInput from "./Attacker";
import DefenderInput from "./Defender";
const { Header, Footer, Sider, Content } = Layout;

export default function App() {
  
const [offInput, setOffInput] = useState({});
const [defInput, setDefInput] = useState({});
const [result, setResult] = useState(null);

  //API URL
  const API_URL =
    import.meta.env.VITE_API_URL !== undefined
        ? import.meta.env.VITE_API_URL // address for production architecture
        : 'http://localhost:8000'; // address for local architecture

  async function handleSubmit(e) {
      console.log(API_URL)
      e.preventDefault();
      const response = await fetch(`${API_URL}/calculate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ offInput, defInput }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();  //Parse response
      console.log('Success:', data);
      setResult(data);                     //Save it to state
  };

  //Change variables
    useEffect(() => {
    }, [offInput, defInput]);

    //Attacker object
    function onAFinish(input) {
      setOffInput(input)
    };

    //Defender object
    function onDFinish(input) {
      setDefInput(input)
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
                  onFinish={onAFinish}
              />{' '}
            </Card>

            <Card title = "Defending Unit"
                  style={ cStyle }>
                <DefenderInput
                  onFinish={onDFinish}
              />{' '}
            </Card>
            
          </Content>
            </Layout>
              <Footer style={footerStyle}>
            <Button type="primary"
                    onClick={handleSubmit}
                    style={bStyle}>Generate</Button>
                </Footer>
              <Footer style={footerStyle}>
                <b>Graph Data goes here!</b>
                </Footer>
            </Layout>
        </Flex>
    );
}