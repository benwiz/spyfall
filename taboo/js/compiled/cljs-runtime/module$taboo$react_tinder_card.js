shadow$provide.module$taboo$react_tinder_card=function(global,require,module,exports){var React=require("module$node_modules$react$index"),sleep=require("module$node_modules$p_sleep$index"),animateOut=function(element,speed){var JSCompiler_object_inline_x_1429,JSCompiler_object_inline_y_1430,startPos,diagonal,velocity,time,multiplier,translateString,rotateString;return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context){startPos=getTranslate(element);var elementStyles=
window.getComputedStyle(document.body),widthString=elementStyles.getPropertyValue("width");widthString=Number(widthString.split("px")[0]);elementStyles=elementStyles.getPropertyValue("height");elementStyles=Number(elementStyles.split("px")[0]);JSCompiler_object_inline_x_1429=widthString;JSCompiler_object_inline_y_1430=elementStyles;diagonal=Math.sqrt(Math.pow(JSCompiler_object_inline_x_1429,2)+Math.pow(JSCompiler_object_inline_y_1430,2));velocity=Math.sqrt(Math.pow(speed.x,2)+Math.pow(speed.y,2));
time=diagonal/velocity;multiplier=diagonal/velocity;translateString=translationString(speed.x*multiplier+startPos.x,-speed.y*multiplier+startPos.y);rotateString="rotate("+getRotation(element)+"deg)";element.style.transition="ease-out "+time+"s";element.style.transform=translateString+rotateString;return $jscomp$generator$context.yield(sleep(1E3*time),0)})},animateBack=function(element){element.style.transition="300ms";var startingPoint=getTranslate(element);startingPoint=translationString(-.2*startingPoint.x,
-.2*startingPoint.y);var rotation="rotate("+-.2*getRotation(element)+"deg)";element.style.transform=startingPoint+rotation;setTimeout(function(){element.style.transform="none"},225);setTimeout(function(){element.style.transition="10ms"},300)},getSwipeDirection=function(speed){return Math.abs(speed.x)>Math.abs(speed.y)?0<speed.x?"right":"left":0<speed.y?"up":"down"},calcSpeed=function(oldLocation,newLocation){var dt=(newLocation.time-oldLocation.time)/1E3;return{x:(newLocation.x-oldLocation.x)/dt,
y:(oldLocation.y-newLocation.y)/dt}},translationString=function(x,y){return"translate("+x+"px, "+y+"px)"},getTranslate=function(element){element=window.getComputedStyle(element);element=new WebKitCSSMatrix(element.webkitTransform);return{x:element.m41,y:element.m42}},getRotation=function(element){element=window.getComputedStyle(element);element=new WebKitCSSMatrix(element.webkitTransform);return-Math.asin(element.m21)/(2*Math.PI)*360},dragableTouchmove=function(coordinates,element,offset,lastLocation){var JSCompiler_object_inline_x_1082=
coordinates.x+offset.x;offset=coordinates.y+offset.y;coordinates={x:JSCompiler_object_inline_x_1082,y:offset,time:(new Date).getTime()};JSCompiler_object_inline_x_1082=translationString(JSCompiler_object_inline_x_1082,offset);lastLocation="rotate("+calcSpeed(lastLocation,coordinates).x/1E3*5+"deg)";element.style.transform=JSCompiler_object_inline_x_1082+lastLocation;return coordinates},touchCoordinatesFromEvent=function(e){e=e.targetTouches[0];return{x:e.clientX,y:e.clientY}},swipeAlreadyReleased=
!1;module.exports={TinderCard:function($jscomp$destructuring$var0){var flickOnSwipe=void 0===$jscomp$destructuring$var0.flickOnSwipe?!0:$jscomp$destructuring$var0.flickOnSwipe,children=$jscomp$destructuring$var0.children,onSwipe=$jscomp$destructuring$var0.onSwipe,onCardLeftScreen=$jscomp$destructuring$var0.onCardLeftScreen,className=$jscomp$destructuring$var0.className,preventSwipe=void 0===$jscomp$destructuring$var0.preventSwipe?[]:$jscomp$destructuring$var0.preventSwipe,handleSwipeReleased=function(element,
speed){return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context){if(1==$jscomp$generator$context.nextAddress){if(swipeAlreadyReleased)return $jscomp$generator$context.return();swipeAlreadyReleased=!0;if(!(300<Math.abs(speed.x)||300<Math.abs(speed.y)))return animateBack(element),$jscomp$generator$context.jumpTo(0);onSwipe(getSwipeDirection(speed));return!flickOnSwipe||preventSwipe.includes(getSwipeDirection(speed))?(animateBack(element),$jscomp$generator$context.jumpTo(0)):
$jscomp$generator$context.yield(animateOut(element,speed),5)}element.style.display="none";onCardLeftScreen();$jscomp$generator$context.jumpToEnd()})};$jscomp$destructuring$var0=React.useCallback(function(element){if(element){var offset={x:null,y:null},speed={x:0,y:0},lastLocation={x:0,y:0,time:(new Date).getTime()},mouseIsClicked=!1;element.addEventListener("touchstart",function(ev){ev.preventDefault();swipeAlreadyReleased=!1;offset={x:-touchCoordinatesFromEvent(ev).x,y:-touchCoordinatesFromEvent(ev).y}});
element.addEventListener("mousedown",function(ev){ev.preventDefault();mouseIsClicked=!0;swipeAlreadyReleased=!1;offset={x:-ev.clientX,y:-ev.clientY}});element.addEventListener("touchmove",function(ev){ev.preventDefault();ev=dragableTouchmove(touchCoordinatesFromEvent(ev),element,offset,lastLocation);speed=calcSpeed(lastLocation,ev);lastLocation=ev});element.addEventListener("mousemove",function(ev){ev.preventDefault();mouseIsClicked&&(ev=dragableTouchmove({x:ev.clientX,y:ev.clientY},element,offset,
lastLocation),speed=calcSpeed(lastLocation,ev),lastLocation=ev)});element.addEventListener("touchend",function(ev){ev.preventDefault();handleSwipeReleased(element,speed)});element.addEventListener("mouseup",function(ev){mouseIsClicked&&(ev.preventDefault(),mouseIsClicked=!1,handleSwipeReleased(element,speed))});element.addEventListener("mouseleave",function(ev){mouseIsClicked&&(ev.preventDefault(),mouseIsClicked=!1,handleSwipeReleased(element,speed))})}});return React.createElement("div",{ref:$jscomp$destructuring$var0,
className:className},children)}}}
//# sourceMappingURL=module$taboo$react_tinder_card.js.map
