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

import {observable,action} from 'mobx';
import {observer} from 'mobx-react';

import PublicHeader from '../PublicComponents/PublicHeader'
import PublicTopTab from '../PublicComponents/PublicTopTab'
import WarningOnePage from '../PageComponents/WarningPage/WarningOnePage'
import WarningTwoPage from '../PageComponents/WarningPage/WarningTwoPage'
import WarningThirdPage from '../PageComponents/WarningPage/WarningThirdPage'
import WarningFourPage from '../PageComponents/WarningPage/WarningFourPage'
import NewGlobalStore from "../../GlobalStore/GlobalStore";
var Spinner = require('react-native-spinkit');

const PublicTopTabProps={
    OneTitle:'全部',
    TwoTitle:'配电',
    ThirdTitle:'环境',
    OnePage:<WarningOnePage/>,
    TwoPage:<WarningTwoPage/>,
    ThirdPage:<WarningThirdPage/>,
    Type:3,
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
          NewGlobalStore.RemoveBackHandler()
      }
  }
  componentWillUnmount() {
      if (Platform.OS === 'android') {
          NewGlobalStore.AddBackHandler()
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
                    Title='告警'
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
