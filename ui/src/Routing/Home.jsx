import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Flex,
         Layout,
         Card,
         Button,
         Drawer} from 'antd';
import '../App.css';
import { MoreOutlined } from '@ant-design/icons';

import AttackerInput from "../Inputs/Attacker";
import DefenderInput from "../Inputs/Defender";
import KeywordsInput from "../Inputs/Keywords";

import HitGraph from "../Graphs/Hits";
import CritHitGraph from "../Graphs/Critical Hits";
import WoundGraph from "../Graphs/Wounds";
import BreachWoundGraph from "../Graphs/Breaching Wounds";
import SaveGraph from "../Graphs/Saves";
import CritSaveGraph from "../Graphs/Critical Saves";
import FeelNoPainGraph from "../Graphs/FNP";
import DamageGraph from "../Graphs/Damage";
import UnitKilledGraph from "../Graphs/Units Killed";

export default function Home() {

const { Header, Footer, Content } = Layout;

const [offInput, setOffInput] = useState({});
const [defInput, setDefInput] = useState({});
const [kwords, setKwords] = useState({});
const [results, setResults] = useState([]);
const [phase, setPhase] = useState("0");
const [open, setOpen] = useState(false);
//there's a good use of UseEffect here

//API URL
const API_URL =
  import.meta.env.VITE_API_URL !== undefined
      ? import.meta.env.VITE_API_URL // address for production architecture
      : 'http://localhost:8000'; // address for local architecture

async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offInput, defInput, kwords }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();  //Parse response
    console.log(data);
    setResults(data);                     //Save it to state
};

//Change variables
useEffect(() => {
}, [offInput, defInput, kwords]);

//Attacker object
function onAFinish(input) {
  setOffInput(input)
};

//Defender object
function onDFinish(input) {
  setDefInput(input)
};

//Keywords object
function onKFinish(input){
  setKwords(input)
};

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
  backgroundColor: '#3D4B4D',
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

//========================RETURN========================

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
          margin: 20, 
          whiteSpace: "nowrap", 
          textOverflow: "ellipsis", 
          overflow: "hidden" 
        }}>Warhammer: 30k Statistics Calculator</h4>
        </Header>
        <Layout>

          <Content style={contentStyle}>
            <Card title = "Attacking Unit"
                  style={ cStyle }>
              <AttackerInput
                  onFinish={onAFinish}
                  phase={phase}
              />{' '}
            </Card>

            <Card title = "Attacker keywords"
                  style={ cStyle }>
              <KeywordsInput
                  onFinish={onKFinish}
                  onPhaseChange={setPhase}
              />{' '}
            </Card>

            <Card title = "Defending Unit"
                  style={ cStyle }>
                <DefenderInput
                  onFinish={onDFinish}
                  phase={phase}
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
                  {results.length > 0 && (
                    <div className="graph-grid">
                      <div className="graph-item">
                        <b>Hit Distribution</b>
                        <HitGraph data={results} />
                      </div>

                      <div className="graph-item">
                        <b>Critical Hit Distribution</b>
                        <CritHitGraph data={results} />
                      </div>

                      <div className="graph-item">
                        <b>Wound Distribution</b>
                        <WoundGraph data={results} />
                      </div>
                      
                      <div className="graph-item">
                        <b>Breaching Distribution</b>
                        <BreachWoundGraph data={results} />
                      </div>

                      <div className="graph-item">
                        <b>Save Distribution</b>
                        <SaveGraph data={results} />
                      </div>

                      <div className="graph-item">
                        <b>Critical Save Distribution</b>
                        <CritSaveGraph data={results} />
                      </div>

                      <div className="graph-item">
                        <b>Feel No Pain Distribution</b>
                        <FeelNoPainGraph data={results} />
                      </div>

                      <div className="graph-item">
                        <b>Damage Distribution</b>
                        <DamageGraph data={results} />
                      </div>

                      <div className="graph-item">
                        <b>Units Killed Distribution</b>
                        <UnitKilledGraph data={results} />
                      </div>
                    </div>
                  )}
              </Footer>
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