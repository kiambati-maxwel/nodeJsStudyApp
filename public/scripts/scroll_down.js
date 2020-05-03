window.onload(scrollDown());
function scrollDown(){
const scroll_btn = document.querySelector('.scroll-btn');
const stats_sec = document.querySelector('.sub-modules-stats');
const main_sec = document.querySelector('.submodule-header');

scroll_btn.addEventListener('click', e => {
    if(scroll_btn.className === 'scroll-btn'){
        console.log(scroll_btn.className);
        scroll_btn.className += '-up';
        scroll_btn.innerText = 'statistics';
        stats_sec.id = '';
        main_sec.id ='scroll';
    }else{
        console.log(scroll_btn.className);
        scroll_btn.className = 'scroll-btn';
        scroll_btn.innerText = 'scroll up';
        main_sec.id = '';
        stats_sec.id = 'scroll';
    }
    
})

};
