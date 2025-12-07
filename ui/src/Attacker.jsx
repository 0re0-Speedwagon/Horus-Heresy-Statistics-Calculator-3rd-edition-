import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Checkbox } from 'antd';

export default function AttackerInput({ API_URL, onAttackerSet }) {
    const [amodels, setAmodels] = useState(0);
    const [attacks, setAttacks] = useState(0);
    const [skill, setSkill] = useState(0);
    const [S, setS] = useState(0);
    const [AP, setAP] = useState(0);
    const [D, setD] = useState(0);
    const [crit, setCrit] = useState(0);
    const [snap, setSnap] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(`${API_URL}/calculate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amodels, attacks, skill, S, AP, D, crit, snap }),
        });

        if (response.ok) {
            setAmodels(0);
            setAttacks(0);
            setSkill(0);
            setS(0);
            setAP(0);
            setD(0);
            setCrit(0);
            setSnap(false);
            onAttackerSet();
        }
    }

    const inStyle = {
      width: 100
  };

    return (
        <Form name="attacker"
            style={{ maxWidth: 600,}}
            layout="inline"
            wrap="flex">
              <Form.Item label="Models:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         value={amodels}
                         onChange={(e) => setAmodels(e.target.value)}
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item label="Attacks:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         value={attacks}
                         onChange={(e) => setAttacks(e.target.value)}
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item label="BS/WS:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         value={skill}
                         onChange={(e) => setSkill(e.target.value)}
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={2}
                             step={1}/>
              </Form.Item>
              <Form.Item label="Strength:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         value={S}
                         onChange={(e) => setS(e.target.value)}
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item label="AP:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         value={AP}
                         onChange={(e) => setAP(e.target.value)}
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item label="Damage:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         value={D}
                         onChange={(e) => setD(e.target.value)}
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item valuePropName="checked"
                         label= "Firing Snapshots:"
                         value={snap}
                         onChange={(e) => setSnap(e.target.value)}
                         style={{ width: 120 }}>
                <Checkbox style={{ size: "large"}}></Checkbox>
              </Form.Item>
              <Button type="submit" onClick={handleSubmit}>
                Set Attacker
            </Button>
        </Form>
    );
}
