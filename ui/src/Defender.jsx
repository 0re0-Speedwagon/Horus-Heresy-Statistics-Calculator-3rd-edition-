import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Checkbox } from 'antd';

export default function DefenderInput({ onFinish, phase }) {
    const [dmodels, setDmodels] = useState(0);
    const [skill, setSkill] = useState(0);
    const [T, setT] = useState(0);
    const [W, setW] = useState(0);
    const [sav, setSav] = useState(0);
    const [inv, setInv] = useState(0);
    const [fnp, setFnp] = useState(0);
    const [vehicle, setVehicle] = useState(false);
    const [flier, setFlier] = useState(false);
    const [ewarrior, setEWarrior] = useState(0);
    const [shroud, setShrould] = useState(false);
    const [dbulky, setDBulky] = useState(0);

    const inStyle = {
      width: 140
  };

    return (
        <Form name="defender"
              style={{ maxWidth: 600,}}
              onFinish={onFinish}
              layout="inline"
              wrap="flex">
            <Form.Item name="dmodels"
                       label="Models:"
                       rules={[{ required: true }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           max={40}
                           step={1}/>
            </Form.Item>
            { (phase === "1" || phase === "2") && <Form.Item name="skill"
                       label="WS:"
                       layout="vertical"
                       style={ inStyle }
                       rules={[{ required: true }]}>
              <InputNumber stringMode={false}
                           min={1}
                           max={10}
                           step={1}/>
            </Form.Item>}
            <Form.Item name="T"
                       label={vehicle ? "AV:" : "Toughness:"}
                       rules={[{ required: true }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           max={14}
                           step={1}/>
            </Form.Item>
            <Form.Item name="W"
                       label={vehicle ? "HP:" : "Wounds:"}
                       rules={[{ required: true }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           max={20}
                           step={1}/>
            </Form.Item>
            <Form.Item name="sav"
                       label="Save:"
                       rules={[{ required: true }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           max={7}
                           step={1}/>
            </Form.Item>
            <Form.Item name="inv"
                       label="Invulnerable:"
                       rules={[{ required: false }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           max={6}
                           step={1}/>
            </Form.Item>
            <Form.Item name="fnp"
                       label="Feel no pain:"
                       rules={[{ required: false }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           max={6}
                           step={1}/>
            </Form.Item>
            <Form.Item name="ewarrior"
                       label="Eternal Warrior:"
                       rules={[{ required: false }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           max={6}
                           step={1}
                           value={ewarrior}
                           onChange={(value) => setEWarrior(value)}/>
            </Form.Item>
            { phase=== "0" && <Form.Item name="shroud"
                       label="Shrouded:"
                       rules={[{ required: false }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           max={6}
                           step={1}/>
            </Form.Item>}
            { phase === "1" && <Form.Item name = "dbulky"
                                     label="Bulky:"
                                     layout="vertical"
                                     style={ inStyle }>
                            <InputNumber stringMode={false}
                                         min={1}
                                         max={12}
                                         step={1}/>
                          </Form.Item>}
            <Form.Item name="vehicle"
                       layout="vertical"
                       valuePropName="checked"
                       initialValue={false}
                       label= "Vehicle:"
                       style={{ width: 60 }}>
              <Checkbox style={{ size: "large"}}
                        onChange={(e) => setVehicle(e.target.checked)}/>
            </Form.Item>
            <Form.Item name="flier"
                       layout="vertical"
                       valuePropName="checked"
                       initialValue={false}
                       label= "Flier:"
                       style={{ width: 60 }}>
              <Checkbox style={{ size: "large"}}
                        onChange={(e) => {
                          setVehicle(e.target.checked);
                          setFlier(e.target.checked);
                        }}/>
            </Form.Item>
            <Button type="primary"
                    htmlType="submit"
                    >
                Set Defender
            </Button>
        </Form>
    );
}
