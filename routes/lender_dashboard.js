window.onload(init());

// DOM
const models = document.querySelector('.ln-models');


// --- get request message function


function init() {
    $.get('http://0.0.0.0:4000/lnmodels', async (lender) => {

        lender.forEach(e => {
            let model = document.createElement('h1');
            model.innerHTML = `<a>${e.name}</a>`;
            model.classList = `model, model-${e.id}`;
            models.prepend(model);
          });
    });
};




