/*
 *	YyOPML
 *  Created by Dexter.Yy(http://www.limboy.com) on 2008-05-25.
 */
$(function(){
	var lastCSS = null;
	var theme = location.hash ? $.parseUrlHash(location.hash)[0].theme : '';
	theme = theme || "panel";
	var switchTheme = function(s){
		var css = $('link[@rel=stylesheet]')[0];
		css.href = css.href.match(/.+(?=_\w+\.css)/) + "_" + s + ".css";
		var csstimer = setInterval(function(){
			var s = document.styleSheets[0];
			var rules = s.cssRules || s.rules;
			if( rules.length > 5 ) {
				clearInterval(csstimer);
				$(".list").scrollbar(34);
			}
		},200);
	};
	
	$("#theme li").each(function(){
		var a = this.getElementsByTagName("A")[0];
		var file = $.parseUrlHash( $(a).attr("href") )[0].theme;
		if( file == theme ) {
			lastCSS = a;
			a.className = "on";
			switchTheme( file );
		}
		a.onclick = function(){
			if(lastCSS == this) return;
			if(lastCSS)
				lastCSS.className = "";
			lastCSS = this;
			lastCSS.className = "on";
			switchTheme( file );
		};
	});
	
	$(".sort").each(function(){
		var text = $.addElm("SPAN");
		text.innerHTML = "Total: " + $(this).$(".feed").length;
		var t = $(this).$("h2")[0].appendChild(text);
	});
	
	var lastfeed = null;
	var switchFeed = function(o, h, c) {
		$.animate( o, { height: h }, 200, function(){
			$(o.parentNode).scrollbar(34);
		});
		o.className = c;
	};
	
	$(".feed_name").bind("click", function(){
		var box = this.parentNode.parentNode;
		if( parseInt(box.style.height) > 100 ) {
			switchFeed( box, 24, "feed" );
			lastfeed = null;
			return false;
		}
		
		if(lastfeed)
		 	switchFeed( lastfeed, 24, "feed" );
		lastfeed = box;
		box.style.height = "24px";
		switchFeed( box, 104, "feed chosen" );
		return false;
	});
	
	$(".list").scrollbar(34);
});


TUI.fn.scrollbar = function(oh){
	$.each(this, function(){
		var inner = this, 
			fix = oh || 0,
			BOXH = inner.parentNode.offsetHeight, 
			innerH = inner.offsetHeight,
			scale = ( BOXH - fix ) / innerH,
			d = 0,
			top = $.pos.elementTop(inner.parentNode);
		var s = inner.parentNode.lastChild;
		if( s.className != "scrollbar" ) {
			s = TUI.addElm("SPAN",{ className: "scrollbar" });
			inner.parentNode.appendChild(s);
		}
		if( scale * BOXH  >= BOXH - fix )
			s.style.display = "none";
		else {
			s.style.display = "";
			s.style.height = scale * BOXH + "px";
			
			if(!inner.style.top) inner.style.top = "0px";
			s.style.top = 0 - parseFloat(inner.style.top)*scale + fix + "px";

			s.onmousedown = function(e){
				e = $.event.fix(e);
				e.stopPropagation();
				e.preventDefault();
				startScroll(e);
			};

			if (window.addEventListener)
				inner.parentNode.addEventListener('DOMMouseScroll', onWheel, false);
			inner.parentNode.onmousewheel = onWheel;
		}
		
		function startScroll(e){
			d = e.pageY - $.pos.elementTop(s);
			$(document.body).bind("mousemove", moveScroll);
			$(document.body).bind("mouseup", stopScroll);
		}

		function stopScroll(){
			$(document.body).unbind("mousemove", moveScroll);
			$(document.body).unbind("mouseup", stopScroll);
		}
		
		function moveScroll(e){
			e.stopPropagation();
			e.preventDefault();
			var l = e.pageY - top - d;
			changeY(l);
		}
		
		function changeY(v){
			v = v > ( 1 - scale ) * BOXH + 3 && ( 1 - scale ) * BOXH + 3 || v < fix && fix || v;
			s.style.top = v + "px";
			inner.style.top = 0 - ( v - fix ) / scale + "px";
		}
		
		function onWheel(e){
			if(s.style.display == "none") return;
			var delta = 0;
		    e = $.event.fix(e);
		    if (e.wheelDelta) { /* IE/Opera. */
		    	delta = e.wheelDelta/120;
		        	if ($.browser.opera)
		            	delta = -delta;
		    } else if (e.detail) /** Mozilla */
		        delta = -e.detail;
			if (delta)
				changeY( parseFloat(s.style.top) - delta*4 );
		    e.stopPropagation();
			e.preventDefault();
		}

	});
};
