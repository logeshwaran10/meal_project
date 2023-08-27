//Dependencies
import React, { useEffect } from 'react';
import { Card, Button, Image, Spin } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from 'antd';



//Actions
import { getMealDetail, resetMealDetails } from "../../redux/mealList/reducer";

//Component
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Text } = Typography;
function MealDetails (props){
    const mealDetails = useSelector(state => state.MealsReducer.mealDetails?.[0]),
        mealDetailsLoader = useSelector(state => state.MealsReducer.mealDetailsLoader),
        params = useParams(),
        dispatch = useDispatch(),
        navigate = useNavigate();

    useEffect( () => {
        dispatch(getMealDetail(params?.mealId));
        // eslint-disable-next-line
    }, []);

    const onBack = () => {
        dispatch(resetMealDetails())
        navigate(-1)
    }
    return (
        <>
        <div className={'back-arrow'}>
            <ArrowLeftOutlined onClick={onBack}/>
        </div>
        <div className={`meal-details-container ${mealDetailsLoader ? 'justify-content-center' : ''}`} >
            <Spin
                spinning= {mealDetailsLoader}
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
            >
                {mealDetails && (
                    <Card
                        className={'meal-details-card'}
                        title={
                        <div>
                            <Text className={'title'}>Selected Food: </Text>
                            <Text type={'secondary'}>{mealDetails?.strMeal}</Text>
                        </div>
                    }
                        extra={[
                            <Link to={`/meal/${params?.mealId}/purchase`}>
                                <Button type={'primary'}>Checkout</Button>
                            </Link>
                        ]}
                    >
                        <div className={'meal-image'}>
                            <Image
                                src={mealDetails?.strMealThumb}
                                alt={mealDetails?.strMeal}
                                preview={{maskClassName: 'meal-preview'}}
                            />
                        </div>
                        <div>
                            <h3>Description:</h3>
                            <Text type={'secondary'}>{mealDetails?.strInstructions} </Text>
                        </div>

                        <div>
                            <h3>Ingredients:</h3>
                            <Text type={'secondary'}>
                                {Object.entries(mealDetails)?.filter(([key, value]) =>
                                key.startsWith('strIngredient') && value).map(([key, value], index) => (
                                    <span key={key} className={'Ingredients-list'}>{index + 1}. {value} </span>
                                ))}
                            </Text>
                        </div>
                    </Card>
                )}
            </Spin>
        </div>
        </>
    );
};

export default MealDetails;
