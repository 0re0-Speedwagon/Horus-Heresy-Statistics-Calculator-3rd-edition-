import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Checkbox } from 'antd';

export default function AttackerInput({ onFinish }) {
    const [amodels, setAmodels] = useState(0);
    const [attacks, setAttacks] = useState(0);
    const [skill, setSkill] = useState(0);
    const [S, setS] = useState(0);
    const [AP, setAP] = useState(0);
    const [D, setD] = useState(0);
    const [crit, setCrit] = useState(0);
    const [snap, setSnap] = useState(false);

    const inStyle = {
      width: 125
    };

    return (
        <Form name="attacker"
            style={{ maxWidth: 600,}}
            onFinish={onFinish}
            layout="inline"
            wrap="flex">
              <Form.Item name = "amodels"
                         label="Models:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item name = "attacks"
                         label="Attacks/Model:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item name = "skill"
                         label="BS/WS:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={2}
                             step={1}/>
              </Form.Item>
              <Form.Item name = "S"
                         label="Strength:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item name = "AP"
                         label="AP:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item name = "D"
                         label="Damage:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             step={1}/>
              </Form.Item>
              <Form.Item name = "snap"
                         valuePropName="checked"
                         initialValue={false}
                         label= "Firing Snapshots:"
                         style={{ width: 120 }}>
                <Checkbox style={{ size: "large"}}></Checkbox>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Set Attacker
            </Button>
        </Form>
    );
}
