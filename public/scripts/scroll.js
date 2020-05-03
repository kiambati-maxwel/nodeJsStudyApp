const callback = function(entries) {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-visible");
      // console.log(entries);
    });
  };
  

  const observer = new IntersectionObserver(callback);
  
  const targets = document.querySelectorAll(".model");
  targets.forEach(function(target) {
    observer.observe(target);
  });


  

