//Dependencies
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Steps} from 'antd';

//Actions
import { setUserDetails, getMealDetailSuccess } from "../../redux/mealList/reducer";

//Component
import conforming from '../../assets/accepted.svg';
import packing from '../../assets/packing.svg';
import shipped from '../../assets/shipped.svg';
import delivered from '../../assets/delivered.svg';
import { ArrowLeftOutlined } from "@ant-design/icons";


const { Text } = Typography;
const initialData = [
    {
        title: 'Not yet Accepted',
        description: ''
    },
    {
        title: 'Not yet Shipped',
        description: '',
    },
    {
        title: 'Not yet Delivered',
        description: '',
    },
]
const orderId = Math.floor(Math.random() * 9e9) + 1e9;
const timeInterval = 10000;
const image = {
    0: packing,
    1: shipped,
    2: delivered
}

const OrderDetails = () => {
    const mealDetails = useSelector(state => state.MealsReducer.mealDetails?.[0]),
     userDetails = useSelector(state => state.MealsReducer.userDetails),
     [orderDetails, setOrderDetails ] = useState(initialData),
     [currentStatus, setCurrentStatus ] = useState({step: 0, percent: 10, status: 'process'}),
     [currentIndex, setCurrentIndex] = useState(0),
     [bgImage, setBgImage] = useState(conforming),
        navigate = useNavigate(),
        dispatch = useDispatch();

    useEffect(() => {
        if(!mealDetails) {
            navigate(`/meal`);
        }
        const interval = setInterval(() => {
            if (currentIndex >= orderDetails.length) {
                clearInterval(interval);
                return;
            }
            setBgImage(image[currentStatus.step])
            setOrderDetails(prevData => {
                const newData = [...prevData];
                newData[currentIndex].title =  newData[currentIndex]?.title.replace('Not yet', 'Order');
                newData[currentIndex].description = `At ${new Date().toLocaleTimeString()}`;
                return newData;
            });
            setCurrentStatus(prevState => {
                return {step: prevState.step + 1, percent: 0, status: 'process'}
            });
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, timeInterval);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line
    }, [currentIndex, orderDetails]);


    useEffect(() => {
        const interval = setInterval(() => {
            if (currentStatus?.percent >= 100) {
                clearInterval(interval);
                return;
            }
            //Updating the status percentage
            setCurrentStatus(prevState => {
                return {...prevState, percent: prevState?.percent + 5}
            });
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, [currentStatus]);

    const onBack = () => {
        dispatch(setUserDetails([]))
        dispatch(getMealDetailSuccess(null));
        navigate('/meal')
    }

    if(!mealDetails) {
        return  ''
    }

    return (
        <div className={'order-content'}>
            <div className={'back-arrow'}>
                <ArrowLeftOutlined onClick={onBack}/> {' '} Go To Home
            </div>
            <div className={'steps'}>
                <Steps
                    responsive={true}
                    className={'progress'}
                    current={currentStatus?.step}
                    percent={currentStatus?.percent}
                    status={currentStatus?.status}
                    items={orderDetails}
                />
        </div>
        <div className={'order-container'}>
            <div className={'left'}>
                <div>
                    <h4>Shipping Details</h4>
                    <p><Text type={'secondary'}>Selected Meal: </Text><Text>{mealDetails?.strMeal}</Text></p>
                    <p> <Text type={'secondary'}>Order Id: </Text> {orderId}</p>
                    <p><Text type={'secondary'}>Payment Mode: </Text> Cash On Delivery</p>
                    <p> <Text type={'secondary'}>Name: </Text> {userDetails?.name}</p>
                    <p><Text type={'secondary'}>Phone: </Text> {userDetails?.contact}</p>
                    <p><Text type={'secondary'}>Address: </Text> {userDetails?.address}</p>
                </div>
            </div>
            <div className={'right'}>
                <img src={bgImage} alt={'purchase'}/>
            </div>
        </div>
        </div>

    );
};

export default OrderDetails;
