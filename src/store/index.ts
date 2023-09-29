// src/store/index.js

import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        login({ commit }, user) {
            // Authenticate the user and set the user in the state
            commit('setUser', user);
        },
        logout({ commit }) {
            // Clear user from the state to log them out
            commit('setUser', null);
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        },
    },
});

export default store;