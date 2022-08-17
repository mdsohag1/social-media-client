import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import { reducers } from "../reducers";

function saveToLocalStore(store) {
    try {
        const serializedStore = JSON.stringify(store)
        window.localStorage.setItem("store", serializedStore)
    } catch (error) {
        console.log(error);
    }
}

function loadFromLocalStore(store) {
    try {
        const serializedStore = window.localStorage.getItem("store")
        if (serializedStore === null) {
            return undefined
        }
        return JSON.parse(serializedStore)
    } catch (error) {
        console.log(error);
        return undefined
    }
}
const composeEnhansers = window.__REDUX_DEVTOLS_EXTENTION_COMPOSE__ || compose;
const persistedState = loadFromLocalStore();

const store = createStore(reducers, persistedState, composeEnhansers(applyMiddleware(thunk)))
store.subscribe(() => saveToLocalStore(store.getState()));
export default store;