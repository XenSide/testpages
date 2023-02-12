//HEADER HOME

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
	this.temp= '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
	  if (fullTxt.substring(0, this.txt.length) === fullTxt && fullTxt!==''){
		  this.txt = fullTxt.concat('<span class=\"color\">'+"."+'</span>').substring(0, this.txt.length + 46)
	  }else{
		  this.txt = fullTxt.substring(0, this.txt.length + 1);
	  }
 }
	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt.concat('<span class=\"color\">'+"."+'</span>')) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};
window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};




//PROGRESS BAR
$(document).ready(function () {
	$(".progress-element").each(function() {
      var progressBar = $(".progress-bar");
      progressBar.each(function(indx){
          $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
  });

  $(".progress-element").each(function() {
      $(this).waypoint(function() {
      var progressBar = $(".progress-bar");
      progressBar.each(function(indx){
          $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
  }, {
      triggerOnce: true,
      offset: 'bottom-in-view'
    });
   });
});