import { observer } from 'mobx-react/native';
import React from 'react';
import {
 ActivityIndicator,
 StyleSheet,
 View
} from 'react-native';

import {
 Navigator
} from './uiLibrary';

import {
   profileStore  
} from './storeSingleton.js';

import Login from './component/Login.js';
import TabBarIndex from './component/TabBarIndex.js';

@observer
export default class NickIM extends React.Component{
    state: Object;
    constructor(props:Object){
        super(props);
    }

    render(){
       if(profileStore.isTryRestoreFromStorage){ //TODO：get from store
          if(profileStore.userInfo){ //TODO： get user message
             return(
                  <Navigator
                   initialComponent={TabBarIndex} />   
             );
          }else{
              
            return (<Login />);
          }

       }else{
          // TODO: 思考下如何做 loading 全局覆盖
            return (
                <ActivityIndicator
                    style={styles.activityIndicatorContainer}
                />
            );
       }
    }
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        flex: 1
    }
});