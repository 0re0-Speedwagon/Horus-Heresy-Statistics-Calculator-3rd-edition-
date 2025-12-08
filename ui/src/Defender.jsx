import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Checkbox } from 'antd';

export default function DefenderInput({ onFinish }) {
    const [dmodels, setDmodels] = useState(0);
    const [T, setT] = useState(0);
    const [W, setW] = useState(0);
    const [sav, setSav] = useState(0);
    const [inv, setInv] = useState(0);
    const [fnp, setFnp] = useState(0);
    const [vehicle, setVehicle] = useState(false);

    const inStyle = {
      width: 100
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
                           step={1}/>
            </Form.Item>
            <Form.Item name="T"
                       label="Toughness:"
                       rules={[{ required: true }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item name="W"
                       label="Wounds:"
                       rules={[{ required: true }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item name="sav"
                       label="Save:"
                       rules={[{ required: true }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item name="inv"
                       label="Invulnerable:"
                       rules={[{ required: false }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item name="fnp"
                       label="Feel no pain:"
                       rules={[{ required: false }]}
                       layout="vertical"
                       style={ inStyle }>
              <InputNumber stringMode={false}
                           min={1}
                           step={1}/>
            </Form.Item>
            <Form.Item name="vehicle"
                       layout="vertical"
                       valuePropName="checked"
                       initialValue={false}
                       label= "Vehicle:"
                       style={{ width: 60 }}>
              <Checkbox style={{ size: "large"}}></Checkbox>
            </Form.Item>
            <Button type="primary"
                    htmlType="submit"
                    >
                Set Defender
            </Button>
        </Form>
    );
}
