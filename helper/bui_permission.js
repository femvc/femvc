'use strict';
//    ____     ____                _   _     ____          ____      ____                   
//  /\  __\  /\  __\    /'\_/`\  /\ \/\ \  /\  __`\      /\  __`\  /\  __`\    /'\_/`\      
//  \ \ \_/_ \ \ \_/_  /\      \ \ \ \ \ \ \ \ \ \_\     \ \ \ \_\ \ \ \ \ \  /\      \     
//   \ \  __\ \ \  __\ \ \ \_/\_\ \ \ \ \ \ \ \ \  __     \ \ \  __ \ \ \ \ \ \ \ \_/\_\    
//    \ \ \_/  \ \ \_/_ \ \ \\ \ \ \ \ \_/ \ \ \ \_\ \  __ \ \ \_\ \ \ \ \_\ \ \ \ \\ \ \   
//     \ \_\    \ \____/ \ \_\\ \_\ \ `\___/  \ \____/ /\_\ \ \____/  \ \_____\ \ \_\\ \_\  
//      \/_/     \/___/   \/_/ \/_/  `\/__/    \/___/  \/_/  \/___/    \/_____/  \/_/ \/_/  
//                                                                                          
//                                                                                          

/**
 * @name 权限管理类
 * @public
 * @author wanghaiyang
 * @date 2013/08/08
 */
define('./bui.Permission', ['./bui'], function(){

bui.Permission = {
    priorityList: {
        
    },
    /**
     * @name 检查用户跳转的目标URL是否有权限, 没有权限强制跳转到指定地址
     * @desc 
     */
    checkRouter: function(url, callback){
        // 获取过权限则直接处理
        //var loginStatus = bui.context.get('login') || _.getCookie('login');
        
        callback&&callback(url);
    },
    /**
     * @name 检查被请求的URL用户是否有权限
     * @desc 
     */
    checkRequest: function(url, opt_options){
        // Todo
        return [null, url]; // First param's default value is 'null', means 'permit'
    },
    /**
     * @name 更新用户权限状态
     * @desc 
     */
    updateStatus: function(data) {
        // Todo 
    }
};

});