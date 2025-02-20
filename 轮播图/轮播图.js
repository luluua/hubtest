// 准备数组对象
const sliderData = [
    { url: '../轮播图/img/1.jpg', title: '阳光倾洒的午后与喷泉邂逅', color: 'hsla(161, 89%, 85%, 0.812)' },
    { url: '../轮播图/img/2.jpg', title: '来点鸡汤：我们先把书读好！', color: 'rgb(233, 215, 188)' },
    { url: '../轮播图/img/3.jpg', title: '姐姐，我与你永不分离--《逆水寒》', color: 'hsl(184, 49%, 81%)' },
    { url: '../轮播图/img/4.jpg', title: '樱花雨里，我在等你---luluua', color: 'hwb(166 72% 16%)' },
    { url: '../轮播图/img/5.jpg', title: '自由与海浪比肩，这是我爱的世界', color: 'rgb(169, 240, 245)' },
    { url: '../轮播图/img/6.jpg', title: '尘世之间，水墨江湖---九零', color: 'hsl(0, 0%, 86%)' }
];

// 函数封装
function changeMaterial() {
    // 移除所有图片的 appear 类
    // imgs.forEach(img => img.classList.remove('appear'));
    document.querySelector('.slider-wrapper img.appear').classList.remove('appear');
    // 为当前图片添加 appear 类
    imgs[i].classList.add('appear');
    // 更新标题和背景颜色
    p.innerHTML = sliderData[i].title;
    footer.style.backgroundColor = sliderData[i].color;
    // 更新指示器：同样是先删除原有属性再添加
    document.querySelector('.slider-indicator .active').classList.remove('active');
    document.querySelector(`.slider-indicator li:nth-child(${i + 1})`).classList.add('active');
}

// 全局变量
const imgs = document.querySelectorAll('.slider-wrapper img');
const p = document.querySelector('.slider-footer p');
const footer = document.querySelector('.slider-footer');
const next = document.querySelector('.slider .slider-footer .toggle .next');
const prev = document.querySelector('.slider .slider-footer .toggle .prev');
const ul = document.querySelector('.slider-footer .slider-indicator');
let i = 0;//数组索引从0开始

// 主函数
// 1. 左右切换模块
next.addEventListener('click', function () {
    i = (i + 1) % imgs.length; // 确保 i 在 0-5 之间
    changeMaterial();
});
prev.addEventListener('click', function () {
    i = (i - 1 + imgs.length) % imgs.length; // 确保 i 在 0-5 之间
    changeMaterial();
});

// 2. 自动播放模块
//不使用自启动i++而是使用next操作
//防止了自动播放与向前切换功能冲突
let timerId = setInterval(function () {
    next.click();
}, 2000);

// 3. 鼠标经过“大盒子”停止计时器
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', function () {
    // 清除间歇函数，找到函数对应id值
    clearInterval(timerId);
});

// 4. 鼠标离开，开始定时器
slider.addEventListener('mouseleave', function () {
    //再次添加间歇函数，id值对应的变量沿用之前的，方便再次删除或其他使用
    timerId = setInterval(function () {
        next.click();
    }, 2000);
});

// 5. 鼠标滑动切换图片
let startX = 0; // 记录鼠标按下的初始位置
let isDragging = false; // 是否正在拖动
let currentX = 0; // 当前鼠标位置

slider.addEventListener('mousedown', function (e) {
    e.preventDefault(); // 阻止默认行为
    startX = e.clientX; // 记录鼠标按下的初始位置
    isDragging = true; // 开始拖动
});

// slider.addEventListener('mousemove', function (e) {
//     if (!isDragging) return; // 如果没有按下鼠标，则不处理
//     currentX = e.clientX; // 获取当前鼠标位置
// });

slider.addEventListener('mouseup', function (e) {
    if (!isDragging) return; // 如果没有按下鼠标，则不处理
    isDragging = false; // 结束拖动

    const endX = e.clientX; // 获取鼠标松开的位置
    const deltaX = endX - startX; // 计算滑动距离

    // 如果滑动距离的绝对值abs超过 40px，则切换图片
    if (Math.abs(deltaX) > 40) {
        if (deltaX > 0) {
            // 向右滑动，切换到上一张图片
            i = (i - 1 + imgs.length) % imgs.length;
        } else {
            // 向左滑动，切换到下一张图片
            i = (i + 1) % imgs.length;
        }
        changeMaterial();
    }
});

// 防止鼠标移出 slider 时未触发 mouseup
//必须清理状态
slider.addEventListener('mouseleave', function () {
    if (isDragging) {
        isDragging = false; // 结束拖动
    }
});
//6.点击对应小圆点进行跳转
ul.addEventListener('click', function (e) {
    // console.log(e.target.dataset.id);
    i = +e.target.dataset.id - 1;
    changeMaterial();
});
