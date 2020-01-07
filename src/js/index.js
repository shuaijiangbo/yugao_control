particlesJS('particles-js',

    {
        "particles": {
            "number": {
                "value": 160,//数量
                "density": {
                    "enable": true, //启用粒子的稀密程度
                    "value_area": 800 //区域散布密度大小
                }
            },
            "color": {
                "value": "#238677" //原子的颜色
            },
            "shape": {
                "type": "circle", //原子的形状 "circle" ,"edge" ,"triangle" ,"polygon" ,"star" ,"image" ,["circle", "triangle", "image"]
                "stroke": {
                    "width": 0, //原子的宽度
                    "color": "#238677" //原子颜色
                },
                "polygon": {
                    "nb_sides": 5 // 原子的多边形边数
                },
                "image": {
                    "src": "img/github.svg", // 原子的图片可以使用自定义图片 "assets/img/yop.svg" , "http://mywebsite.com/assets/img/yop.png"
                    "width": 100, //图片宽度
                    "height": 100 //图片高度
                }
            },
            "opacity": {
                "value": 1, //不透明度
                "random": true, //随机不透明度
                "anim": {
                    "enable": true, //渐变动画
                    "speed": 1, // 渐变动画速度
                    "opacity_min": 0, //渐变动画不透明度
                    "sync": true
                }
            },
            "size": {
                "value": 3, //原子大小
                "random": true, // 原子大小随机
                "anim": {
                    "enable": false, // 原子渐变
                    "speed": 4, //原子渐变速度
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false, //连接线
                "distance": 150, //连接线距离
                "color": "#ffffff", //连接线颜色
                "opacity": 0.4, //连接线不透明度
                "width": 1 //连接线的宽度
            },
            "move": {
                "enable": true, //原子移动
                "speed": 1, //原子移动速度
                "direction": "none", //原子移动方向   "none" ,"top" ,"top-right" ,"right" ,"bottom-right" ,"bottom" ,"bottom-left" ,"left" ,"top-left"
                "random": true, //移动随机方向
                "straight": false, //直接移动
                "out_mode": "out", //是否移动出画布
                "bounce": false, //是否跳动移动
                "attract": {
                    "enable": false, // 原子之间吸引
                    "rotateX": 600, //原子之间吸引X水平距离
                    "rotateY": 600  //原子之间吸引Y水平距离
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas", //原子之间互动检测 "canvas", "window"
            "events": {
                "onhover": {
                    "enable": true, //悬停
                    "mode": "bubble" //悬停模式      "grab"抓取临近的,"bubble"泡沫球效果,"repulse"击退效果,["grab", "bubble"]
                },
                "onclick": {
                    "enable": false,  //点击效果
                    "mode": "repulse"  //点击效果模式   "push" ,"remove" ,"bubble" ,"repulse" ,["push", "repulse"]
                },
                "resize": true // 互动事件调整
            },
            "modes": {
                "grab": {
                    "distance": 100, //原子互动抓取距离
                    "line_linked": {
                        "opacity": 0.8  //原子互动抓取距离连线不透明度
                    }
                },
                "bubble": {
                    "distance": 250, //原子抓取泡沫效果之间的距离
                    "size": 4, // 原子抓取泡沫效果之间的大小
                    "duration": 2, //原子抓取泡沫效果之间的持续事件
                    "opacity": 1, //原子抓取泡沫效果透明度
                    "speed": 3
                },
                "repulse": {
                    "distance": 400, //击退效果距离
                    "duration": 0.4 //击退效果持续事件
                },
                "push": {
                    "particles_nb": 4 //粒子推出的数量
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }
);

var canvas = document.getElementById('nebula'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,

    /*hue = 217,*/
    hue = 171,
    stars = [],
    count = 0,
    maxStars = 1400;

// Thanks @jackrugile for the performance tip! http://codepen.io/jackrugile/pen/BjBGoM
// Cache gradient
var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width/2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#fff');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

// End cache

function random(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }

    if (min > max) {
        var hold = max;
        max = min;
        min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Star = function() {

    this.orbitRadius = random(w / 2 - 50);
    this.radius = random(100, this.orbitRadius) / 10;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 900000;
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
}

Star.prototype.draw = function() {
    var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius/2 + this.orbitY,
        twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
    new Star();
}

function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = 'lighter';
    for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
    };

    window.requestAnimationFrame(animation);
}

animation();





