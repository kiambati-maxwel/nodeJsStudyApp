
// dom

const substats = document.querySelector("#sub-stats");
const infinterprated = document.querySelector('.info-interprated');
// const name = document.querySelector("input[name = 'name']");


    
substats.addEventListener('click', () => {
    if(infinterprated.className === 'info-interprated add-visibility'){
        infinterprated.classList.remove('add-visibility');
    }else{
       infinterprated.classList.add('add-visibility');
    }
});



