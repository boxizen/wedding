/**
 * 返回角度
 * @return num
 * */
function GetSlideAngle(dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI;
}

/**
* 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动  
* 
* */
function GetSlideDirection(startX, startY, endX, endY) {
  var dy = startY - endY;
  var dx = endX - startX;
  var result = 0;
  //如果滑动距离太短  
  if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
    return result;
  }

  var angle = GetSlideAngle(dx, dy);
  if (angle >= 45 && angle < 135) {
    result = 1;
  } else if (angle >= -135 && angle < -45) {
    result = 2;
  }
  return result;
}

//滑动处理  
var startX, startY;

exports.swipeInit = function (cb) {
  //获取开始坐标
  document.addEventListener('touchstart', function (ev) {
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
  }, false);
  //获取结束坐标
  document.addEventListener('touchend', function (ev) {
    var endX, endY;
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    var direction = GetSlideDirection(startX, startY, endX, endY);
    if(typeof cb === "function" && (direction === 1 || direction === 2)) {
      cb(direction === 1 ? 'up' : 'down')
    }
  }, false);
}
