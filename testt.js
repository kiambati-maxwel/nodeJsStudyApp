

 

  var yesterday = new Date(new Date().setDate(new Date().getDate()-4));
  console.log(yesterday);
  var yesterday2 = new Date(new Date().setDate(new Date().getDate()-2));
  var yesterday3 = new Date(new Date().setDate(new Date().getDate()-5));

//   console.log(yesterday.getDate(), yesterday.getMonth());



  const activities = [
    { title: 'b', date: yesterday },
    { title: 'a', date: yesterday2 },
    { title: 'c', date: yesterday3 }
  ]

//  const dateAfter =  activities.filter(e => {
//     { title: 'c', date: yesterday3 }
//     return e.date.getDate() > yesterday.getDate()
//  });console.log(dateAfter)



  const sortedActivities = activities.slice().sort((a, b) => b.date - a.date)

  console.log(sortedActivities)

  console.log(sortedActivities[0].date.getDate())
  console.log(sortedActivities[1].date.getDate())
  console.log(sortedActivities[2].date.getDate())

  