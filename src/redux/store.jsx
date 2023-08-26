import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import mealsReducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [];

middlewares.push(sagaMiddleware);

const appReducer = combineReducers({...mealsReducer});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), ...middlewares]
});

sagaMiddleware.run(rootSaga);

