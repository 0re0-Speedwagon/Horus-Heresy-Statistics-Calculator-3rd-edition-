import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Checkbox } from 'antd';

export default function DefenderInput({ API_URL, onDefenderSet }) {
    const [dmodels, setDmodels] = useState(0);
    const [T, setT] = useState(0);
    const [W, setW] = useState(0);
    const [sav, setSav] = useState(0);
    const [inv, setInv] = useState(0);
    const [fnp, setFnp] = useState(0);
    const [vehicle, setVehicle] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(`${API_URL}/calculate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dmodels, T, W, sav, inv, fnp, vehicle }),
        });

        if (response.ok) {
            setDmodels(0);
            setT(0);
            setW(0);
            setSav(0);
            setInv(0);
            setFnp(0);
            setVehicle(false);
            onDefenderSet();
        }
    }

    const inStyle = {
      width: 100
  };

    return (
        <Form name="defender"
              style={{ maxWidth: 600,}}
              layout="inline"
              wrap="flex">
            <Form.Item label="Models:"
                       rules={[{ required: true }]}
                       layout="vertical"
                       value={dmodels}
                       onChange={(e) => setDmodels(e.target.value)}
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item label="Toughness:"
                       rules={[{ required: true }]}
                       layout="vertical"
                       value={T}
                       onChange={(e) => setT(e.target.value)}
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item label="Wounds:"
                       rules={[{ required: true }]}
                       layout="vertical"
                       value={W}
                       onChange={(e) => setW(e.target.value)}
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item label="Save:"
                       rules={[{ required: true }]}
                       layout="vertical"
                       value={sav}
                       onChange={(e) => setSav(e.target.value)}
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item label="Invulnerable:"
                       rules={[{ required: false }]}
                       layout="vertical"
                       value={inv}
                       onChange={(e) => setInv(e.target.value)}
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item label="Feel no pain:"
                       rules={[{ required: false }]}
                       layout="vertical"
                       value={fnp}
                       onChange={(e) => setFnp(e.target.value)}
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item valuePropName="checked"
                       label= "Vehicle:"
                       value={vehicle}
                       onChange={(e) => setVehicle(e.target.value)}
                       style={ inStyle }>
              <Checkbox style={{ size: "large"}}></Checkbox>
            </Form.Item>
            <Button type="submit" onClick={handleSubmit}>
                Set Defender
            </Button>
        </Form>
    );
}
