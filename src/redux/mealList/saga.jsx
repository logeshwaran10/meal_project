//Dependencies
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { getRequest } from '../../helper/axiosClient';
import { message } from 'antd';


//actions
import { getMealListSuccess ,getMealListFailure, getMealDetailSuccess, getMealDetailFailure } from "./reducer";

export function* getMealList(params) {
    try {
        const { payload } = params;
        let response = {};
        if(payload?.length > 1) {
            response = yield call(() => getRequest(`search.php?s=${payload || 'chicken'}`));
        } else {
            response = yield call(() => getRequest(`search.php?f=${payload || 'c'}`));
        }
        if(!response?.data?.meals?.length) {
            message.error('Oops!! The item you were looking for is not available right now.');
        }
        yield put(getMealListSuccess(response?.data));
    } catch (err) {
        message.error('Something Went Wrong');
        yield put(getMealListFailure());
    }
}
export function* getMealDetail(params) {
    try {
        const { payload } = params;
        const response = yield call(() => getRequest(`lookup.php?i=${payload}`));
        yield put(getMealDetailSuccess(response?.data));
    } catch (err) {
        message.error('Something Went Wrong');
        yield put(getMealDetailFailure());
    }
}
export default function* rootSaga() {
    yield all([
        takeLatest('meals/getMealList', getMealList),
        takeLatest('meals/getMealDetail', getMealDetail)
    ]);
}