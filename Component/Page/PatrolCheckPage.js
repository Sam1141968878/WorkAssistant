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
 *     2018/4/17.
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
  ActivityIndicator,
} from 'react-native';

import PublicHeader from '../PublicComponents/PublicHeader'
import PublicTopTab from '../PublicComponents/PublicTopTab'
import Toast from 'teaset/components/Toast/Toast';
import fetchPost from '../../Function/FetchPost'
import { QRScannerView } from 'ac-qrcode';
import QRPatrolCheckDetailPage from "../Detail/QRPatrolCheckDetailPage";
var Spinner = require('react-native-spinkit');



//构造播放微信扫一扫音效的组件
import Sound from 'react-native-sound';
const s = new Sound('http://img.sc115.com/uploads1/sc/yx/742/88150832361.mp3',null, (e) => {
                if (e) {
                     console.log('播放失败');
                    return;
                }
            });

export default class PatrolCheckPage extends PureComponent{
    state={
      AccessToken:'',
      Inspection:'',
      inspectionPointFlag:'',
      QRNumber:0,
      lazyLoading:true
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                lazyLoading:false
            })
        },500)
    }

    //扫一扫页的自定义头部
    _renderTitleBar(){
        return(
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',fontSize:20,padding:12}}
            >我是云联App的自定义头部,后续将在这里加入其他内容(提示,后退等)</Text>
        );
    }

    //扫一扫页的自定义尾部
    _renderMenu() {
        return (
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',fontSize:20,padding:12}}
            >我是云联APP下面的自定义文字,后续尝试加入闪光灯,颜色,美化风格等</Text>
        )
    }

    //二维码扫描成功后执行的回调函数
    barcodeReceived(e) {
        this.setState({
            inspectionPointFlag:e.data,
            QRNumber:this.state.QRNumber+1
        },()=>{
            //扫描成功播放声音
            s.play(() => s.release());
            //设置一个阈值,让二维码扫描不要过度扫描
            if(this.state.QRNumber===1){
                this._fetchQR()
            }else if(this.state.QRNumber===10){
                this.setState({
                    QRNumber:0,
                })
            }else{
                console.log('二维码组件扫描过快')
            }
        })
    }

    //暂时执行获取token,然后执行连接二维码插值函数
    //还没有同步修改到登陆哪里
    _fetchQR=()=>{
      const accessToken=fetchPost('http://192.168.1.126/login',
        {"uid": "admin", "pwd": "123456"}
      )
      .then((accessToken)=>{
          this.setState({
              AccessToken:accessToken.access_token
          },()=>{
              this._fetchInspection();
          })
      })
    }

    //连接二维码值后的远程读取函数
    _fetchInspection=()=>{
        const inspection=fetchPost('http://192.168.1.126/inspection',
          {
              "access_token":this.state.AccessToken,
              "type":"inspection_point_mission_get",
              "data":{
                  "inspection_point_flag":this.state.inspectionPointFlag
              }
          }
        )
        .then((inspection)=>{
            console.log(inspection)
          this.setState({
              Inspection:inspection,
          },()=>{
            if(this.state.Inspection.errcode==='00001'){
                //如果错误代码是00001就跳转到首页并弹出相应悬浮层
                this.props.navigate('HomePage')
                setTimeout(()=>{
                    Toast.show({
                      text: this.state.Inspection.errmsg,
                      position: 'bottom',
                      duration: 10000,
                    });
                },1000)
            }else if(this.state.Inspection.errcode==='00000'){
                //如果错误代码是00000就进入巡检详情页,并传入相关值
                 this.props.navigate('QRPatrolCheckDetailPage',{
                     startTime:this.state.Inspection.data.start_time,
                     endTime:this.state.Inspection.data.end_time,
                     area:this.state.Inspection.data.items[0].region,
                     deviceName:this.state.Inspection.data.items[0].object,
                     patrolCheckContent:this.state.Inspection.data.items[0].content,
                     referenceValue:this.state.Inspection.data.items[0].reference_value,
                     objectType:this.state.Inspection.data.items[0].object_type,
                     status:this.state.Inspection.data.items[0].status,
                     remark:this.state.Inspection.data.items[0].remark,

                 })
            }else{
                console('扫描巡检二维码出错了')
            }
          })
        })
    }

  render() {
    const {goBack}=this.props;
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
                <View style={{flex:1}}>
                    <PublicHeader
                        type='third'
                        Title='扫描巡检二维码获取巡检单'
                        goBack={goBack}
                    />
                    < QRScannerView
                        onScanResultReceived={this.barcodeReceived.bind(this)}

                        renderTopBarView={() => this._renderTitleBar()}

                        renderBottomMenuView={() => this._renderMenu()}
                    />
                </View>
            }

        </View>
    );
  }
}

const styles = StyleSheet.create({

});
