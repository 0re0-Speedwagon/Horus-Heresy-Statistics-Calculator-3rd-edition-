import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Flex,
         Layout,
         Typography,
         Button,
         Drawer,
         Card,
         Space} from 'antd';
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
      backgroundColor: '#525252ff',
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

    //Card Styling
const cStyle = {
  background: 'transparent',
  border: '3px solid black',
  justifyContent: 'center',
  align: 'center',
  margin: '5px',
  minWidth: '130px',
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
                        }}>The Basics of Statistics</h2>
                    </div>
                    <div>
                      <Space direction="horizontal" size="middle">
                        <Card title = "Probability"
                      style={ cStyle }>
                        <p>
                            Warhammer in all games are D6 games. This means that there are 6 outcomes whenever you roll a die, thus an equal 1/6 chance that
                            you will roll a specific number between 1 and 6. With this knowledge, you would think that a 4+ would mean that you have a 50%
                            chance to roll a number between 4 and 6. That 50% is the probability, and is calculated by taking the successful rolls, and dividing
                            them by the total outcomes. 
                        </p> 
                        <math xmlns="http://www.w3.org/1998/Math/MathML">
                            <mfrac>
                              <mrow>
                                <mo mathvariant="italic">[</mo>
                                <mn mathvariant="italic">4</mn>
                                <mo mathvariant="italic">+</mo>
                                <mn mathvariant="italic">5</mn>
                                <mo mathvariant="italic">+</mo>
                                <mn mathvariant="italic">6</mn>
                                <mo mathvariant="italic">]</mo>
                              </mrow>
                              <mrow>
                                <mo mathvariant="italic">[</mo>
                                <mn mathvariant="italic">1</mn>
                                <mo mathvariant="italic">+</mo>
                                <mn mathvariant="italic">2</mn>
                                <mo mathvariant="italic">+</mo>
                                <mn mathvariant="italic">3</mn>
                                <mo mathvariant="italic">+</mo>
                                <mn mathvariant="italic">4</mn>
                                <mo mathvariant="italic">+</mo>
                                <mn mathvariant="italic">5</mn>
                                <mo mathvariant="italic">+</mo>
                                <mn mathvariant="italic">6</mn>
                                <mo mathvariant="italic">]</mo>
                              </mrow>
                            </mfrac>
                            <mo mathvariant="italic">=</mo>
                            <mn mathvariant="italic">0.5</mn>
                            <mo mathvariant="italic">=</mo>
                            <mn mathvariant="italic">50</mn>
                            <mo mathvariant="italic">%</mo>
                        </math>
                      </Card>
                      <Card title = "Average"
                        style={ cStyle }>
                          <p>
                            Sometimes when rolling a die, you want to know what the average value is going to be as that can affect how you play. This value is
                            typically called "expected value" or <i>E</i> and is calculated via taking the sum of all possible outcomes and dividing it by the
                            number of outcomes. A surprise to many, but the expected value of a D6 is not 3, but instead 3.5. An extension to this is rolling 2D6,
                            where the expected value is 7 as you can simply add two expected values together to get the total expected value or run the math yourself!
                          </p>
                          <math xmlns="http://www.w3.org/1998/Math/MathML">
                            <mfrac>
                              <mrow>
                                <mo mathvariant="italic">[</mo>
                                <mrow>
                                  <mn mathvariant="italic">1</mn>
                                  <mo mathvariant="italic">+</mo>
                                  <mn mathvariant="italic">2</mn>
                                  <mo mathvariant="italic">+</mo>
                                  <mn mathvariant="italic">3</mn>
                                  <mo mathvariant="italic">+</mo>
                                  <mn mathvariant="italic">4</mn>
                                  <mo mathvariant="italic">+</mo>
                                  <mn mathvariant="italic">5</mn>
                                  <mo mathvariant="italic">+</mo>
                                  <mn mathvariant="italic">6</mn>
                                </mrow>
                                <mo mathvariant="italic">]</mo>
                              </mrow>
                              <mn mathvariant="italic">6</mn>
                            </mfrac>
                            <mo mathvariant="italic">=</mo>
                            <mn mathvariant="italic">3.5</mn>
                          </math>
                      </Card>
                      <Card title = "The Difference"
                        style={ cStyle }>
                          <p>
                            These two data points come together to tell you how good a roll is. It may sound simple but knowing that a 5+ is a 33.3% chance
                            will help you a lot when it comes to doing quick math in your head, because now that you know that only one third of your rolls
                            are most likely going to make it through you can start plotting out the rest of the rolls, optimising, seeing what goes best into
                            what under specific circumstances. Knowing the expected roll helps you when you have to roll a sum such as a leadership test, knowing
                            who to buff or which character should go with which squad can be the difference between losing a squad and keeping them in the fight. 
                          </p> 
                      </Card>
                      </Space>
                    </div>
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