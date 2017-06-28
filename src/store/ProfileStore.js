import { autorun,observable } from 'mobx';
import config from '../config.js';
import fetchLocal from './util/fecthLocal.js';

import {
    AsyncStorage,
    Vibration
} from 'react-native';

export default class  ProfileStore{
    @observable userInfo: any = null;
    @observable friendList: object = {};
    @observable isTryRestoreFromStorage = false;
    
    STORAGE_KEY_USER_INFO = 'IM_USER_INFO';
    STORAGE_KEY_FRIEND_LIST = 'IM_FRIEND_LIST';

   // 从本地回复用户信息
   async _restoreUserInfoFromStorage(){
       let value = await AsyncStorage.getItem(this.STORAGE_KEY_USER_INFO);
       this.userInfo = value ? JSON.parse(value): value;
       // 本地用户信息回复成功
       this.isTryRestoreFromStorage = true;
   }

  // 用户登录
  async login(name:string, phone:string){
        
        //TODO：请求后台接口，获取用户的登录信息

        let result = JSON.stringify({
            name,
            phone
        });
        
        
        this.userInfo = result;
        
        AsyncStorage.setItem(this.STORAGE_KEY_USER_INFO, this.userInfo); 
        
        return result;
  }

  async logout(){
      this.userInfo = null; // 这句代码的调用 会触发这个 AsyncStorage.setItem(this.STORAGE_KEY_USER_INFO,this.userInfo)，导致本地存储的用户信息被清除
  }

  async getOnlineUserList(){

      //服务端请求获取
      let result = JSON.stringify({
          name,
          userID
      });

      this.friendList = result;

      AsyncStorage.setItem(this.STORAGE_KEY_FRIEND_LIST, this.friendList);

      return result;
  }
}
