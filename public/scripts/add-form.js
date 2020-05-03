// dom
const id = null;
const addmdlbtn = document.querySelector('#add-mdl');
const addmdlform = document.querySelector("#model-form");
const modelNameInput = document.querySelector("#modelnameinput");
const bgColorInput = document.querySelector("#bgcolorinput");
const lnmodels = document.querySelector(".ln-models");
const models = document.querySelectorAll('.model');
const idIdentifire = models.length + 1;
console.log();


addmdlbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(addmdlform.className === 'add-visibility'){
        addmdlform.classList.remove('add-visibility');
    }else{
        addmdlform.classList.add('add-visibility');
    };    
});

// addmdlform.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     let node = document.createElement('h1');
//     node.innerHTML = modelNameInput.value;Erro
//     node.classList.add('model', `model-${idIdentifire}`);
//     lnmodels.prepend(node);
// });

