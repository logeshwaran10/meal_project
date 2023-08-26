import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

function MealListCard({ meals }) {
    return (
        <div className={'meal-card'}>
            {meals && meals.map((meal) => (
                <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
                    <Card
                        hoverable style={{ width: 240, margin: '16px' }}
                        cover={
                        <img alt={meal.strMeal} src={meal.strMealThumb}/>
                    }
                    >
                        <Meta title={meal.strMeal} />
                    </Card>
                </Link>
            ))}
        </div>
    );
}

export default MealListCard;
