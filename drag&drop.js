(function(e,t,n){"use strict";var r=t.module("ngDragDrop",[]).service("ngDragDropService",["$timeout","$parse",function(i,s){this.callEventCallback=function(e,t,n,r){function f(t){var n=t.indexOf("(")!==-1?t.indexOf("("):t.length,r=t.lastIndexOf(")")!==-1?t.lastIndexOf(")"):t.length,i=t.substring(n+1,r),o=t.match(/^[^.]+.\s*/)[0].slice(0,-1);o=e[o]&&typeof e[o].constructor==="function"?o:null;return{callback:t.substring(o&&o.length+1||0,n),args:(i&&i.split(",")||[]).map(function(t){return s(t)(e)}),constructor:o}}if(!t)return;var i=f(t),o=i.callback,u=i.constructor,a=[n,r].concat(i.args);e.$apply((e[o]||e[u][o]).apply(e,a))};this.invokeDrop=function(e,s,o,u){var a="",f="",l={},c={},h=null,p={},d={},v,m,g=null,y=s.scope(),b=e.scope();a=e.ngattr("ng-model");f=s.ngattr("ng-model");v=b.$eval(a);m=y.$eval(f);g=s.find("[jqyoui-draggable]:last,[data-jqyoui-draggable]:last");c=y.$eval(s.attr("jqyoui-droppable")||s.attr("data-jqyoui-droppable"))||[];l=b.$eval(e.attr("jqyoui-draggable")||e.attr("data-jqyoui-draggable"))||[];l.index=this.fixIndex(b,l,v);c.index=this.fixIndex(y,c,m);h=t.isArray(v)?l.index:null;p=t.copy(t.isArray(v)?v[h]:v);if(t.isArray(m)&&c&&c.index!==n){d=m[c.index]}else if(!t.isArray(m)){d=m}else{d={}}d=t.copy(d);if(l.animate===true){this.move(e,g.length>0?g:s,null,"fast",c,null);this.move(g.length>0&&!c.multiple?g:[],e.parent("[jqyoui-droppable],[data-jqyoui-droppable]"),r.startXY,"fast",c,t.bind(this,function(){i(t.bind(this,function(){e.css({position:"relative",left:"",top:""});g.css({position:"relative",left:"",top:"",display:""});this.mutateDraggable(b,c,l,a,f,d,e);this.mutateDroppable(y,c,l,f,p,h);this.callEventCallback(y,c.onDrop,o,u)}))}))}else{i(t.bind(this,function(){this.mutateDraggable(b,c,l,a,f,d,e);this.mutateDroppable(y,c,l,f,p,h);this.callEventCallback(y,c.onDrop,o,u)}))}};this.move=function(t,r,i,s,o,u){if(t.length===0){if(u){e.setTimeout(function(){u()},300)}return false}var a=9999,f=t[o.containment||"offset"](),l=r&&r.is(":visible"),c=r.hasClass("ng-hide");if(i===null&&r.length>0){if((r.attr("jqyoui-draggable")||r.attr("data-jqyoui-draggable"))!==n&&r.ngattr("ng-model")!==n&&r.is(":visible")&&o&&o.multiple){i=r[o.containment||"offset"]();if(o.stack===false){i.left+=r.outerWidth(true)}else{i.top+=r.outerHeight(true)}}else{if(c)r.removeClass("ng-hide");i=r.css({visibility:"hidden",display:"block"})[o.containment||"offset"]();r.css({visibility:"",display:l?"block":"none"})}}t.css({position:"absolute","z-index":a}).css(f).animate(i,s,function(){if(c)r.addClass("ng-hide");if(u)u()})};this.mutateDroppable=function(e,n,r,i,o,u){var a=e.$eval(i);e.dndDragItem=o;if(t.isArray(a)){if(n&&n.index>=0){a[n.index]=o}else{a.push(o)}if(r&&r.placeholder===true){a[a.length-1]["jqyoui_pos"]=u}}else{s(i+" = dndDragItem")(e);if(r&&r.placeholder===true){a["jqyoui_pos"]=u}}};this.mutateDraggable=function(e,r,i,o,u,a,f){var l=t.equals(a,{}),c=e.$eval(o);e.dndDropItem=a;if(i&&i.placeholder){if(i.placeholder!="keep"){if(t.isArray(c)&&i.index!==n){c[i.index]=a}else{s(o+" = dndDropItem")(e)}}}else{if(t.isArray(c)){if(l){if(i&&i.placeholder!==true&&i.placeholder!=="keep"){c.splice(i.index,1)}}else{c[i.index]=a}}else{s(o+" = dndDropItem")(e);if(e.$parent){s(o+" = dndDropItem")(e.$parent)}}}f.css({"z-index":"",left:"",top:""})};this.fixIndex=function(e,r,i){if(r.applyFilter&&t.isArray(i)&&i.length>0){var s=e[r.applyFilter](),o=s[r.index],u=n;i.forEach(function(e,n){if(t.equals(e,o)){u=n}});return u}return r.index}}]).directive("jqyouiDraggable",["ngDragDropService",function(e){return{require:"?jqyouiDroppable",restrict:"A",link:function(n,i,s){var o,u,a;var f=function(f,l){if(f){o=n.$eval(i.attr("jqyoui-draggable")||i.attr("data-jqyoui-draggable"))||{};u=n.$eval(s.jqyouiOptions)||{};i.draggable({disabled:false}).draggable(u).draggable({start:function(i,s){a=t.element(u.helper?s.helper:this).css("z-index");t.element(u.helper?s.helper:this).css("z-index",9999);r.startXY=t.element(this)[o.containment||"offset"]();e.callEventCallback(n,o.onStart,i,s)},stop:function(r,i){t.element(u.helper?i.helper:this).css("z-index",a);e.callEventCallback(n,o.onStop,r,i)},drag:function(t,r){e.callEventCallback(n,o.onDrag,t,r)}})}else{i.draggable({disabled:true})}};n.$watch(function(){return n.$eval(s.drag)},f);f();i.on("$destroy",function(){i.draggable("destroy")})}}}]).directive("jqyouiDroppable",["ngDragDropService",function(e){return{restrict:"A",priority:1,link:function(n,r,i){var s;var o=function(o,u){if(o){s=n.$eval(t.element(r).attr("jqyoui-droppable")||t.element(r).attr("data-jqyoui-droppable"))||{};r.droppable({disabled:false}).droppable(n.$eval(i.jqyouiOptions)||{}).droppable({over:function(t,r){e.callEventCallback(n,s.onOver,t,r)},out:function(t,r){e.callEventCallback(n,s.onOut,t,r)},drop:function(r,o){if(t.element(o.draggable).ngattr("ng-model")&&i.ngModel){e.invokeDrop(t.element(o.draggable),t.element(this),r,o)}else{e.callEventCallback(n,s.onDrop,r,o)}}})}else{r.droppable({disabled:true})}};n.$watch(function(){return n.$eval(i.drop)},o);o();r.on("$destroy",function(){r.droppable("destroy")})}}}]);$.fn.ngattr=function(e,n){var r=t.element(this).get(0);return r.getAttribute(e)||r.getAttribute("data-"+e)}})(window,window.angular)

var app = angular.module('drag-and-drop', ['ngDragDrop']);

app.controller('oneCtrl', function($scope, $timeout) {
	$scope.list1 = [];
	$scope.list2 = [];
	$scope.list3 = [];
	$scope.list4 = [];
	$scope.list5 = [];


	$scope.list0 = [
	  { 'title': 'SearchBar', 'drag': true, 'code': '<p>Test</p>' },
	  { 'title': 'CatList', 'drag': true, 'code': '<p>TestCat</p>' },
	  { 'title': 'ConsultBox', 'drag': true, 'code': '<p>TestConsult</p>' },
	  { 'title': 'ImportantBox', 'drag': true, 'code': '<p>TestImport</p>' },
	];

var fileToProduct = "";

$scope.affList = function(){
	for(var i =0; i<$scope.list2.length; i++)
		console.log($scope.list2[i].title);
	// fileToProduct = $scope.list2[i].code;
	// console.log(fileToProduct)
}
	

// Limit items to be dropped in list1
	$scope.optionsList1 = {
	  accept: function(dragEl) {
	    if ($scope.list1.length >= 2) {
	      return false;
	    } else {
	      return true;
	    }
	  }
	};
});
