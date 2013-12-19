'use strict';

define('./router', ['./bui.Router'], function(){

bui.Router.setRule('/', 'taskboard');

bui.Router.setRule('/taskboard', 'taskboard');

bui.Router.setRule('/301', 'page301');

});


