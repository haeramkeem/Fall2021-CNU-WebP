# 08 - JQuery, AJAX
#opencse/웹프로그래밍

## CDN Installation
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
```
- - - -
## Basic
### Document onload
```
$(document).ready(function() {
	// JQueries
});
```
```
$(function() {
	// JQueries
});
```
### Selector
```
$(css-selector).JQueryMethod();
```
- - - -
## Event listener
1. [`$(el).click(listner: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_click)
2. [`$(el).dblclick(listner: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dblclick)
3. [`$(el).mouseenter(listner: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_mouseenter)
4. [`$(el).mouseleave(listner: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_mouseleave)
5. [`$(el).mousedown(listner: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_mousedown)
6. [`$(el).mouseup(listner: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_mouseup)
7. [`$(el).hover(listner: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_hover)
8. [`$(el).focus(listner: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_focus_blur)
9. [`$(el).blur(listner: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_focus_blur)
10. [`$(el).on({event: () => void})`](https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_on_multiple)
- - - -
## Effects
1. [`$(el).hide(speed: string | number, callback: () => void);`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_hide_slow)
2. [`$(el).show(speed: string | number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_hide_slow)
3. [`$(el).toggle(speed: string | number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_toggle)
4. [`$(el).fadeIn(speed: string | number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_fadein)
5. [`$(el).fadeOut(speed: string | number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_fadeout)
6. [`$(el).fadeToggle(speed: string | number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_fadetoggle)
7. [`$(el).fadeTo(speed: string | number, opacity: number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_fadeto)
8. [`$(el).slideDown(speed: string | number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_slide_down)
9. [`$(el).slideUp(speed: string | number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_slide_up)
10. [`$(el).slideToggle(speed: string | number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_slide_toggle)
11. [`$(el).animate({cssProperty: string}, speed: string | number, callback: () => void)`](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_animation1_multicss)
12. [`$(el).stop(stopAll?: bool, goToEnd?: bool)`](https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_stop_slide)
- - - -
## HTML, CSS Suppport
### Inner Values
* [text(), html()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_html_get)
* [val()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_val_get)
* [attr()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_attr_get)
### DOM
* [append()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_append)
* [prepend()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_prepend)
* [after()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_after)
* [remove()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_remove)
* [empty()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_empty)
### CSS
* [addClass()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_addclass2)
* [removeClass()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_removeclass)
* [toggleClass()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dom_toggleclass)
* [css(“property”)](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_css_getcolor), [css(“property”, “value”)](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_css_setcolor)
### Box model
* [width(), height()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_css_setcolor)
* [innerWidth(), innerHeight()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dim_innerwidth_height)
* [outerWidth(), outerHeight()](https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dim_outerwidth_height)
* [browser width, height](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_dim_width_height2)
### Traverse
* [parent()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_parent)
* [children()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_children)
* [find()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_find)
* [siblings()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_siblings)
* [next](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_next)
* [nextAll()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_nextall)
* [nextUntil()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_nextuntil)
* [first()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_first)
* [last()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_last)
* [filter()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_filter)
* [not()](http://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_not)