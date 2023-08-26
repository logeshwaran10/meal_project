// src/components/ShippingForm.js
import React from 'react';
import { useSelector } from "react-redux";

const OrderDetails = () => {
    const mealDetails = useSelector(state => state.MealsReducer.mealDetails?.[0]);
    const userDetails = useSelector(state => state.MealsReducer.userDetails);
    console.log('mealDetails', mealDetails, userDetails)

    return (
        <div>
            <div>

            </div>
            <div>

            </div>
        </div>
    );
};

export default OrderDetails;
