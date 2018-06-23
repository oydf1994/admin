import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        info:{},
        pageList:[20,50,100]
    },
    mutations:{
        dataMsg(state,list){
            state.info = list
        }
    }
})