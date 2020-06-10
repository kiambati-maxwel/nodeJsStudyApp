// globalVariable
let subModuleName = null;
window.addEventListener('load', init);

// DOM
const addmdlbtn = document.querySelector('#add-mdl');
const addmdlform = document.querySelector("#model-form");
const mdlstats = document.querySelector("#mdl-stats");
const model_Stats = document.querySelector("#modelStats");
const subaddmdl = document.querySelector('#subadd-mdl');
const submodelform = document.querySelector('#submodel-form');
const submod = document.querySelector('.ln-models');
const models = document.querySelector('#lnmodels');
const mainModelName = document.querySelector('#moduleLender');
const mainInput = document.querySelector('#submodel-main-m-nput');
const mainModelNamevalue = mainModelName.innerText;
const subModelNameTimer = document.querySelector('#subModelNameTimer');
const tTimeToday = document.querySelector('.tTimeToday');
const totalTimeSpen = document.querySelector('#totalTimeSpen');
const totalTanlysed = document.querySelector('#totalTanlysed');
// console.log(submod.id);



// --- get request message function



function init() {

  if (submod.id === 'lnmodels') {
    // console.log(submod.id)
    $.get('http://127.0.0.1:4000/lnmodels', async (lender) => {


      lender.forEach(e => {

        // scroll animation based call back function

        const callback = function (entries) {
          entries.forEach(entry => {
            entry.target.classList.toggle("is-visible");
          });
        };

        // intersection observer to animate alternative for 
        // listening to scroll events
        
        const observer = new IntersectionObserver(callback);

        let model = document.createElement('h1');
        let aElement = document.createElement('a');
        aElement.href = `/submodels/${e.name}`;
        aElement.innerHTML = `${decodeURI(e.name)}`;
        model.appendChild(aElement);
        model.classList = `model model-${e.id}`;
        document.querySelector('#lnmodels').prepend(model);
        const targets = document.querySelectorAll(".model");
        targets.forEach(function (target) {
          observer.observe(target);
        });


      });

    });


// /-------------
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



  } else if (submod.id === 'submodels') {
    // console.log(submod.id);
    // console.log(mainModelNamevalue);

    $.get(`http://localhost:4000/submodels/lenderSmodels/${mainModelNamevalue}`, async lender => {

      mainInput.value = mainModelNamevalue;
      // console.log(lender);

      lender.forEach(e => {

        let model = document.createElement('h1');
        let aElement = document.createElement('a');
        aElement.innerHTML = `${e.name}`;
        model.appendChild(aElement);
        model.classList = `model model-${e.id}`;
        model.id = e.id;
        document.querySelector('#submodels').prepend(model);

        model.addEventListener('click', () => {
          add_playbtn();
          const modelResize = document.querySelectorAll('.model');
          subModuleName = model.innerText;
          console.log(model.id);
          modelResize.forEach(e => {
            if (e.id !== model.id) {
              // console.log(e);
              e.style.backgroundColor = "yellow";
              e.style.opacity = "0.5";
              e.style.transitionDuration = ".7s";
              subModelNameTimer.innerText = model.innerText;

            } else {
              e.style.backgroundColor = "green";
              e.style.transitionDuration = ".1s";
              e.style.opacity = "1";
            }
          });
        });

        /* observer animation */


        const callback = function (entries) {
          entries.forEach(entry => {
            entry.target.classList.toggle("is-visible");
          });
        };
        const observer = new IntersectionObserver(callback);
        const targets = document.querySelectorAll(".model");
        targets.forEach(function (target) {
          observer.observe(target);
        });

      });
    });

    $(document).ready(function () {


      $.get(`http://127.0.0.1:4000/timebox/${mainModelNamevalue}`, info => {
        console.log(info);
        console.log(totalTimeSpen.innerText);
        let d = null;
        let t = null;
        let tt = null;
        let subTopic = [];
        let subTopicToday = []
        let subTopicTime = [];
        if (info[0] === undefined) {
          console.log('nothing');
          totalTimeSpen.innerText = `total time : 0`;

        } else {
          const dateToday = new Date();

          console.log(dateToday);

          info.forEach(e => {
            t += e.time;
            let dateN = new Date(e.date);


            if ( subTopicTime.length < 1  || subTopic.includes(e.name) !== true) {
              info.filter(info => {  /* filter subtopic name in info get request data */
                return info.name === e.name;
              }).map(sbn => {
                return sbn.time /* map time into an array */
              }).forEach(e => {

                tt += e;

              });
              subTopic.push(e.name);
              subTopicTime.push({
                name: e.name,
                time: tt
              });
              tt = null;
            }

            if (dateToday.getDate() === dateN.getDate() && dateToday.getFullYear() === dateN.getFullYear()) {
              d += e.time;

            } else {
              d = 0
            }

          })
        }
        console.log(subTopicTime);

        subTopicTime.forEach(e => {
          let appendAnTime = document.createElement('li');
          appendAnTime.innerText = `${e.name} : ${Math.trunc(e.time/60)} hr ${Math.round((e.time%60)*100)/100 } min`;
          totalTanlysed.prepend(appendAnTime);
        });
        

        totalTimeSpen.innerText = `total time : ${Math.trunc(t/60)} hr ${Math.round((t%60)*100)/100} min`;
        console.log(d);
        tTimeToday.innerText = `Today : ${Math.trunc(d/60)} hr ${Math.round((d%60)*100)/100} min`;



      })
    });
  }
};

function addFormVis() {
  // console.log('yeseses')
  if (submodelform.className === 'add-visibility') {
    submodelform.classList.remove('add-visibility');
  } else {
    submodelform.classList.add('add-visibility');
  };
}

// model time function
