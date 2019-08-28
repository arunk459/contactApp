import {combineReducers} from "redux";
import {AsyncStorage} from "react-native";
import {applyMiddleware, createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import thunk from "redux-thunk";

import contactReducer from './contactsReducer';

const reducers = {
    contactReducer
};

const combineReducer = combineReducers(reducers);

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["contactReducer"],
    blacklist: []
};

const persistedReducer = persistReducer(persistConfig, combineReducer);

export default () => {
    const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
    const persistor = persistStore(store);
    return {store, persistor};
};

