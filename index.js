var getEle = (function(obj){
  return function(ele, isList){
    return isList ? obj.querySelectorAll(ele) : obj.querySelector(ele);
  }
})(window.document);

var conf = {
  plateformBox : getEle(".view-layer"),
  firstTai : getEle('#firstTai'),
  screenW : window.document.body.offsetWidth || widow.document.documentElement.clientWidth,
  screenH: window.document.body.offsetHeight || widow.document.documentElement.clientHeight,

  stepLenRange: [60,70,80,90,100,110,120,150],

  startX:150,
  startY:150,
  nextX:150,
  nextY:150,

  count:0,
  deg:0,
  timer:null,
  jump: getEle('.jump'),
  role: getEle(".role"),
}
/*生成坐标 */
function genAxies(noJump){
  //生成坐标
  var genRadomAxies = function(){
    var getRangeNum = function(obj){
      return obj.stepLenRange[Math.floor(Math.random()*obj.stepLenRange.length)];
    }
    conf.startX = conf.nextX;
    conf.startY = conf.nextY;
    conf.nextX += getRangeNum(conf);
    conf.nextY += getRangeNum(conf);

    var axies = [conf.startX,conf.startY,conf.nextX,conf.nextY];
    console.log(axies)
    conf.count++;
    var BoxMoveXY=[
      (-conf.nextX+ Math.floor(conf.screenW / 2)),
      (-conf.nextY+ Math.floor(conf.screenH / 2))
    ];
    conf.plateformBox.style.cssText = "transition:all .5s linear 1.1s;transform:translate("+BoxMoveXY[0]+"px,"+BoxMoveXY[1]+"px)";
    return axies; 
  }
  //生成站台
  var randomPlateform = function(noJump){
    var axies = genRadomAxies();
    var buildTpl = function(axis){
      console.log('build',axis)
      for(var i = 0; i < axis.length; i += 2){
        var odiv = document.createElement("div");
            odiv.setAttribute("class","plateform");
        var oimg = document.createElement("img");
            oimg.setAttribute("src","tai.png");
        odiv.appendChild(oimg);
        odiv.style.cssText="left:"+axis[i]+"px;top:"+axis[i+1]+"px;";
        conf.plateformBox.appendChild(odiv);
      }
    }
    if(conf.startX == conf.startY){
      buildTpl(axies);
    }else{
      buildTpl([axies[2],axies[3]]);
    }
    /* 调用翻身动画 */
    !noJump ? jumpAnimate(axies,900) : false;
  }
  /*真正开始运行 */
  randomPlateform(noJump);
}

/*跳动动画*/
function jumpAnimate(axis,topLen){
  cancelAnimationFrame(conf.timer); 
  conf.timer = requestAnimationFrame(function fn() {
    if (conf.deg <= 360*conf.count) {
      if(conf.deg < 180*(2*conf.count-1)){
          conf.role.style.cssText="left:"+axis[0]+"px;top:"+ (axis[1]-65-topLen)+"px;transform:rotate("+conf.deg+"deg)";
      }else{
          conf.role.style.cssText="left:"+axis[0]+"px;top:"+(axis[1]-65)+"px;transform:rotate("+conf.deg+"deg)";
      }
      conf.deg +=20;
      conf.timer = requestAnimationFrame(fn);
    } else {
      cancelAnimationFrame(conf.timer);
    }
  }); 
}

window.onload = function(){
  genAxies();
  conf.jump.onclick = function(){
    conf.jump.style.display="none";
    genAxies();
    setTimeout(function(){
      conf.jump.style.display="";
    },1500)
  }
}
