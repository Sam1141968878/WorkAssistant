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
 *     2018/4/26.
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
  ScrollView,
  BackHandler
} from 'react-native';

import PublicHeader from '../PublicComponents/PublicHeader'
import PublicTopTab from '../PublicComponents/PublicTopTab'
import AwaitMeManageOnePage from '../PageComponents/AwaitMeManagePage/AwaitMeManageOnePage'
import AwaitMeManageTwoPage from '../PageComponents/AwaitMeManagePage/AwaitMeManageTwoPage'
import AwaitMeManageThirdPage from '../PageComponents/AwaitMeManagePage/AwaitMeManageThirdPage'
import AwaitMeManageFourPage from '../PageComponents/AwaitMeManagePage/AwaitMeManageFourPage'
var Spinner = require('react-native-spinkit');
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import NewGlobalStore from "../../GlobalStore/GlobalStore";


const PublicTopTabProps={
    OneTitle:'全部',
    TwoTitle:'待处理',
    ThirdTitle:'处理中',
    FourTitle:'待关闭',
    OnePage:<AwaitMeManageOnePage/>,
    TwoPage:<AwaitMeManageTwoPage/>,
    ThirdPage:<AwaitMeManageThirdPage/>,
    FourPage:<AwaitMeManageFourPage/>,
    Type:'Four',
}

@observer
export default class AwaitMeManagePage extends PureComponent{
  state={
    lazyLoading:true
  }
  componentDidMount() {
      setTimeout(()=>{
          this.setState({
              lazyLoading:false
          })
      },300)
      if (Platform.OS === 'android') {
          NewGlobalStore.RemoveBackHandler();
      }
  }
  componentWillUnmount() {
      if (Platform.OS === 'android') {
          NewGlobalStore.AddBackHandler();
      }
  }
  render() {
    const {goBack}=this.props.navigation;
    return (
      <View
          style={{
            flex:1
          }}
      >
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
                        size={100}
                        color='lightslategrey'
                        type='ThreeBounce'
                    />
                </View>
            :
                <View
                    style={{
                        flex:1
                    }}
                >
                    <StatusBar
                      backgroundColor='rgba(0,0,0,0)'
                      translucent={true}
                    />
                    <PublicHeader
                      type='one'
                      Title='待我处理'
                      goBack={()=>goBack()}
                    />
                    <PublicTopTab
                        {...PublicTopTabProps}
                    />
                </View>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
