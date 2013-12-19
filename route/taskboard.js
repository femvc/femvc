'use strict';
define('./taskboard', [], function(){

window.productList = [
    {
        product_id : 'product0001',
        product_name: 'Campus - Jiepang Team',
        shortkey: 'WEILO'
    }
];
window.sprintList = [
    {
        sprint_id: 'sprint0001',
        sprint_name: '[WEILOO] Phase 1 - Basic Fuctional (2013.12.11-2014.02.16)',
        product_id : 'product0001'
    }
];
window.backlogList = [
    {
        backlog_id: 'backlog0001',
        backlog_name: 'Login/Logout',
        index: 1,
        product_id: 'product0001',
        sprint_id: 'task00001'
    }
];
window.taskList = [
    {
        product_id: 'product0001',
        sprint_id: 'task00001',
        backlog_id: 'task00001',
        task_id: 'task00001',
        task_name: '[Android]发送请求到服务器端',
        task_description: '客户端和服务器端都需要验证用户名、密码的有效性',
        task_person: 'andy.wang',
        task_status: 'not_started',
        task_remaining: '2',
        task_estimate: '6',
        task_comments: 'no comments.'
    }
];
window.users = [
    {username:'andy.wang',  realname:'王海洋'},
    {username:'jicheng.li', realname:'李吉成'}
];


var taskboard = function(){
    bui.Action.call(this);
    /**
     * @name Action索引ID
     * @comment 主要用于控件中通过onclick="bui.Control.getById('listTable','login');
     */
    this.id = 'list';
    this.view = 'taskboard_layout';
    /**
     * @name 初始化数据模型
     */
    this.model = new bui.BaseModel({});
    this.BACK_LOCATION = '/login';
};
    
taskboard.prototype = {
    initModel: function(callback){
        var me = this;
        // me.getVenuesAll(callback);
        callback&&callback();
    },
    /**
     * @name 初始化列表行为
     * @param {Object} controlMap 当前主内容区域绘制的控件集合.
     */
    initBehavior: function(controlMap) {
        var me = this;
        // bui.Action.get().controlMap.vModal2.show();
        // me.controlMap.submit.onclick = bui.fn(me.onSubmit, me);
    },
    addTask: function(obj) {
        var me = this;
        //alert(obj.id);
        
        var options = [{value:'', text:'(unspecified)'}];
        for (var i=0,len=users.length; i<len; i++) {
            options.push({
                value: users[i].username,
                text: users[i].realname + '(' + users[i].username + ')'
            });
        }
        
        var nc = bui.Control.getById('ff', me);
        
        if (!nc) {
            nc = bui.Control.create('Modal', {
                id:'ff', 
                title:' Add Task to ' + backlogList[0].backlog_name + '', 
                contentView: 'taskboard_addtask', 
                size: { width:'750px', height: '500px', bottom: '8%'}
            });
            
            nc.appendSelfTo(this);
            nc.getByFormName('task_person').setOptions(options);
            
            nc.getByFormName('btn_cancel').onclick = new Function('bui.Action.get().controlMap[\''+nc.getId()+'\'].onAction(\'close\')');
            nc.getByFormName('btn_save').onclick = new Function('if(bui.Action.get().saveTask()!==false){bui.Action.get().controlMap[\''+nc.getId()+'\'].onAction(\'close\');}');
        }
        nc.setValueByTree(taskList[0]);
        nc.show();
    },
    saveTask: function () {
        var me = this;
        var nc = bui.Control.getById('ff', me);
        if (nc.validate()) {
            var task = nc.getParamMap();
            if (!nc.getByFormName('task_id').getValue()) {
                taskList.push(task);
            }
            else {
                for (var i=0,len=taskList.length; i<len; i++) {
                    if (taskList[i].task_id === task.task_id) {
                        taskList[i] = task;
                    }
                }
            }
        }
        else {
            return false;
        }
    }
};

bui.inherits(taskboard, bui.Action);

bui.window.taskboard = taskboard;
});

define('./page301', ['./bui', './bui.Action', './bui.Router'], function(){

/*============================================
 * 301 page
 ============================================*/
var page301;
page301 = function(){
    bui.Action.call(this);
    /**
     * @name Action索引ID
     * 
     * @comment 主要用于控件中通过onclick="bui.Control.getById('listTable','login');
     */
    this.id = 'page301';
    /**
     * @name 初始化数据模型
     */
    // 使用了getView这里可以不用设置view属性
    // this.view = 'page301';
    /**
     * @name 初始化数据模型
     */
    var baseModel = bui.Action.getExtClass('bui.BaseModel'); 
    this.model = new baseModel();   
};

page301.prototype = {
    getView: function(){
        var str = 'This is ${name}.<input ui="type:\'TextInput\',formName:\'aa\'" />';
        return str;
    },
    initModel: function(callback){
        var me = this;
        me.model.set('name', 'Andy');
        callback&&callback();
    },
    /**
     * @name 初始化列表行为
     *
     * @param {Object} controlMap 当前主内容区域绘制的控件集合.
     */
    initBehavior: function(controlMap) {
        var me = this;
        
    }
};

bui.inherits(page301, bui.Action);

bui.window.page301 = page301;

});