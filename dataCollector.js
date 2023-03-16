// define the wait function
let wait=(delay)=>new Promise(resolve=>setTimeout(()=>resolve(),delay*1000))
let fish=(arg)=>{
    return document.querySelector(arg)
}
let fishes = (arg)=>{
    return document.querySelectorAll(arg)

}
// define the final array

let finalResults = []

// first get the number of pages

let ul = fish('.artdeco-pagination__pages artdeco-pagination__pages--number'.split(' ').join('.'))
let pagesNum = Number(ul.lastElementChild.getAttribute('data-test-pagination-page-btn'))

// now that we have got the number of pages we can create a simple for loop

for(let i=0; i<pagesNum;i++){
    // first we cat the job links
    let jobLinks = fishes('.disabled ember-view job-card-container__link job-card-list__title'.split(' ').join('.'))
    // loop through the links
    for(let link of jobLinks){
        // click the link
        link.click()
        // wait for 900 ms
        await wait(1)
        // grap the job discription element fom the DOM
        let jobInfo=fish('#job-details').innerHTML;
        
        const cleanerElement = jobInfo.replace(/<[^>]*>/g, "");
        // append the element to the final array
        finalREsults.push(cleanerElement)


    }
    // after looping through the element in the page
    // get the active page Number
    let activePageLI = fish('.artdeco-pagination__indicator artdeco-pagination__indicator--number active selected ember-view'.split(' ').join('.'));
    let nextPageLi = fish('#ember'+(Number(activePageLI.id.slice(5))+1))
    fish('#ember'+(Number(activePageLI.id.slice(5))+1)).firstElementChild.click()
    

    // let star = Number(activePage.getAttribute('data-test-pagination-page-btn'));
    // let nextbutton;
    // if(star == 8){
    //     nextbutton =fish('#ember11135') 
    // }
    // else{
    // // get the next page element
    //    nextbutton = fish(`[data-test-pagination-page-btn = "${star +1}"]`)
    // }
    // // press the next page button
    // nextbutton.firstElementChild.click()
    await wait(3)
}