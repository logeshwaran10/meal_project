//Dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Input, Spin } from "antd";
import { debounce } from "lodash";
import { Link } from 'react-router-dom';

//Actions
import { getMealList } from "../../redux/mealList/reducer";

//Component
import MealListCard from "../../component/mealList/mealListCard";
import { LoadingOutlined } from '@ant-design/icons';


function MealList() {
    const mealList = useSelector(state => state.MealsReducer.mealList),
     loader = useSelector(state => state.MealsReducer.loading);
    const dispatch = useDispatch();

    useEffect( () => {
        if(!mealList?.length) {
            dispatch(getMealList());
        }
        // eslint-disable-next-line
    }, []);

    const onSearch = debounce((event) => {
        if(event.target.value.trim && !!event?.target?.value) {
            dispatch(getMealList(event.target.value));
        } else {
            dispatch(getMealList());
        }
    }, 700);


    return (
        <div className={'meal-container'}>
            <div className={'search-bar'}>
                <Input placeholder={'Search Your Meal'} onChange={onSearch} disabled={loader}/>
                <Link to={'/users'}>Go to User List</Link>
            </div>
            <div className={'content'}>
                <Spin
                    spinning={loader}
                    indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
                >
                    {mealList?.length > 0 ?
                        <MealListCard meals={mealList}/>
                        :
                        <div>No Data</div>
                    }
                </Spin>
            </div>
        </div>
    );
}

export default MealList;
