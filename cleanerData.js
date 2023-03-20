const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
 let parsedArray=[]
  const jsonData = JSON.parse(data);
  console.log(jsonData.length)
  for (let data of jsonData){
    let key = Object.keys(data)[0]
    let unique = 0
    for(let car of parsedArray){
      if(key.toLowerCase() == Object.keys(car)[0].toLowerCase()){
        if(data[key].toLowerCase() == car[Object.keys(car)[0]].toLowerCase()){unique ++;}
        
      }
    }
    if(unique ==0){
      let jack ={}
      jack[key.toLowerCase()]=data[key].toLowerCase()
      parsedArray.push(jack)
    }



  }
  console.log(parsedArray.length)
  // uniqueArr = [...new Set(parsedArray)]
  // console.log(uniqueArr.length)
  const jsonString = JSON.stringify(parsedArray);

 fs.writeFile('newData.json', jsonString, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('File has been written');
});
  
  
});

