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

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

  //Card Styling
  const cStyle = {
    width: '33%  ',
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

              <Form name="attacker"
                  onFinish={onFinish}
                  style={{ maxWidth: 600,}}
                  layout="inline"
                  wrap="flex">
                    <Form.Item name="amodels" 
                               label="Models:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
                    <Form.Item name="attacks" 
                               label="Attacks:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
                    <Form.Item name="skill" 
                               label="BS/WS:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={2}
                                   step={1}/>
                    </Form.Item>
                    <Form.Item name="S" 
                               label="Strength:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
                    <Form.Item name="AP" 
                               label="AP:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item><Form.Item name="d" 
                               label="Damage:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
              </Form>
            </Card>
            <Card title = "Hitting"
                  style={ cStyle }>
              <Form>

              </Form>
            </Card>
            <Card title = "Wounding"
                  style={ cStyle }>
              <Form>

              </Form>
            </Card>
          </Content>
            </Layout>
              <Footer style={footerStyle}>
                <Card title = "Defending Unit"
                  style={ cStyle }>
                    <Form name="defender"
                  onFinish={onFinish}
                  style={{ maxWidth: 600,}}
                  layout="inline"
                  wrap="flex">
                    <Form.Item name="dmodels" 
                               label="Models:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
                    <Form.Item name="T" 
                               label="Toughness:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
                    <Form.Item name="W" 
                               label="Wounds:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
                    <Form.Item name="sav" 
                               label="Save:"
                               rules={[{ required: true }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
                    <Form.Item name="inv" 
                               label="Invulnerable:"
                               rules={[{ required: false }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
                    <Form.Item name="fnp" 
                               label="Feel no pain:"
                               rules={[{ required: false }]}
                               layout="vertical"
                               style={ inStyle }>
                      <InputNumber stringMode={false}
                                   min={1}
                                   step={1}/>
                    </Form.Item>
              </Form>
            </Card>
            <Button type="primary" 
                    htmlType="submit"
                    style={bStyle}>Generate</Button>
                </Footer>
              <Footer style={footerStyle}>
                </Footer>
            </Layout>
        </Flex>
    );
}