import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { debounce } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//Actions
import { setUserDetails } from "../../redux/mealList/reducer";

const ShippingForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: '',
    });
    const dispatch = useDispatch();
    const [form] =  Form.useForm(),
        navigate = useNavigate(),
        params = useParams();


    const onValuesChange = debounce((value) => {
        setFormData((prevData) => ({
            ...prevData,
            [Object.keys(value)]: Object.values(value)?.[0] || '',
        }));
    }, 500);

    console.log('formData', formData)

    const handleSubmit = () => {
        dispatch(setUserDetails(formData))
        navigate(`/meal/${params?.mealId}/order-details`);
    };


    return (
        <>
        {/*<h3>*/}
        {/*    Please fill out the following information to place your food order. We're excited to serve you!*/}
        {/*</h3>*/}
        <div className={'purchase-container'}>
            <Form
                onValuesChange={onValuesChange}
                labelAlign={'left'}
                form={form}
                layout={'vertical'}
                className={'purchase-form'}
                onFinish={handleSubmit}
            >
                <Form.Item label="Name" name="name" required>
                    <Input />
                </Form.Item>
                <Form.Item name="contact"  label="Contact" required>
                    <Input value={formData.contact} />
                </Form.Item>
                <Form.Item name="address" label="Address" required>
                    <Input value={formData.address} />
                </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={Object.keys(formData).some(key => !formData[key])}
                    >
                        Purchase
                    </Button>
            </Form>
        </div>
        </>
    );
};

export default ShippingForm;
