import React, { useState } from 'react';
import { Button, Form, InputNumber, message} from 'antd';


export default function AttackerInput({ onFinish, phase }) {
    const [amodels, setAmodels] = useState(0);
    const [attacks, setAttacks] = useState(0);
    const [skill, setSkill] = useState(0);
    const [S, setS] = useState(0);
    const [AP, setAP] = useState(0);
    const [D, setD] = useState(0);
    const [crit, setCrit] = useState(0);
    const [abulky, setABulky] = useState(0);

    const inStyle = {
      width: 130
    };
    const [messageApi, contextHolder] = message.useMessage();


    const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Attacker Submitted',
    });
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
                             max={40}
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
              { phase === "0" && <Form.Item name = "skill"
                         label="BS:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={2}
                             max={10}
                             step={1}/>
              </Form.Item>}
              { (phase === "1" || phase === "2") && <Form.Item name = "skill"
                         label="WS:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={2}
                             max={10}
                             step={1}/>
              </Form.Item>}
              <Form.Item name = "S"
                         label="Strength:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             max={14}
                             step={1}/>
              </Form.Item>
              <Form.Item name = "AP"
                         label="AP:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             max={7}
                             step={1}/>
              </Form.Item>
              <Form.Item name = "D"
                         label="Damage:"
                         rules={[{ required: true }]}
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             max={20}
                             step={1}/>
              </Form.Item>
              { phase === "1" && <Form.Item name = "abulky"
                         label="Bulky:"
                         layout="vertical"
                         style={ inStyle }>
                <InputNumber stringMode={false}
                             min={1}
                             max={12}
                             step={1}/>
              </Form.Item>}
              <Form.Item style={{ textAlign: "center" }}>
                {contextHolder}
                <Button type="primary" htmlType="submit" onClick={success}> 
                  Set Attacker 
                </Button>
              </Form.Item>
        </Form>
    );
}
