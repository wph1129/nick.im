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
      let result = {"1": [{ "userId": 251,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png","name": "156", "phone": "18576410105","socketId": "7q1sdYgQCMY9Fk5aAAmy","status": "offline", "vibration": true},{"userId": 304,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_19.jpg","name": "1","phone": "12334567890","socketId": "uPa7sD8YYH68P3XZAAmt","status": "offline","vibration": true}],"2": [{"userId": 300,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_12.jpg","name": "2","phone": "13512345678","socketId": "Lyzp2hVrsGDwQtoHAAj0","status": "offline","vibration": true},{"userId": 298,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_15.png","name": "20","phone": "10123111111","socketId": "3Kdk3HfUgcPJr84lAAjg","status": "offline","vibration": true}],"a": [{"userId": 297,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_06.jpg", "name": "a","phone": "12345464566","socketId": "XIAtz7x0VQhcMpdvAAjr", "status": "offline", "vibration": true},{"userId": 42,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_02.png","name": "a","phone": "13888888888","socketId": "_9qLFRcoNKhAcuinAAif","status": "offline","vibration": true },{"userId": 259,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_04.png","name": "aaa","phone": "18628265387","socketId": "8onATPAFV1Jdmv3bAAdx","status": "offline","vibration": true},{ "userId": 222,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_07.jpg", "name": "aaa","phone": "12645678901","socketId": "jsRGHINPmkcL5EdOAAB8","status": "offline","vibration": true}],"b": [{"userId": 221,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_13.png","name": "宝贝","phone": "18361130888","socketId": "fdW-RfryDaS3nvaiAAdt","status": "offline", "vibration": true},{"userId": 201,"avatar": "http://image-2.plusman.cn/app/im-client/avatar/tuzki_02.png","name": "bubu","phone": "15016322097","socketId": "P3pIUbtB7tpFmmsZAAWC","status": "offline", "vibration": true}]};
      
      this.friendList = result;

      AsyncStorage.setItem(this.STORAGE_KEY_FRIEND_LIST, JSON.stringify(result));

      return result;
  }
}

export  default ProfileStore;
