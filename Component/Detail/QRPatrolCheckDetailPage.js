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
 *     2018/4/23.
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
} from 'react-native';

import PublicHeader from '../PublicComponents/PublicHeader'


export default class QRPatrolCheckDetailPage extends PureComponent{
  state={
    normal:true,
  }
  render() {
    const {state,navigate,goBack}=this.props.navigation
    return (
      <View style={{flex:1}}>
        <StatusBar
            backgroundColor='rgba(0,0,0,0)'
            translucent={true}
        />
        <PublicHeader
            type='third'
            Title='巡检单'
            goBack={()=>navigate('HomePage')}
        />
        <View
            style={{
                flex:1,
                backgroundColor:'#f5f5f9'
            }}>
            <View
                style={{
                    marginLeft:10,
                    marginRight:10,
                    backgroundColor:'#FFF',
                    borderRadius:3,
                    height:70,
                    justifyContent:'center',
                    paddingLeft:20,
                    marginTop:10,
                }}>
                <Text
                    style={{
                         lineHeight:25,
                         color:'#000',
                    }}>开始时间:{state.params.startTime}</Text>
                <Text
                    style={{
                         lineHeight:25,
                         color:'#000',
                    }}>结束时间:{state.params.endTime}</Text>
            </View>
            <View
                style={{
                    marginLeft:10,
                    marginRight:10,
                    backgroundColor:'#FFF',
                    borderRadius:3,
                    marginTop:10,
                    height:300
                }}>
                <View
                    style={{
                        width:'88%',
                        marginLeft:20,
                        height:40,
                        borderBottomColor:'#e5e5e5',
                        borderBottomWidth:StyleSheet.hairlineWidth,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                    <Text
                        style={{
                            fontSize:16,
                            color:'#000'
                        }}>巡检任务内容</Text>
                    <View>
                        <Text
                            style={{
                                color:'#5ea0ef',
                                fontWeight:'500'
                            }}>编辑</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginLeft:20,
                        marginRight:20
                    }}>
                    <Text
                        style={{
                            lineHeight:35,
                        }}>区域:{state.params.area}</Text>
                    <Text
                        style={{
                            lineHeight:35,
                        }}>设备名称:{state.params.deviceName}</Text>
                    <Text
                        style={{
                            lineHeight:35,
                        }}>巡检内容:{state.params.patrolCheckContent}</Text>
                    <Text
                        style={{
                            lineHeight:35,
                        }}>参考值:{state.params.referenceValue}</Text>
                    <View
                        style={{
                            flexDirection:'row'
                        }}>
                        <Text
                        style={{
                            lineHeight:35,
                        }}>巡检值:{state.params.objectType}</Text>
                    </View>
                    <Text
                        style={{
                            lineHeight:35,
                        }}>巡检结果:{state.params.status}</Text>
                    <Text
                        style={{
                            lineHeight:35,
                        }}>备注:{state.params.remark?state.params.remark:'暂无备注'}</Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection:'row',
                    marginLeft:15,
                    marginRight:15,
                    justifyContent:'space-around',
                    marginTop:20,
                }}>
                <TouchableOpacity
                    style={{
                        width:150,
                        height:45,
                        backgroundColor:'#358aef',
                        borderRadius:25,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                    activeOpacity={0.6}
                >
                    <Text>提交</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width:150,
                        height:45,
                        backgroundColor:'#e6e6e6',
                        borderRadius:25,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                    activeOpacity={0.6}
                    onPress={()=>navigate('HomePage')}
                >
                    <Text>取消</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
