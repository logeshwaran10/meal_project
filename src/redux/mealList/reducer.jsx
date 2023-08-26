import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    mealList: [],
    selectedMeal: null,
    loading: false,
    mealDetails: [],
    mealDetailsLoader: false,
    userDetails: {}
};

const MealsReducer = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        getMealList(state) {
            state.loading = true;
        },
        getMealListSuccess(state, action) {
            state.loading = false;
            state.mealList = action?.payload?.meals;
        },
        getMealListFailure(state) {
            state.loading = false;
        },
        getMealDetail(state) {
            state.mealDetailsLoader = true;
        },
        getMealDetailSuccess(state, action) {
            state.mealDetailsLoader = false;
            state.mealDetails = action.payload?.meals
        },
        getMealDetailFailure(state) {
            state.mealDetailsLoader = false;
        },
        resetMealDetails(state) {
            state.mealDetails = []
        },
        setUserDetails(state, action) {
            state.userDetails = action.payload
        }
    }
});
export const {
    getMealList,
    getMealListSuccess,
    getMealListFailure,
    getMealDetail,
    getMealDetailSuccess,
    getMealDetailFailure,
    resetMealDetails,
    setUserDetails
} = MealsReducer.actions;
export default MealsReducer.reducer;
