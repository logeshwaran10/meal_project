import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { debounce } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//Actions
import {getMealDetailSuccess, setUserDetails} from "../../redux/mealList/reducer";

//Component
import purchase from '../../assets/purchase.svg';
import {ArrowLeftOutlined} from "@ant-design/icons";

const ShippingForm = () => {
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


    const handleSubmit = () => {
        dispatch(setUserDetails(formData))
        navigate(`/meal/${params?.mealId}/order-details`);
    };
    const onBack = () => {
        dispatch(setUserDetails([]))
        dispatch(getMealDetailSuccess(null));
        navigate('/meal')
    }


    return (
        <>
        <div className={'back-arrow'}>
            <ArrowLeftOutlined onClick={onBack}/> {' '} Go To Home
        </div>
        <div className={'purchase-container'}>
            <div className={'left'}>
                <div>
                    <h3 className={'title'}>
                        Please fill out the following information to place your food order.
                    </h3>
                    <div className={'form'}>
                        <Form
                            onValuesChange={onValuesChange}
                            labelAlign={'left'}
                            form={form}
                            layout={'vertical'}
                            className={'purchase-form'}
                            onFinish={handleSubmit}
                        >
                            <Form.Item label="Name" name="name" required>
                                <Input placeholder={'Enter Your Name'}/>
                            </Form.Item>
                            <Form.Item name="contact"  label="Contact" required>
                                <Input value={formData.contact} placeholder={'Enter Your Number'} />
                            </Form.Item>
                            <Form.Item name="address" label="Address" required>
                                <Input value={formData.address}  placeholder={'Enter Your Address'}/>
                            </Form.Item>
                            <Form.Item className={'justify-content-center'}>
                                <Button
                                type={'primary'}
                                className={'submit-btn'}
                                htmlType="submit"
                                disabled={Object.keys(formData).some(key => !formData[key])}
                                >
                                    Purchase
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
            <div className={'right'}>
                <img src={purchase} alt={'purchase'}/>
            </div>
        </div>
        </>

    );
};

export default ShippingForm;
