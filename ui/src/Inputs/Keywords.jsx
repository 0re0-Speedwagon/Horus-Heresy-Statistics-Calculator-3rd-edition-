import React, { useState } from 'react';
import { Button, Form, InputNumber, Checkbox, message, Radio } from 'antd';

export default function KeywordsInput({ onFinish, onPhaseChange }) {
    const [snap, setSnap] = useState(false);
    const [armourbane, setArmourbane] = useState(false);
    const [breaching, setBreaching] = useState(0);
    const [crithits, setCritHits] = useState(0);
    const [rending, setRending] = useState(0);
    const [shred, setShred] = useState(0);
    const [deflagrate, setDeflagrate] = useState(false);
    const [charge, setCharge] = useState(false);
    const [phase, setPhase] = useState(0);
    const [hatred, setHatred] = useState(false);
    const [prefEnemy, setPrefEnemy] = useState(false);

    const [rblow, setRBlow] = useState(0);
    const [skyfire, setSkyfire] = useState(false);
    
    const [messageApi, contextHolder] = message.useMessage();

    const inStyle = {
      width: 110
    };

    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'Attacker Keywords Submitted',
      });
    };

    const handlePhaseChange = (e) => {
        setPhase(e.target.value);
        onPhaseChange(e.target.value);   // send to parent
        console.log(breaching)
    };


    return (
        <>
        <Radio.Group name="phase" onChange={handlePhaseChange}>
                <Radio.Button value= "0">Shooting</Radio.Button>
                <Radio.Button value= "1">Melee</Radio.Button>
                <Radio.Button value= "2">Gambit</Radio.Button>
              </Radio.Group>

        <Form name="keywords"
            style={{ maxWidth: 600,}}
            onFinish={onFinish}
            layout="inline"
            wrap="flex">
              <Form.Item name="breaching"
                                     label="Breaching:"
                                     rules={[{ required: false }]}
                                     layout="vertical"
                                     style={ inStyle }
                                     >
                            <InputNumber stringMode={false}
                                         min={1}
                                         max={6}
                                         step={1}
                                         value={breaching}
                                         onChange={(value) => setBreaching(value)}/>
                          </Form.Item>
              <Form.Item name="crithits"
                                     label="Critical Hits:"
                                     rules={[{ required: false }]}
                                     layout="vertical"
                                     style={ inStyle }>
                            <InputNumber stringMode={false}
                                         min={1}
                                         max={6}
                                         step={1}
                                         value={crithits}
                                         onChange={(value) => setCritHits(value)}/>
                          </Form.Item>
              <Form.Item name="rending"
                                     label="Rending:"
                                     rules={[{ required: false }]}
                                     layout="vertical"
                                     style={ inStyle }>
                            <InputNumber stringMode={false}
                                         min={1}
                                         max={6}
                                         step={1}/>
                          </Form.Item>
                         <Form.Item name="shred"
                                     label="Shred:"
                                     rules={[{ required: false }]}
                                     layout="vertical"
                                     style={ inStyle }>
                            <InputNumber stringMode={false}
                                         min={1}
                                         max={6}
                                         step={1}/>
                          </Form.Item>
                { phase=== "1" && <Form.Item name="rblow"
                                       label="Reaping Blow:"
                                       rules={[{ required: false }]}
                                       layout="vertical"
                                       style={ inStyle }>
                              <InputNumber stringMode={false}
                                           min={1}
                                           max={6}
                                           step={1}
                                           value={rblow}
                                           onChange={(value) => setRBlow(value)}/>
                            </Form.Item>}
                { phase=== "0" && <Form.Item name = "snap"
                         valuePropName="checked"
                         initialValue={false}
                         label= "Snapshots:"
                         style={{ width: 120 }}>
                <Checkbox style={{ size: "large"}}></Checkbox>
              </Form.Item>}
              <Form.Item name = "armourbane"
                         valuePropName="checked"
                         initialValue={false}
                         label= "Armourbane:"
                         style={{ width: 120 }}>
                <Checkbox style={{ size: "large"}}></Checkbox>
              </Form.Item>
              <Form.Item name = "deflagrate"
                         valuePropName="checked"
                         initialValue={false}
                         label= "Deflagrate:"
                         style={{ width: 120 }}>
                <Checkbox style={{ size: "large"}}></Checkbox>
              </Form.Item>
              { (phase === "1" || phase === "2") && <Form.Item name = "charge"
                         valuePropName="checked"
                         initialValue={false}
                         label= "Charging:"
                         style={{ width: 120 }}>
                <Checkbox style={{ size: "large"}}></Checkbox>
              </Form.Item>}
              { phase=== "1" && <Form.Item name = "hatred"
                         valuePropName="checked"
                         initialValue={false}
                         label= "Hatred:"
                         style={{ width: 120 }}>
                <Checkbox style={{ size: "large"}}></Checkbox>
              </Form.Item>}
              <Form.Item name = "prefEnemy"
                         valuePropName="checked"
                         initialValue={false}
                         label= "Pref Enemy:"
                         style={{ width: 120 }}>
                <Checkbox style={{ size: "large"}}></Checkbox>
              </Form.Item>
              { phase === "0" && <Form.Item name = "skyfire"
                         valuePropName="checked"
                         initialValue={false}
                         label= "Skyfire:"
                         style={{ width: 120 }}>
                <Checkbox style={{ size: "large"}}></Checkbox>
              </Form.Item>}
              {contextHolder}
              <Button type="primary" htmlType="submit" onClick={success}>
                Set Keywords
            </Button>
        </Form>
        </>        
    );
}