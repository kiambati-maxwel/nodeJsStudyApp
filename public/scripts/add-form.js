
// dom
const addmdlbtn = document.querySelector('#add-mdl');
const addmdlform = document.querySelector("#model-form");
const mdlstats = document.querySelector("#mdl-stats");
const model_Stats = document.querySelector("#modelStats");

// const name = document.querySelector("input[name = 'name']");

addmdlbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(addmdlform.className === 'add-visibility'){
        addmdlform.classList.remove('add-visibility');
    }else{
        addmdlform.classList.add('add-visibility');
    };    
});


mdlstats.addEventListener('click', () => {
    if(model_Stats.className === 'add-visibility'){
        model_Stats.classList.remove('add-visibility');
    }else{
        model_Stats.classList.add('add-visibility');
    }
});

    

// name.addEventListener('keypress', e =>{
//     if (e.keyCode === 32 || e.which === 32){

//     }
// });


