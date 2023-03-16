
// first get the number of pages

let ul = fish('.artdeco-pagination__pages artdeco-pagination__pages--number'.split(' ').join('.'))
let pagesNum = Number(ul.lastElementChild.getAttribute('data-test-pagination-page-btn'))

for(let i=0; i<pagesNum;i++){

    // code goes here before advancing to the next page
   
    // after looping through the element in the page
    // get the active page Number
    // and click the next page button
    let activePageLI = fish('.artdeco-pagination__indicator artdeco-pagination__indicator--number active selected ember-view'.split(' ').join('.'));
    let nextPageLi = fish('#ember'+(Number(activePageLI.id.slice(5))+1))
    fish('#ember'+(Number(activePageLI.id.slice(5))+1)).firstElementChild.click()
    // and wait 3 seconds
    await wait(3)
}