// sha-memory.js
// https://github.com/suhacerci/sha-memory.git
// Copyright (c) 2017, Süha Çerçi
// Released under the MIT license
;(function($){



var Esbul = {


init : function(opt, dis){
var self = this;
self.dis = dis;
self.$dis = $(dis);
self.moveCounter = 0;
self.settings = $.extend(true, {}, $.fn.memory.settings, opt);
self.squareVariables = [64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95];
self.fullArray = [];
if(self.gameNormalize() === false) {alert('detect unable parameters! please make sure square counts are even'); return false;}
self.createBoard();
self.configure();
self.allEvents();


},
gameNormalize : function() {
	if ((this.settings.level) % 2 !== 0)
		return false;

	if (this.settings.level === 0)
		return false;

	if (this.settings.level > 6)
		this.settings.level = 6;

	return true;
},
createBoard : function() {
var self = this;
self.$dis.empty().append("<div class='row'></div>");	
var target = self.$dis.find('.row');
var count_square = 12/self.settings.level;
var count_timer = 0;
for (var i = 0, l = self.settings.level; i < l; ++i) {



  for (var j = 0, n = self.settings.level; j < n; ++j) {

target.append("<div class='active text-center col-xs-"+count_square+"' data-status='closed' data-target="+count_timer+"><span class='letter'>"+self.settings.char+"</span></div>");
count_timer++;
      
  }
  target.append("<div class='clearfix'></div>");

    
}



},
configure : function() {
	var half = (this.settings.level*this.settings.level)/2;
	var halfFirst = new Array(half);
	var halfSecond = new Array(half);


this.$dis.find('.row>div').css("height",this.$dis.find('.row>div:first-child').innerWidth());	
this.$dis.find('.letter').css('font-size',this.$dis.find('.row>div:first-child').width()-20+"px");



for (var i = 0, l = half; i < l; ++i) {
var randomIndex = Math.floor((Math.random() * this.squareVariables.length));	
halfFirst[i] = String.fromCharCode(this.squareVariables[randomIndex]);
this.squareVariables.splice(randomIndex,1);
    
}

for (var j = 0, n = half; j < n; ++j) {
	halfSecond[j] = halfFirst[j];
    
}

this.randomize(halfSecond);
this.fullArray = halfFirst.concat(halfSecond);
console.log(this.fullArray);

},
randomize : function(a) {
	    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
},
allEvents : function() {
var _this = this;
this.$dis.find(".active").on('click', function(event) {
	event.preventDefault();
	var $this = $(this);
var openedTarget = _this.$dis.find('.active[data-status="opened"]');

if(openedTarget.length >= 2){
_this.undoMoves(openedTarget).markSquare($this);

}
else if(openedTarget.length == 1){
_this.markSquare($this).checkDouble(openedTarget, $this).isGameOver();

}
else{
_this.markSquare($this);
}

	
});

},
checkDouble: function(a,b) {
	var targetA = a.data('target');
	var targetB = b.data('target');
if (this.fullArray[targetA] === this.fullArray[targetB] && targetA != targetB) {
a.removeClass('active').find('.letter').addClass('checked shaking');
b.removeClass('active').find('.letter').addClass('checked shaking');
return this;
}


},
undoMoves: function(t) {
t.attr('data-status','closed').find('.letter').text(this.settings.char).removeClass('opened').css('opacity','0.3');
return this;

},
markSquare: function(t) {
var target = t.attr('data-target');
t.attr('data-status','opened');
t.find('.letter').text(this.fullArray[target]).addClass('opened').css('opacity','1');
return this;
},

isGameOver: function() {
var _this = this;
this.$dis.find('.active').length === 0 && setTimeout(function() {
	alert('GAME IS OVER');
	_this.init({level:4},_this.dis);
}, 600);
}



};





$.fn.memory = function(options){


return this.each(function() {
	
var esbul = Object.create(Esbul);
esbul.init(options, this);



});



};



$.fn.memory.settings = {
level:4,
char : '?'

};




})(jQuery);

$("#esbul").memory({
	level:4
});