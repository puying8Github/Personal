/**
 * Created by ThinkPad User on 2016/4/21.
 */

/**
 * Created by voyo on 2016/4/27.
 */
(function(){
    var slideMaxHeight=0;
    var fadeMaxHeight=0;
    //[初始方法]
    function _$(id){

        var s=id.substr(0,1);

        if(s=="#"){
            var ID=id.substr(1);
            this.ele = document.getElementById(ID);
        }
        else if(s=="."){
            var CLASS=id.substr(1);
            this.ele = document.getElementsByClassName(CLASS);
        }else{
            this.ele = document.getElementsByTagName(id);
        }
        return this;
    }

    function tranPropertyStr(str){
        var index = str.indexOf("-"),
            lower = str[index+1];

        if(index > -1){
            var newStr = str.replace("-"+lower, lower.toLocaleUpperCase());
            return newStr;
        }

        return str;
    }
    //[主方法]
    _$.prototype = {
        obj : null,
        itime : 0,
        maxHeight : 0,
        width:0,
        height:0,
        eq:function(n){
            this.ele=this.ele[n];
            return this;
        },
        setColor : function(c){
            this.ele.style.color = c;

            return this; // Important
        },

        setBold : function(){

            this.ele.style.fontWeight = "bold";

            return this; // Important
        },
        animateScoll:function(H,t){
            if(this.ele.scrollTop>H){
                clearTimeout(timer3);
                return;
            }
            this.ele.scrollTop=this.ele.scrollTop+1;
            var timer3=setTimeout(this.animateScoll(),t);
        },
        html:function(str){
            if(str){
                var _this=this.ele.innerHTML;
                return _this;
            }else{
                this.ele.innerHTML=str;
                return this;
            }
        },
        hasClass:function(cls) {
            return this.ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass:function( cls) {
            if (!this.hasClass(cls)) this.ele.className += " " + cls;
        },
        removeClass:function( cls) {
            if (this.hasClass(cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                this.ele.className = this.ele.className.replace(reg, ' ');
            }
        },
        click:function(callback){
            this.ele.addEventListener("click",callback)
        },
        css : function(param){
            //this为obj
            setCss(this.ele,param)
            return this;
        },
        show:function(){
            this.ele.style.display="inline-block";
        },
        hide:function(){
            this.ele.style.display="none";
        },
        slideDown: function(){
            if(parseInt(this.ele.style.height) > parseInt(slideMaxHeight)){
                clearTimeout(timer2);
                return;
            }
            this.ele.style.height = parseInt(this.ele.style.height) + 1 + 'px';
            var timer2=setTimeout(this.slideDown(),this.itime);

        },
        slideUp: function(){
            if(parseInt(this.ele.style.height) <1){
                this.ele.style.display = "none";
                clearTimeout(timer1);
                return;
            }
            this.ele.style.height = parseInt(this.ele.style.height) - 1 + 'px';
            var timer1=setTimeout(this.slideUp(),this.itime);

        },
        slide: function(itime){
            this.itime = itime;
            slideMaxHeight = slideMaxHeight ? slideMaxHeight :parseInt(this.ele.style.height);
            if(this.ele.style.display == "none"){
                this.ele.style.display = "block";
                this.ele.style.height = "0px";
                this.slideDown();
            }
            else {
                this.slideUp();
            }

            return this;
        },
        fadeIn: function(itime){
            this.itime = itime;
            var that = this;
            fadeMaxHeight =parseInt( this.ele.style.height);
            var i = 100;
            var timer = setInterval(function(){
                that.ele.style.cssText ="filter :alpha(opacity=" + i + ");-moz-opacity:"+i*0.01+";opacity: "+i*0.01+";height:"+fadeMaxHeight+"px;";
                i--;

                if(i == 0) clearInterval(timer);
            },that.itime);

            return this;
        },
        fadeOut: function(itime){
            this.itime = itime;
            var that = this;
            fadeMaxHeight =parseInt( this.ele.style.height);
            var i = 0;
            var timer = setInterval(function(){
                that.ele.style.cssText ="filter :alpha(opacity=" + i + ");-moz-opacity:"+i*0.01+";opacity: "+i*0.01+";height:"+fadeMaxHeight+"px;";
                i++;
                if(i ==100) clearInterval(timer);
            },that.itime);

            return this;
        },


        svgCircle:function(progress){
            /*
            *  <svg width="500px" height="500px" version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg">
                 <path id="ring" fill="#76B13C" />
                 <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
               </svg>
            *
            * */
            var w=parseInt(this.ele.offsetWidth);
            var h=parseInt(this.ele.offsetHeight);
            var r=w>h?h/2:w/2;
            var x=w/2-8;
            var y=h/2+5;
            var obj='<svg  version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg">';
                obj+='<path id="ring" fill="rgba(86,152,225,0.80)" />';
                obj+='<circle cx="'+w/2+'" cy="'+w/2+'" r="'+(r-5)+'" fill="rgba(51, 51, 51, 0.80)" />';
                obj+=' <image xlink:href="../icon/ring1.png" x="0" y="0" height="'+h+'" width="'+w+'"/> ';
                //obj+='<text style="fill:red;font-size:13px" x="'+x+'" y="'+y+'">'+progress+'%</text>';
                obj+='</svg>';
            this.ele.innerHTML=obj;
            var path=document.getElementById("ring");
            var w=this.width=parseInt(this.ele.offsetWidth);
            var h=this.height=parseInt(this.ele.offsetHeight);
            draw(path,progress,r)
        },
        slider:function(json){//这是滚动图片方法
            if(json.animations==1){
                sliderAnimations.Animations1(this,json)
            }
            else if(json.animations==2){
                sliderAnimations.Animations2(this,json)
            }

        }

    };
    var sliderAnimations={
        Animations1:function(_this,json){
            var w=json.width;
            var h=json.height;
            var l=json.imgSrc.length;
            _this.css({
                width:w+"px",
                height:h+'px',
                overflow:'hidden',
                position:'relative'
            });
            var ULobj=document.createElement('ul');
            setCss(ULobj,{
                float:'left',
                position:'absolute',
                top:0,
                left:0,
                width:w*l+'px'
            });

            for(var i=0;i<l;i++){
                console.log(json.imgHref[i]);
                var obj=document.createElement("li");
                setCss(obj,{
                    float:'left',
                    background:'#09e'
                });
                var info="<a href='"+json.imgHref[i]+"'><img src='"+json.imgSrc[i]+"'style=' display:block;width:"+w+"px;height: "+h+"px; '/></a>";
                obj.innerHTML=info;
                ULobj.appendChild(obj);
            }
            var divobj=document.createElement("div");
            setCss(divobj,{
                position:'absolute',
                bottom:'10px',
                right:'15px',
                height:'23px',
                zIndex:'2',
                color:'#fff',
                fontSize:'14px',
                fontWeight:'bold',
                verticalAlign:'middle',
                cursor:'pointer'
            })
            divobj.innerHTML='<span>向前</span><em>1</em>/<em>'+l+'</em><span>向后</span>';
            _this.ele.appendChild(ULobj);
            _this.ele.appendChild(divobj);
            sliderFun.photoAlbumn(ULobj,_this.ele,divobj);
        },
        Animations2:function(_this,json){
            var w=json.width;
            var h=json.height;
            var l=json.imgSrc.length;
            _this.css({
                width: w+'px',
                height: h+'px',
                overflow: 'hidden',
                position: 'relative',
             });
            var OlObj=document.createElement("ol");
            setCss(OlObj,{
                position: 'absolute',
                right: '5px',
                bottom: '5px',
                zIndex: 2
            });
            var UlObj=document.createElement("ul");
            setCss(UlObj,{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1
            });
            for(var i=0;i<l;i++){
                var liObj1=document.createElement("li");
                if(i==0){
                    liObj1.className="active";
                }
                liObj1.innerHTML=i+1;
                setCss(liObj1,{
                    float: 'left',
                    marginRight: '3px',
                    display: 'inline',
                    cursor: 'pointer',
                    background: '#fcf2cf',
                    border: '1px solid #f47500',
                    padding: '2px 6px',
                    color: '#d94b01',
                    fontFamily: 'arial',
                    fontSize: '12px'
                });
                var liObj2=document.createElement("li");
                liObj2.innerHTML='<a href="'+json.imgHref[i]+'"><img src="'+json.imgSrc[i]+'" alt="'+json.text[i]+'" style="float: left; width: '+w+'px; height: '+h+'px;" /></a>';
                setCss(liObj2,{
                    width: w+'px',
                    height: h+'px',
                    float: 'left'
                });
                OlObj.appendChild(liObj1);
                UlObj.appendChild(liObj2);
            }
            _this.ele.appendChild(OlObj);
            _this.ele.appendChild(UlObj);
            sliderFun.photoAlbumnUP(_this.ele,OlObj,UlObj,h)
        }
    };
    var sliderFun={
        photoAlbumn:function(photoObj,btnObj,numObj){
            var moveNum = 1,
                _void=true,
                cloneObj,nums,
                voidClone=false,
                //d=document,
                elem =photoObj,//ul-id
                btnObj=btnObj,//ul父级id
                numObj=numObj;//左右按钮id
            if (!elem) return false;
            if (!btnObj) return false;
            var elemObj = elem.getElementsByTagName("li"),
                autoWidth = elemObj[0].offsetWidth,
                btns = btnObj.getElementsByTagName("span"),
                max=elemObj.length;
            elem.style.width = (max+1)*autoWidth + "px";
            var numElement =function(){
                if(numObj){
                    nums = numObj.getElementsByTagName("em");
                    nums[1].innerHTML = max;
                    nums[0].innerHTML = moveNum;
                }
            }
            var moveElement =function(final_x,final_y,interval){
                _void = false;
                var step = function () {
                    if (elem.movement) clearTimeout(elem.movement);
                    if (!elem.style.left) elem.style.left = "0px";
                    if (!elem.style.top) elem.style.top = "0px";
                    var xpos = parseInt(elem.style.left);
                    var ypos = parseInt(elem.style.top);
                    //alert(xpos)
                    if (xpos == final_x && ypos == final_y) {
                        _void = true;
                        if(voidClone){
                            elem.style.left = (moveNum > 2)?(-(max-1)*autoWidth +"px"):"0px";
                            elem.removeChild(cloneObj);
                            voidClone = false;
                        }
                        return true;
                    }
                    if (xpos < final_x) {
                        var dist = Math.ceil((final_x - xpos)/10);
                        xpos = xpos + dist;
                    }
                    if (xpos > final_x) {
                        var dist = Math.ceil((xpos - final_x)/10);
                        xpos = xpos - dist;
                    }
                    if (ypos < final_y) {
                        var dist = Math.ceil((final_y - ypos)/10);
                        ypos = ypos + dist;
                    }
                    if (ypos > final_y) {
                        var dist = Math.ceil((ypos - final_y)/10);
                        ypos = ypos - dist;
                    }
                    elem.style.left = xpos + "px";
                    elem.style.top = ypos + "px";
                    elem.movement = setTimeout(function(){step()},interval);
                }
                elem.movement = setTimeout(function(){step()},interval);
            } ;
            var moveAutoShow = function (){
                moveNum++;
                if(moveNum > max){
                    cloneObj = elemObj[0].cloneNode(true);
                    elem.appendChild(cloneObj);
                    voidClone = true;
                }
                moveElement(-autoWidth*(moveNum-1),0,5);
                if(moveNum > max) moveNum=1;
                numElement();
            };
            var prepareSlideshow = function (){
                var moveAuto = setInterval(function(){moveAutoShow()},5000);
                btns[0].onmousedown = function() {
                    if(!_void) return false;
                    clearInterval(moveAuto);
                    moveNum--;
                    if(moveNum < 1){
                        cloneObj = elemObj[(max-1)].cloneNode(true);
                        cloneObj.style.cssText=";position:absolute;left:-" + autoWidth +"px";
                        elem.insertBefore(cloneObj,elemObj[0]);
                        voidClone = true;
                    }
                    moveElement(-autoWidth*(moveNum-1),0,5);
                    moveAuto = setInterval(function(){moveAutoShow()},5000);
                    if(moveNum < 1) moveNum=max;
                    numElement();
                }
                btns[1].onmousedown = function() {
                    if(!_void) return false;
                    clearInterval(moveAuto);
                    moveNum++;
                    if(moveNum > max){
                        cloneObj = elemObj[0].cloneNode(true);
                        elem.appendChild(cloneObj);
                        voidClone = true;
                    }
                    moveElement(-autoWidth*(moveNum-1),0,5);
                    moveAuto = setInterval(function(){moveAutoShow()},5000);
                    if(moveNum > max) moveNum=1;
                    numElement();
                }
            };
            numElement();
            prepareSlideshow();
        },
        photoAlbumnUP:function(oPlay,oOl,oUl,h){
            var aLi1=oOl.getElementsByTagName('li');
            var aLi2=oUl.getElementsByTagName('li');
            var i=iNum=direction=0;
            var times=null;
            var play=null;
            for(i=0;i<aLi1.length;i++)
            {
                aLi1[i].index=i;
                aLi1[i].onclick=function()
                {
                    iNum=this.index;
                    show();
                };
            }
            //按钮点击后调用的函数
            function show()
            {
                for(i=0;i<aLi1.length;i++)
                {
                    aLi1[i].className='';
                }
                aLi1[iNum].className='active';
                startMove(-(iNum*h));
            }
            //自动播放转向
            function autoPlay()
            {
                if(iNum>=aLi1.length-1)
                {
                    direction=1;
                }
                else if(iNum<=0)
                {
                    direction=0;
                }

                if(direction==0)
                {
                    iNum++;
                }
                else if(direction==1)
                {
                    iNum--;
                }
                show();
            }
            //自动播放
            play=setInterval(autoPlay,3000);

            //鼠标移入展示区停止自动播放
            oPlay.onmouseover=function()
            {
                clearInterval(play);
            };
            //鼠标移出展示区开启自动播放
            oPlay.onmouseout=function()
            {
                play=setInterval(autoPlay,3000);
            };

            function startMove(iTarget)
            {
                clearInterval(times);
                times=setInterval(function()
                {
                    doMove(iTarget);
                },30);
            }
            function doMove(iTarget)
            {

                var iSpeed=(iTarget-oUl.offsetTop)/10;
                iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

                if(oUl.offsetTop==iTarget)
                {
                    clearInterval(times)
                }
                else
                {
                    oUl.style.top=oUl.offsetTop+iSpeed+'px';
                }

            }
        }
    };
    function setCss(obj,json){//css方法
        for(var keys in json){
            if(keys.length && json.hasOwnProperty(keys)){
                obj.style[tranPropertyStr(keys)] = json[keys];
            }
        }
    }
   function draw(path,progress,r) {
        //path参数为绘图面板id，progress为进度值0-100，r为半径
        path.setAttribute('transform', 'translate('+r+','+r+')');
        var degrees = progress * (360/100);
        var rad = degrees* (Math.PI / 180);
        var x = (Math.sin(rad) * r).toFixed(2);
        var y = -(Math.cos(rad) * r).toFixed(2);
        var lenghty = window.Number(degrees > 180);
        var descriptions = ['M', 0, 0, 'v', -r, 'A', r, r, 0, lenghty, 1, x, y, 'z'];
        path.setAttribute('d', descriptions.join(' '));
    }
    window.puying = function(id){
        return new _$(id);
    }

})();

