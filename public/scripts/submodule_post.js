// dom ---
const subForm = document.querySelector('#submodel-form');
const mainName = document.querySelector('.module');
const submodelnameinput = document.querySelector('#submodelnameinput');
const subbgcolorinput = document.querySelector('#subbgcolorinput');

console.log(mainName.innerHTML);

subForm.addEventListener('submit', e =>{
    e.preventDefault();
    const send = {
        mainMname: mainName.inneText,
        name: submodelnameinput.value,
        bgColor: subbgcolorinput.value
    }

    postSubmodel(send);
});

// --------- post request -----

async function postSubmodel(message) {
    await $.post('http://127.0.0.2/submodels/addmdl', message);
};

