import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Flex,
         Layout,
         Card,
         Button,
         Drawer} from 'antd';
import '../App.css';
import { MoreOutlined } from '@ant-design/icons';

export default function Info() {

    const { Header, Footer, Content } = Layout;

    const [open, setOpen] = useState(false);
    
    //==========================
    //Drawer
    //==========================
    const showDrawer = () => {
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
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

    //Button Styling
    const bStyle = {
        size:'large',
    };

    return(
        <Flex gap="middle" wrap>
            <Layout style={layoutStyle}>
                <Drawer
                    title="Extra Content"
                    className="custom-drawer"
                    closable={{ placement: 'start' }}
                    onClose={onClose}
                    open={open}
                    color="525252ff"
                    styles={{
                      header: { fontSize: 24 },
                      body: { fontSize: 18 }
                    }}
                > 
                    <ul>
                        <li>
                          <Link to="/">Calculator</Link>
                        </li>
                        <li>
                          <Link to="/Statistics">The Math behind 30k</Link>
                        </li>
                        <li>
                          <Link to="/About">About the Dev</Link>
                        </li>
                    </ul>
                </Drawer>
                <Header style={headerStyle} className="app-header">
                    <Button ghost onClick={showDrawer} className="drawer-button">
                      <MoreOutlined />
                    </Button>
                    <h4 style={{ 
                      margin: 40, 
                      whiteSpace: "nowrap", 
                      textOverflow: "ellipsis", 
                      overflow: "hidden" 
                    }}>Warhammer: The Horus Heresy 3.0 Statistics Calculator</h4>
                </Header>
                <Content style={contentStyle}>
                    <p>weenis</p>
                </Content>
                <Footer style={footerStyle}>
                <i style={{ fontSize: '12px' }}>
                  This tool is an unofficial fan-made probability calculator and is not affiliated with or endorsed by Games Workshop Group PLC.
Warhammer: The Horus Heresy and all associated trademarks are the property of Games Workshop.
All calculations are based on publicly known game mechanics and are intended for educational and gameplay assistance purposes only.

                </i>
              </Footer>
            </Layout>
        </Flex>
    );
}