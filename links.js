 // first we get the job links
 let jobLinks = fishes('.disabled ember-view job-card-container__link job-card-list__title'.split(' ').join('.'))
 // loop through the links
 for(let link of jobLinks){
     // click the link
     link.click()
     // wait for 900 ms
     await wait(1)

    //  code goes here for every link
     

 }