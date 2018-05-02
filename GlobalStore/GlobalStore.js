/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Created by Administrator on 2018/4/28.
 */

import {observable,action} from 'mobx';

class GlobalStore {
    //mobx关联的观察者
    @observable User='';
    @observable PassWord='';
    @observable ServerParameters='';
    @observable GlobalToken='';
    @observable LandingState=false;
}

let NewGlobalStore=new GlobalStore();
export default NewGlobalStore;
