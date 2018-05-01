/**
 * Sample
 * React
 * Native
 * App
 * https://github.com/facebook/react-native
 * @flow
 * Created
 *     by
 *     Administrator
 *     on
 *     2018/4/18.
 */

import React, { Component,PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  InteractionManager,
  TouchableOpacity,
  Image,
  StatusBar,
  BackAndroid,
  AsyncStorage
} from 'react-native';

import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import NewGlobalStore from '../../GlobalStore/GlobalStore'

import HomePageHeader from '../PageComponents/HomePage/HomePageHeader'
import HomePageContent from '../PageComponents/HomePage/HomePageContent'

@observer
export default class HomePage extends PureComponent{
  static navigationOptions = {
      tabBarLabel: '主页',
      tabBarIcon: ({tintColor, focused}) => {
        return(
            <View>
             {
                tintColor==='#129faa'
                ?
              <Image
                  source={require('../../Icon/底部导航栏图标/ClickHome.png')}
                  style={{
                    marginTop:10,
                    width:24,
                    height:24,
                  }}
              />
              :
              <Image
                  source={require('../../Icon/底部导航栏图标/NoClickHome.png')}
                  style={{
                    marginTop:10,
                    width:24,
                    height:24,
                  }}
              />
             }
         </View>
        )
      }
  };
  componentWillMount() {
      AsyncStorage.getItem('LandingState')
      .then((value) => {
          let jsonValue = JSON.parse((value));
          NewGlobalStore.landingState=jsonValue;
      })
      .then(()=>{
        if(NewGlobalStore.landingState===true){
            conolse.log('登陆成功')
        }else{
            this.props.navigation.navigate('LandingPage')
        }
      })

  }
  render() {
    const {navigate}=this.props.navigation;
    return (
      <View style={{flex:1}}>
          <StatusBar
            backgroundColor='rgba(0,0,0,0)'
            translucent={true}
          />
          {
            NewGlobalStore.landingState
            ?
            <Text>登陆了</Text>
            :
            <Text>未登录</Text>
          }
          <TouchableOpacity
              onPress={()=>{
                AsyncStorage.removeItem('LandingState');
                NewGlobalStore.landingState=false;
                this.props.navigation,navigate('LandingPage')
              }}
          >
              <Text>退出登陆</Text>
          </TouchableOpacity>
          <HomePageHeader navigate={navigate}/>
          <HomePageContent navigate={navigate}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
