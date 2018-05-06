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
  BackHandler
} from 'react-native';

import { QRScannerView } from 'ac-qrcode';
var Spinner = require('react-native-spinkit');
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import NewGlobalStore from "../../GlobalStore/GlobalStore";

@observer
export default class QrPage extends PureComponent{
  static navigationOptions = {
      tabBarLabel: '扫一扫',
      tabBarIcon: ({tintColor, focused}) => {
        return(
            <View>
             {
                tintColor==='#129faa'?
              <Image
                  source={require('../../Icon/底部导航栏图标/ClickQR.png')}
                  style={{
                    marginTop:5,
                    width:20,
                    height:20,
                  }}
              />
              :
              <Image
                  source={require('../../Icon/底部导航栏图标/NoClickQR.png')}
                  style={{
                    marginTop:5,
                    width:20,
                    height:20,
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
      },400)
      if (Platform.OS === 'android') {
        NewGlobalStore.RemoveBackHandler()
      }
  }

  componentWillUnmount() {
      if (Platform.OS === 'android') {
        NewGlobalStore.AddBackHandler()
      }
  }

  //扫一扫的自定义头部
  _renderTitleBar(){
        return(
            <Text
                style={{
                    color:'white',
                    textAlignVertical:'center',
                    textAlign:'center',
                    fontSize:20,
                    padding:12
                }}
            >我是云联App的自定义头部,后续将在这里加入其他内容</Text>
        );
    }

    //扫一扫的自定义尾部
    _renderMenu() {
        return (
            <Text
                style={{
                    color:'white',
                    textAlignVertical:'center',
                     textAlign:'center',
                     fontSize:20,
                     padding:12
                }}
            >我是云联APP下面的自定义文字,后续尝试加入闪光灯,颜色,美化风格等(提示,后退等)</Text>
        )
    }

    //扫一扫成功的回调函数
    barcodeReceived(e) {
        console.log('Type: ' + e.type + '\nData: ' + e.data);
    }


  render() {
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
                            type='CircleFlip'
                        />
                    </View>
                :
                    < QRScannerView
                        onScanResultReceived={this.barcodeReceived.bind(this)}

                        renderTopBarView={() => this._renderTitleBar()}

                        renderBottomMenuView={() => this._renderMenu()}
                    />
            }
        </View>

    );
  }
}

const styles = StyleSheet.create({

});
