import { all } from 'redux-saga/effects';

import mealListSaga from './mealList/saga'

const saga = [
    mealListSaga()
    // We can add upcoming saga here
]
export default function* rootSaga(getState) {
    yield all([...saga]);
}