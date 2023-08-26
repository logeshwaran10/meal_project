//Dependencies
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { getRequest } from '../../helper/axiosClient';

//actions
import { getMealListSuccess ,getMealListFailure, getMealDetailSuccess, getMealDetailFailure } from "../../redux/mealList/reducer";

export function* getMealList(params) {
    try {
        const { payload } = params;
        const response = yield call(() => getRequest(`search.php?f=${payload || 'c'}`));
        yield put(getMealListSuccess(response?.data));
    } catch (err) {
        yield put(getMealListFailure());
    }
}
export function* getMealDetail(params) {
    try {
        const { payload } = params;
        const response = yield call(() => getRequest(`lookup.php?i=${payload}`));
        yield put(getMealDetailSuccess(response?.data));
    } catch (err) {
        yield put(getMealDetailFailure());
    }
}
export default function* rootSaga() {
    yield all([
        takeLatest('meals/getMealList', getMealList),
        takeLatest('meals/getMealDetail', getMealDetail)
    ]);
}