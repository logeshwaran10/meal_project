import MealList from "../container/mealList/MealList";
import MealDetails from '../container/mealDetails/MealDetails';
import PurchaseForm from '../container/purchase/PurchaseForm';
import OrderDetails from '../container/purchase/orderDetails';

const routes = [
    {
        path: '/',
        component: <MealList/>
    },
    {
        path: '/meal',
        component: <MealList/>
    },
    {
        path: '/meal/:mealId',
        component: <MealDetails/>
    },
    {
        path: '/meal/:mealId/purchase',
        component: <PurchaseForm/>
    },
    {
        path: '/meal/:mealId/order-details',
        component: <OrderDetails/>
    }

];

export default routes;