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
  AsyncStorage
} from 'react-native';

var Spinner = require('react-native-spinkit');
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import NewGlobalStore from '../../GlobalStore/GlobalStore'

import MyPageHeader from '../PageComponents/MyPage/MyPageHeader'
import MyPageContent from '../PageComponents/MyPage/MyPageContent'

@observer
export default class MyPage extends PureComponent{
  static navigationOptions = {
      tabBarLabel: '个人中心',
      tabBarIcon: ({tintColor, focused}) => {
        return(
            <View>
             {
                tintColor==='#129faa'?
              <Image
                  source={require('../../Icon/底部导航栏图标/ClickMy.png')}
                  style={{
                    marginTop:6,
                    width:24,
                    height:24,
                  }}
              />
              :
              <Image
                  source={require('../../Icon/底部导航栏图标/NoClickMy.png')}
                  style={{
                    marginTop:6,
                    width:24,
                    height:24,
                  }}
              />
             }
         </View>
        )
      }
  };
  state={
    lazyLoading:true
  }
  componentDidMount() {
      setTimeout(()=>{
          this.setState({
              lazyLoading:false
          })
      },600)
      AsyncStorage.getItem('LandingState')
      .then((value) => {
          let jsonValue = JSON.parse((value));
          NewGlobalStore.landingState=jsonValue;
      })
  }
  render() {
    const {navigate}=this.props.navigation;
    return (
      <View style={{flex:1}}>

          {
            this.state.lazyLoading
            ?
                <View
                    style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'#051843'
                    }}
                >
                    <Spinner
                        size={200}
                        color='lightslategrey'
                        type='Pulse'
                    />
                </View>
            :
                <View
                    style={{
                        flex:1,
                        backgroundColor:'#f5f5f9'
                    }}
                >
                      <StatusBar
                        backgroundColor='rgba(0,0,0,0)'
                        translucent={true}
                      />
                      <MyPageHeader
                        navigate={navigate}
                        user={NewGlobalStore.user}
                      />
                      <MyPageContent navigate={navigate}/>
                </View>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
