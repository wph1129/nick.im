import { autorun,observable } from 'mobx';

import {
    AsyncStorage,
    Vibration
} from 'react-native';

 class  ProfileStore{

    @observable userInfo: Any = null;
    @observable friendList: Object = {};
    @observable isTryRestoreFromStorage = false;
    
    STORAGE_KEY_USER_INFO = 'IM_USER_INFO';
    STORAGE_KEY_FRIEND_LIST = 'IM_FRIEND_LIST';
      
       constructor(props: Object) {
         // 恢复用户信息
        this._restoreUserInfoFromStorage();
        // 拉取好友
        //this.getOnlineList();
    }



   // 从本地缓存恢复用户信息
   async _restoreUserInfoFromStorage(){
       let value = await AsyncStorage.getItem(this.STORAGE_KEY_USER_INFO);
       this.userInfo = value ? JSON.parse(value): value;
       // 本地用户信息恢复成功
       this.isTryRestoreFromStorage = true;
   }

  // 用户登录
  async login(name:string, phone:string){
        
        //TODO：请求后台接口，获取用户的登录信息

        let result = JSON.stringify({
            name,
            phone
        });
        console.log(result);
        this.userInfo = result;
        AsyncStorage.setItem(this.STORAGE_KEY_USER_INFO, this.userInfo);
        return result;
  }

  async logout(){
      this.userInfo = null; // 这句代码的调用 会触发这个 AsyncStorage.setItem(this.STORAGE_KEY_USER_INFO,this.userInfo)，导致本地存储的用户信息被清除
  }

  async getOnlineUserList(){

      //服务端请求获取
      let result = [{avatar: "", name: "nick1", userId: 1, status: "online" }];
      console.log(result);
      this.friendList = result;

      AsyncStorage.setItem(this.STORAGE_KEY_FRIEND_LIST, this.friendList);

      return result;
  }
}

export  default ProfileStore;
