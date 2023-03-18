const fs = require('fs');

fs.readFile('finalResults.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
 let parsedArray=[]
  const jsonData = JSON.parse(data);
  console.log(jsonData.length)
  for (let data of jsonData){
    let key = Object.keys(data)[0]
    let newKey = key.replace(/\n/g,"").trim()
    let obj = {}
    obj[newKey] = data[key]
    parsedArray.push(obj)



  }
  console.log(parsedArray.length)
  uniqueArr = [...new Set(parsedArray)]
  console.log(uniqueArr.length)
  const jsonString = JSON.stringify(uniqueArr);

 fs.writeFile('data.json', jsonString, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('File has been written');
});
  
  
});

