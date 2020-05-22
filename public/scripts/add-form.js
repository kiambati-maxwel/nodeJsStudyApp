
// dom
const addmdlbtn = document.querySelector('#add-mdl');
const addmdlform = document.querySelector("#model-form");
// const name = document.querySelector("input[name = 'name']");

addmdlbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(addmdlform.className === 'add-visibility'){
        addmdlform.classList.remove('add-visibility');
    }else{
        addmdlform.classList.add('add-visibility');
    };    
});


// name.addEventListener('keypress', e =>{
//     if (e.keyCode === 32 || e.which === 32){

//     }
// });

