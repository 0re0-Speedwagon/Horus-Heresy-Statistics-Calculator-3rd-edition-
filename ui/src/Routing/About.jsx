import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Flex,
         Layout,
         Typography,
         Button,
         Drawer} from 'antd';
import '../App.css';
import { MoreOutlined } from '@ant-design/icons';

export default function About() {

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
      backgroundColor: 'rgb(113, 113, 113)',
      border: '5px solid black',
    };

    //Content
    const contentStyle = {
      textAlign: 'center',
      fontSize: '16px',
      minHeight: 100,
      lineHeight: 1.25,    
      color: '#000000ff',
      backgroundColor: '#939393ff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',  
      minWidth: '500px',
      padding: '32px',           
      boxSizing: 'border-box',
      flexDirection: "column"
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
                    }}>Warhammer: 30k Statistics Calculator</h4>
                </Header>
                <Content style={contentStyle}>
                    <div>
                        <h2 style={{ 
                          margin: 40, 
                          whiteSpace: "nowrap", 
                          textOverflow: "ellipsis", 
                          overflow: "hidden" 
                        }}>About the Developer</h2>
                    </div>
                    <div>
                        <p>
                            Hello! I am OREO_Speedwagon! This project is for my Computer Science senior capstone and was created from my enjoyment
                            of the Horus Heresy. I have been playing 40k for four years and 30k for three. I started off with Imperial Guard at the
                            tail end of 9th edition and when the Legio Astartes Battle Group box came out I moved over to Iron Warriors. It has always irked me that there has
                            never been a propper calculator for 30k like there has been for 40k and AoS. Is it perfect? No not at all. I would barely
                            classify it as good. If you find a bug or want something added to improve the experience please leave a note on the git
                            repository or email me using the gmail below!
                        </p> 
                        <br />
                        <p>The following has not been implemented propperly yet: bulky, rending, shred, shrouded, flier, skyfire, deflagrate, palette preferences,
                            removal of setting buttons for inputs, and saving preferences when leaving the site.
                        </p>
                    </div>
                    <ul>
                        <li>
                            <Typography.Link href="mailto:Mw3Rodgers@gmail.com">
                                  Gmail(Mw3Rodgers@gmail.com)
                            </Typography.Link>
                        </li>
                        <li>
                            <Typography.Link href="https://github.com/0re0-Speedwagon/Horus-Heresy-Statistics-Calculator-3rd-edition-/issues?q=is%3Aissue%20state%3Aopen">
                                  Git Repository Issues
                            </Typography.Link>
                        </li>
                    </ul>
                </Content>
                <Content style={contentStyle}></Content>
                <Content style={contentStyle}></Content>
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