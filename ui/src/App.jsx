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
import AttackerInput from "./Attacker";
import DefenderInput from "./Defender";
const { Header, Footer, Sider, Content } = Layout;

export default function App() {
  
const [offInput, setOffInput] = useState({
  amodels: null,
  attacks: null,
  skill: null,
  S: null,
  AP: null,
  D: null,
  crit: null,
  snap: null
});
const [defInput, setDefInput] = useState({
  dmodels: null,
  T: null,
  W: null,
  sav: null,
  inv: null,
  fnp: null,
  vehicle: null
});
const [result, setResult] = useState({
  hcount: null,
  ccount: null,
  wcount: null,
  scount: null,
  cscount: null,
  fnpcount: null,
  damage: null,
  ukilled: null,
  modleft: null
});

const bws = (attacker) => {
  // Regular shooting (not Snap Shot)
  if (!attacker.snap) {
    if (attacker.skill < 6) {
      return 7 - attacker.skill;           // e.g. 3+ → 4, 2+ → 5
    } else if (attacker.skill < 10) {
      attacker.crit = 12 - attacker.skill; // mutates the object like Python does
      return 2;
    } else {
      return 1;                            // 10+ skill = auto-hit on 1+
    }
  }

  // Snap Shot rules
  if (attacker.skill === 2 || attacker.skill === 3) return 6;
  if (attacker.skill === 4 || attacker.skill === 5) return 5;
  if (attacker.skill >= 6 && attacker.skill <= 8) return 4;
  if (attacker.skill === 9) return 3;
  return 2; // 10+ skill with Snap Shot
}

const wounding = (attacker, defender) => {
  if (!defender.vehicle) {
    const diff = attacker.S - defender.T;
    if (diff <= -4) return 7;
    else if (diff <= -2) return 6;
    else if (diff === -1) return 5;
    else if (diff === 0) return 4;
    else if (diff === 1) return 3;
    else return 2;  // diff >= 2
  } 
  else {
    // Vehicle: T - S + 1, but never better than 2+
    return Math.max(2, defender.T - attacker.S + 1);
  }
}

const saving = (attacker, defender) => {
  if (attacker.AP > defender.sav) {
    return defender.sav;        // AP penetrates armor → use normal save
  } else {
    return defender.inv || 7;   // use invulnerable save (fallback to 7+ if missing)
  }
}

const d6 = () => { return Math.floor(Math.random() * 6) + 1; }
  //API URL
  const API_URL =
    import.meta.env.VITE_API_URL !== undefined
        ? import.meta.env.VITE_API_URL // address for production architecture
        : 'http://localhost:8000'; // address for local architecture

  async function handleSubmit(e) {
      e.preventDefault();
      let tattacks = offInput.amodels * offInput.attacks
      const hitarr = []
      for(let i = 0; i < tattacks; i++){
        hitarr[i] = d6()
      }
      console.log(hitarr, "this is our hit arr")
      for(let i = 0; i <= hitarr.length; i++){
        if (hitarr[i] >= bws(offInput)){
          if (hitarr[i] >= offInput.crit) result.ccount++
          else result.hcount++
        }
      }
      console.log(result.hcount, "hit count")
      console.log(result.ccount, "crit count")
      const woundarr = []
      for(let i = 0; i < result.hcount; i++){
        woundarr[i] = d6()
      }
      console.log(woundarr, "this is our wound arr")
      for(let i = 0; i <= woundarr.length; i++){
        if (woundarr[i] >= wounding(offInput, defInput)){
          result.wcount++
        }
      }
      console.log(result.wcount, "wound count")
      const regsavarr = []
      const critsavarr = []
      for(let i = 0; i < result.wcount; i++){
        regsavarr[i] = d6()
      }
      console.log(regsavarr, "this is our regular save arr")
      for(let i = 0; i < result.ccount; i++){
        critsavarr[i] = d6()
      }
      console.log(critsavarr, "this is our crit save arr")
      for(let i = 0; i <= regsavarr.length; i++){
        if (regsavarr[i] < saving(offInput, defInput)){
          result.scount++
        }
      }
      console.log(result.scount, "save count")
      for(let i = 0; i <= critsavarr.length; i++){
        if (critsavarr[i] < saving(offInput, defInput)){
          result.cscount++
        }
      }
      console.log(result.cscount, "crit save count")
      result.damage = (result.scount * offInput.D) + (result.cscount * (offInput.D + 1))
      console.log(result.damage, "damage count")
      const fnparr = []
      if(defInput.fnp != null){
        for(let i = 0; i < result.damage; i++){
          fnparr[i] = d6()
        }
      }
      console.log(critsavarr, "this is our fnp arr")
      for(let i = 0; i <= critsavarr.length; i++){
        if (fnparr[i] < defInput.fnp){
          result.fnpcount++
        }
      }
      console.log(result.fnpcount, "feel no pain count")
      const totalWounds = defInput.W * defInput.dmodels;  // total wound pool
      let remainingWounds = totalWounds - result.damage;

      if (remainingWounds <= 0) {
        // Whole unit is dead
        result.ukilled = defInput.dmodels;
      }
       else {
        // Some models survive (possibly wounded)
        const survivingModels = Math.ceil(remainingWounds / defInput.W);
        result.ukilled = defInput.dmodels - survivingModels;
      }
      console.log(result.ukilled, "units killed")
      console.log(remainingWounds, "remaining wounds")
      console.log(result, "final result")
    };



  //Change variables
    useEffect(() => {
      console.log(offInput)
      console.log(defInput)
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