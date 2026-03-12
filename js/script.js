// 导航菜单切换（移动端，点击汉堡按钮展开/收起）
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('active');
    // 切换菜单图标（汉堡/叉号，更直观）
    this.innerHTML = navUl.classList.contains('active') ? '&#10005;' : '&#9776;';
});
// 轮播图通用功能（首页轮播+案例轮播，支持自动播放、点击切换、鼠标暂停）
function initCarousel(carouselSelector, slideClass, prevBtn, nextBtn, indicatorClass, autoPlay = true) {
    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return; // 没有找到轮播容器则不执行，避免报错
    const slides = carousel.querySelectorAll(slideClass);
    const prevButton = carousel.querySelector(prevBtn);
    const nextButton = carousel.querySelector(nextBtn);
    const indicatorsContainer = carousel.querySelector(indicatorClass);
    let currentIndex = 0;
    let interval;

    // 创建轮播指示器圆点
    if (indicatorsContainer && slides.length > 1) {
        indicatorsContainer.innerHTML = ''; // 清空原有内容，避免重复
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === currentIndex) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    // 跳转到指定轮播图
    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        // 更新指示器状态
        if (indicatorsContainer) {
            indicatorsContainer.querySelectorAll('.indicator').forEach(ind => ind.classList.remove('active'));
            indicatorsContainer.querySelectorAll('.indicator')[index].classList.add('active');
        }
        currentIndex = index;
    }

    // 下一张轮播图
    function nextSlide() {
        const newIndex = (currentIndex + 1) % slides.length;
        goToSlide(newIndex);
    }

    // 上一张轮播图
    function prevSlide() {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
    }

    // 绑定按钮点击事件
    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    // 自动播放轮播图（5秒切换一次）
    if (autoPlay && slides.length > 1) {
        interval = setInterval(nextSlide, 5000);
        // 鼠标移到轮播图上暂停，移开继续
        carousel.addEventListener('mouseenter', () => clearInterval(interval));
        carousel.addEventListener('mouseleave', () => interval = setInterval(nextSlide, 5000));
    }
}

// 页面加载完成后初始化所有轮播图
window.addEventListener('DOMContentLoaded', () => {
    // 首页主轮播图（工厂实景/产品主图）
    initCarousel('.banner', '.slide', '.prev-btn', '.next-btn', '.indicators');
    // 工厂案例轮播图（产品案例/加工案例）
    initCarousel('.case-banner', '.case-slide', '.case-prev', '.case-next', null);

    // 新增：点击导航链接自动收起手机菜单
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navUl = document.querySelector('nav ul');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                menuToggle.innerHTML = '&#9776;';
            }
        });
    });
});