import { observer } from 'mobx-react/native';
import React from 'react';
import {
 ActivityIndicator,
 StyleSheet,
 View
} from 'react-native';

import {
 Navigator
} from './UILibrary';


import Login from './component/login';
import TabBarIndex from './component/TabBarIndex';

export default class NickIM extends React.Component{
    state: Object;
    constructor(props:Object){
        super(props);
    }

    render(){
       if(true){ //TODO：get from store
          if(true){ //TODO： get user message
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