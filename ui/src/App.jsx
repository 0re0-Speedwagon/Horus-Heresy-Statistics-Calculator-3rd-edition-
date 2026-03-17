import React, {useState, useEffect} from "react";
import { Flex,
         Layout,
         Card,
         Button,} from 'antd';
import AttackerInput from "./Attacker";
import DefenderInput from "./Defender";
import KeywordsInput from "./Keywords";
import { Column } from '@ant-design/plots';

const { Header, Footer, Sider, Content } = Layout;

export default function App() {
  
const [offInput, setOffInput] = useState({});
const [defInput, setDefInput] = useState({});
const [kwords, setKwords] = useState({});
const [results, setResults] = useState([]);
const [phase, setPhase] = useState("0");

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
    //Graphs
    //==========================

  // Build frequency table for hcount
const hcountData = React.useMemo(() => {
  const freq = {};
  results.forEach(r => {
    const h = r.hcount ?? 0;
    freq[h] = (freq[h] || 0) + 1;
  });

  return Object.entries(freq).map(([hcount, count]) => ({
    hcount,
    count,
  }));
}, [results]);

const hcountConfig = {
  data: hcountData,
  xField: 'hcount',
  yField: 'count',
  seriesField: 'count',
  style: {
    fill: "#0026ff"
  },
  label: {
    style: { fill: '#FFFFFF', opacity: 0.8 },
  },
  xAxis: {
    title: { text: 'Hit Count (hcount)' },
  },
  yAxis: {
    title: { text: 'Frequency' },
  },
  columnStyle: {
    fill: '#69c0ff',
    stroke: '#0050b3',
    lineWidth: 2,
    tickAlign: 'center',
  },
  tooltip: {
    showMarkers: false,
  },
  interactions: [{ type: 'active-region' }],
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
                  <b>Hit Count Distribution</b>

                  {results.length > 0 && (
                    <div style={{ width: '700px', margin: '20px auto' }}>
                      <Column {...hcountConfig} />
                    </div>
                  )}
                </Footer>
            </Layout>
        </Flex>
    );
}