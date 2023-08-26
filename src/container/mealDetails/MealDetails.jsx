import React, { useEffect } from 'react';
import { Card, Button, Image, Spin } from 'antd';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { getMealDetail, resetMealDetails } from "../../redux/mealList/reducer";
import {LoadingOutlined} from "@ant-design/icons";


function MealDetails (props){
    const mealDetails = useSelector(state => state.MealsReducer.mealDetails?.[0]),
        mealDetailsLoader = useSelector(state => state.MealsReducer.mealDetailsLoader),
        params = useParams(),
        dispatch = useDispatch();

    useEffect( () => {
        dispatch(getMealDetail(params?.mealId));
        // return () => {
        //     dispatch(resetMealDetails())
        // }
        // eslint-disable-next-line
    }, []);
    const onCheckout = () => {

    }
    const imageStyles = {
        backgroundImage: `url(${mealDetails?.strMealThumb})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // filter: `blur(${1}px)`,
        width: '100%',
        backgroundRepeat: 'no-repeat'
};
    console.log('mealDetails', mealDetails)
    return (
        <div className={'meal-details-container'} style={imageStyles}>
            <Spin
                spinning={mealDetailsLoader}
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
            >
                {mealDetails && (
                    <Card title={mealDetails?.strMeal} className={'meal-details-card'}>
                        <div className={'meal-image'}>
                            <Image
                                src={mealDetails?.strMealThumb}
                                alt={mealDetails?.strMeal}
                                preview={{maskClassName: 'meal-preview'}}
                            />
                        </div>
                        <h3>Descriptions:</h3> <p>{mealDetails?.strInstructions}</p>
                        <h3>Ingredients:</h3>
                        <div>
                            {Object.entries(mealDetails)?.filter(([key, value]) =>
                                key.startsWith('strIngredient') && value).map(([key, value], index) => (
                                    <span key={key} className={'Ingredients-list'}>{index + 1}. {value} </span>
                            ))}
                        </div>
                        <div className={'justify-content-center'}>
                            <Link to={`/meal/${params?.mealId}/purchase`}>
                                <Button onClick={onCheckout} type={'primary'} className={'checkout-button'}>Checkout</Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </Spin>
        </div>
    );
};

export default MealDetails;
