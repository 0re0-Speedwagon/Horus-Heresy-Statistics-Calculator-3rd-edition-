import React, {useState} from "react";
import './style.css';
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
    //Layout variables====================
    const headerStyle = {
      textAlign: 'center',
      color: '#000000ff',
      fontSize: "48px",
      height: 100,
      paddingInline: 48,
      lineHeight: '64px',
      backgroundColor: '#525252ff',
    };
    const contentStyle = {
      textAlign: 'center',
      fontSize: '24px',
      minHeight: 120,
      lineHeight: '32px',
      color: '#000000ff',
      backgroundColor: '#939393ff',
    };
    const siderStyle = {
      textAlign: 'center',
      lineHeight: '16px',
      fontSize: '16px',
      color: '#000000ff',
      backgroundColor: '#525252ff',
    };
    const footerStyle = {
      textAlign: 'center',
      color: '#000000ff',
      backgroundColor: '#c9c9c9ff',
    };
    const layoutStyle = {
      borderRadius: 8,
      overflow: 'hidden',
    };
    //Table setup=============================
    const columns = [
      {
        title: 'M',
        dataIndex: 'M',
        render: text => <a>{text}</a>,
      },
      {
        title: 'WS',
        dataIndex: 'WS',
      },
      {
        title: 'BS',
        dataIndex: 'BS',
      },
      {
        title: 'S',
        dataIndex: 'S',
      },
      {
        title: 'T',
        dataIndex: 'T',
      },
      {
        title: 'W',
        dataIndex: 'W',
      },
      {
        title: 'I',
        dataIndex: 'I',
      },
      {
        title: 'A',
        dataIndex: 'A',
      },
      {
        title: 'LD',
        dataIndex: 'LD',
      },
      {
        title: 'CL',
        dataIndex: 'CL',
      },
      {
        title: 'WP',
        dataIndex: 'WP',
      },
      {
        title: 'IN',
        dataIndex: 'IN',
      },
      {
        title: 'SAV',
        dataIndex: 'SAV',
      },
      {
        title: 'INV',
        dataIndex: 'INV',
      },
    ];
    const data = [];
    //army preferences == separate state variables because there is no scalability to this.
    const [a_army, seta_army] = useState([])
    const [a_unit, seta_unit] = useState([])
    const [d_army, setd_army] = useState([])
    const [d_unit, setd_unit] = useState([])
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
            <Space direction = "horizontal">
              <Space direction = "vertical">
              <b>Army Selection</b>
              <Space wrap>
              <Select
                defaultValue="Attacking Army"
                style={{ width: 200 }}
                onChange={(e) => seta_army(e.value)}
                options={[
                  { value: "DarkAngels", label: 'I Dark Angels' },
                  { value: "EmperorsChildren", label: 'III Emperor\'s Children' },
                  { value: "IronWarriors", label: 'IV Iron Warriors' },
                  { value: "WhiteScars", label: 'V White Scars'},
                  { value: "SpaceWolves", label: 'VI Space Wolves'},
                  { value: "ImperialFists", label: 'VII Imperial Fists'},
                  { value: "NightLords", label: 'VIII Night Lords'},
                  { value: "Blood Angels", label: 'IX Blood Angels'},
                  { value: "IronHands", label: 'X Iron Hands'},
                  { value: "WorldEaters", label: 'XII World Eaters'},
                  { value: "Ultramarines", label: 'XIII Ultramarines'},
                  { value: "DeathGuard", label: 'XIV Death Guard'},
                  { value: "ThousandSons", label: 'XV Thousand Sons'},
                  { value: "SonsofHorus", label: 'XVI Sons of Horus'},
                  { value: "WordBearers", label: 'XVII Word Bearers'},
                  { value: "Salamanders", label: 'XVIII Salamanders'},
                  { value: "RavenGuard", label: 'XIX Raven Guard'},
                  { value: "AlphaLegion", label: 'XX Alpha Legion'},
                  { value: "Custodes", label: 'Legio Custodes'},
                  { value: "SolarAuxilia", label: 'Solar Auxilia'},
                  { value: "Mechanicum", label: 'Mechanicum'}
                ]}
              />
              <Select
                defaultValue="Defending Army"
                style={{ width: 200 }}
                onChange={(e) => setd_army(e.value)}
                options={[
                  { value: "DarkAngels", label: 'I Dark Angels' },
                  { value: "EmperorsChildren", label: 'III Emperor\'s Children' },
                  { value: "IronWarriors", label: 'IV Iron Warriors' },
                  { value: "WhiteScars", label: 'V White Scars'},
                  { value: "SpaceWolves", label: 'VI Space Wolves'},
                  { value: "ImperialFists", label: 'VII Imperial Fists'},
                  { value: "NightLords", label: 'VIII Night Lords'},
                  { value: "Blood Angels", label: 'IX Blood Angels'},
                  { value: "IronHands", label: 'X Iron Hands'},
                  { value: "WorldEaters", label: 'XII World Eaters'},
                  { value: "Ultramarines", label: 'XIII Ultramarines'},
                  { value: "DeathGuard", label: 'XIV Death Guard'},
                  { value: "ThousandSons", label: 'XV Thousand Sons'},
                  { value: "SonsofHorus", label: 'XVI Sons of Horus'},
                  { value: "WordBearers", label: 'XVII Word Bearers'},
                  { value: "Salamanders", label: 'XVIII Salamanders'},
                  { value: "RavenGuard", label: 'XIX Raven Guard'},
                  { value: "AlphaLegion", label: 'XX Alpha Legion'},
                  { value: "Custodes", label: 'Legio Custodes'},
                  { value: "SolarAuxilia", label: 'Solar Auxilia'},
                  { value: "Mechanicum", label: 'Mechanicum'}
                ]}
              />
              </Space>
              <b>Unit Selection</b>
              <Space wrap>
              <Select
                defaultValue="Attacking Unit"
                style={{ width: 200 }}
                onChange={(e) => seta_unit(e.value)}
                options={[
                  
                ]}
              />
              <Select
                defaultValue="Defending Unit"
                style={{ width: 200 }}
                onChange={(e) => setd_unit(e.value)}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
              </Space>
              <b>Weapon Selection and Amount</b>
              <Space wrap>
              <Select
                defaultValue="Weapon 1"
                style={{ width: 200 }}
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
              <Input type="number" style = {{width: 48}} placeholder="0"/>:
              <Select
                defaultValue="Weapon 2"
                style={{ width: 200 }}
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
              <Input type="number" style = {{width: 48}} placeholder="0"/>
              </Space>
            </Space>

            </Space>
            <Space direction = "vertical">
              <b>Status Effects</b>
              <Space>
                <Checkbox onChange={onChange}>6+ Cover</Checkbox>
                <Checkbox onChange={onChange}>5+ Cover</Checkbox>
                <Checkbox onChange={onChange}>Supressed</Checkbox>
                <Checkbox onChange={onChange}>Routed</Checkbox>
              </Space>
              <Space>
                <Select
                defaultValue = "Attack Type"
                style={{ width: 200 }}
                onChange={handleChange}
                options={[
                  { value: 'Shooting', label: 'Shooting' },
                  { value: 'Fighting', label: 'Fighting' },
                  { value: 'Gambit', label: 'Gambit', disabled: true}
                ]}
              />
              </Space>
              
              <Space direction = "horizontal">
                <Button type="primary"><b>Generate</b></Button>
              <Button type="primary" danger><b>Reset</b></Button>
              </Space>
            </Space>
            
          </Content>
            </Layout>
              <Footer style={footerStyle}>
                <Space direction = "horizontal">
              <Space direction = "vertical">
              <b>Attacking Unit</b>
              <Table
              columns={columns}
              dataSource={data}
            />
            </Space>
            <Space direction = "vertical">
              <b>Defending Unit</b>
              <Table
              columns={columns}
              dataSource={data}
            />
            </Space>

            </Space></Footer>
            </Layout>
        </Flex>
    );
}