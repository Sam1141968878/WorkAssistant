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
  AsyncStorage,
  ActivityIndicator,
  BackHandler
} from 'react-native';

import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import NewGlobalStore from '../../GlobalStore/GlobalStore'

import HomePageHeader from '../PageComponents/HomePage/HomePageHeader'
import HomePageContent from '../PageComponents/HomePage/HomePageContent'
import HomePageGoToLandingPage from '../PageComponents/HomePage/HomePageGoToLandingPage'


@observer
export default class HomePage extends Component{
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
  state={
    ready:false,
  }
  componentDidMount() {
      setTimeout(()=>this.setState({
          ready:true
      }),1000)
       AsyncStorage.getItem('LandingState')
       .then((value) => {
           let jsonValue = JSON.parse((value));
           NewGlobalStore.LandingState=jsonValue
       })
      AsyncStorage.getItem('User')
      .then((value) => {
          let jsonValue = JSON.parse((value));
          NewGlobalStore.User=jsonValue
      })
      AsyncStorage.getItem('PassWord')
      .then((value) => {
          let jsonValue = JSON.parse((value));
          NewGlobalStore.PassWord=jsonValue
      })
      AsyncStorage.getItem('ServerParameters')
      .then((value) => {
          let jsonValue = JSON.parse((value));
          NewGlobalStore.ServerParameters=jsonValue
      })
      AsyncStorage.getItem('GlobalToken')
      .then((value) => {
          let jsonValue = JSON.parse((value));
          NewGlobalStore.GlobalToken=jsonValue
      })
      if (Platform.OS === 'android') {
          NewGlobalStore.AddBackHandler();
      }
  }

  render() {
    const {navigate}=this.props.navigation;
    return (
      <View style={{flex:1}}>
          {
            this.state.ready
            ?
                <View>
                  {
                    NewGlobalStore.LandingState
                    ?
                        <View
                            style={{flex:1}}
                        >
                         <StatusBar
                             backgroundColor='rgba(0,0,0,0)'
                             translucent={true}
                           />
                           <HomePageHeader navigate={navigate}/>
                           <HomePageContent navigate={navigate}/>
                        </View>
                    :
                        <HomePageGoToLandingPage navigate={navigate}/>
                  }
                </View>
            :
            <ActivityIndicator/>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
