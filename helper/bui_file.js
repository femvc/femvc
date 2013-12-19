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
 * @name HTML5文件上传
 * @public
 * @author wanghaiyang
 * @date 2013/08/08
 */
define('./bui.File', ['./bui'], function(){

bui.File = {
    uploadFile: function(elem){
        var server = elem.getAttribute('server');
        // elem
        function uploadComplete(result) {
            var data = (new Function('return '+result.target.responseText))();
            bui.File.uploadComplete();
            elem.setAttribute('url', data.result);
            elem.onfinish();
        }
        
        var fd = new FormData();
        fd.append('fileData', elem.files[0]);  
        
        var xhr = new XMLHttpRequest();  
        xhr.upload.addEventListener('progress', bui.File.uploadProgress, false);  
        xhr.addEventListener('load', uploadComplete, false);  
        xhr.addEventListener('error', bui.File.uploadFailed, false);  
        xhr.addEventListener('abort', bui.File.uploadCanceled, false);  
        xhr.open('POST', server );  
        xhr.send(fd);  
        //uploadComplete({target:{responseText:'{result:"http://www.jiepang.com/767676676767"}'}});
    }, 
    uploadProgress: function (evt) {  
        /*if (evt.lengthComputable) {  
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);  
            bui.bocument.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';  
        }  
        else {  
            bui.bocument.getElementById('progressNumber').innerHTML = 'unable to compute';  
        }*/
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);  
            var text = percentComplete.toString() + '%'+' uploaded.';
            if (bui.Pnotify) {
                bui.Pnotify.show(text, 'always', 'top: 60px;');
            }
            else {
                bui.bocument.oldTitle = bui.bocument.oldTitle ? bui.bocument.oldTitle : bui.bocument.title;
                bui.bocument.title = text;
            }
        }
    },
    /**
     * @name 上传结束时调用(随后会自动调用FileInput.onfinish())
     * @private
     */
    uploadComplete: function (evt) {  
        /* This event is raised when the server send back a response */  
        //alert(evt.target.responseText);
        var text = 'Uploaded success.';
        if (bui.Pnotify) {
            bui.Pnotify.show(text, 'default', 'top: 20px;');
        }
        else {
            bui.bocument.title = text;
            bui.window.setTimeout('bui.bocument.title = bui.bocument.oldTitle', 500);
        }
    },
    uploadFailed: function (evt) {  
        alert('There was an error attempting to upload the file.');  
    },  

    uploadCanceled: function (evt) {  
        alert('The upload has been canceled by the user or the browser dropped the connection.');  
    }
};

});

