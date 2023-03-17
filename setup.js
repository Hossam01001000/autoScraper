let wait=(delay)=>new Promise(resolve=>setTimeout(()=>resolve(),delay*1000))
let fish=(arg)=>{
    return document.querySelector(arg)
}
let fishes = (arg)=>{
    return document.querySelectorAll(arg)

}
// define the final array

let finalResults = []
let ul = fish('.artdeco-pagination__pages artdeco-pagination__pages--number'.split(' ').join('.'))
let pagesNum = Number(ul.lastElementChild.getAttribute('data-test-pagination-page-btn'))

for(let i=0; i<pagesNum;i++){

    // code goes here before advancing to the next page
    // first we get the job links
 let jobLinks = fishes('.disabled ember-view job-card-container__link job-card-list__title'.split(' ').join('.'))
 // loop through the links
 for(let link of jobLinks){
     // click the link
     link.click()
     // wait for 900 ms
     await wait(2.8)

      let applingButton = fish('.jobs-apply-button artdeco-button artdeco-button--3 artdeco-button--primary ember-view'.split(' ').join('.'))        
     // check for the applecation button then click it
     if(applingButton){
        applingButton.click()
        await wait(1)
        let newDoc = fish('.artdeco-modal-overlay artdeco-modal-overlay--layer-default artdeco-modal-overlay--is-top-layer ember-view'.split(' ').join('.')) 
        if(newDoc){
            let weStillHere = true
            while(weStillHere){
            let inpElements = newDoc.querySelectorAll('input,select,textarea');
            if(inpElements.length){
                let file = 0
                let redFlags = 0
                for(let element of inpElements){
                    let itsId = element.id ?element.id:'';
                    let itslabel = element.labels[0] 
                    // itsId ?  newDoc.querySelector(`[for="${itsId}"]`) :'';
                    // represents the element object will be checked and pushed to the final results array
                    let it ={}
                    // red flags will be increased at any case of unsatsfyible requirement and will be checked for at yhe end of the loop if its not 0 it will break
                    
                    
                    switch (element.tagName) {
                        case 'INPUT':
                            switch (element.type) {
                                case 'text':
                                    if(itslabel)
                                    {
                                        
                                        if(element.value){
                                            it[`${itslabel.textContent}`] = element.value
                                        }
                                        else {
                                            it[`${itslabel.textContent}`] = 'default'
                                            element.value = 'default'
                                        }
                                        
                                    }
                                    if(!element.value){
                                        element.value='default'
                                    }
                                    break;
                                case 'file':
                                        if(itslabel)
                                        {
                                            
                                            it[`${itslabel.textContent}`] = 'file'
                                            if(!file >0){
                                               if(document.querySelector('[aria-label="Choose Resume"]')){
                                                document.querySelector('[aria-label="Choose Resume"]').click()
                                                file++;
                                               }
                                            }
                                            
                                        }
                                        else{
                                            if(!file >0){
                                                if(document.querySelector('[aria-label="Choose Resume"]')){
                                                    document.querySelector('[aria-label="Choose Resume"]').click()
                                                    file++;
                                                   }
                                            }
                                           

                                        }
                                        
                                        
                                    break; 
                                case 'checkbox':
                                        if(itslabel)
                                        {
                                            
                                            it[`${itslabel.textContent}`] = 'checkbox'
                                            
                                            
                                        }
                                        if(!element.checked){element.click()}
                                        
                                        
                                    break;
                                case 'radio':
                                        // if(itslabel)
                                        // {
                                            
                                        //     it[`${itslabel.textContent}`] = 'checkbox'
                                            
                                            
                                        // }
                                        if(!element.checked){element.click()}
                                        
                                        
                                    break;  
                                case 'number':
                                    if(itslabel){
                                        if(element.value){
                                        it[`${itslabel.textContent}`] = element.value
                                        }
                                        else{
                                            it[`${itslabel.textContent}`] = 148
                                            element.value = 148
                                        }
                                    }
                                    if(!element.value){
                                        element.value = 148
                                    }
                                    
                                    





                            
                                default:
                                    redFlags ++;
                                    break;
                                    
                            }
                            
                            
                            break;
                        case 'SELECT':
                            let options = element.querySelectorAll('option')
                            if(itslabel){
                                if(element.value != options[0].value){
                                    it[`${itslabel.textContent}`] = element.value
                                }
                                else{
                                    element.value = element.querySelectorAll('option')[1].value
                                    it[`${itslabel.textContent}`] = element.value
                                }
                            }
                            else{
                                if(element.value != options[0].value){
                                    
                                }
                                else{
                                    element.value = element.querySelectorAll('option')[1].value
                                    
                                }
                            }
                            break;
                        case 'TEXTAREA':
                            if(itslabel){
                                it[`${itslabel.textContent}`] = 'this is a textarea'

                            }
                            if(element.required){
                                element.value = 'this is a text area'
                            }
                            break;
                    
                        default:
                            redFlags ++;
                            break;
                    }

                    if(Object.keys(it).length){
                        finalResults.push(it)
                    }
                }
                // after looping through the elments
                if(redFlags > 0){
                    let exit = newDoc.querySelector('[aria-label="Dismiss"]')
                    exit.click()
                    await wait(.7)
                    let discard = document.querySelector('[data-control-name="discard_application_confirm_btn"]')
                    discard.click()
                    await wait(.7)
                    weStillHere = false 

                }
                let nextbutton=newDoc.querySelector('[aria-label="Continue to next step"]')
                if(nextbutton){
                    let current = newDoc.querySelector('[class="display-flex ph5 pv2"]').innerHTML
                    try {nextbutton.click()
                    await wait(.8)
                    if (current == newDoc.querySelector('[class="display-flex ph5 pv2"]').innerHTML){
                     let exit = newDoc.querySelector('[aria-label="Dismiss"]')
                     exit.click()
                     await wait(.7)
                     let discard = document.querySelector('[data-control-name="discard_application_confirm_btn"]')
                     discard.click()
                     await wait(.7)
                      weStillHere = false

                    }
                }
                catch{
                    let exit = newDoc.querySelector('[aria-label="Dismiss"]')
                     exit.click()
                     await wait(.7)
                     let discard = document.querySelector('[data-control-name="discard_application_confirm_btn"]')
                     discard.click()
                     weStillHere = false

                }
                }
                else{
                    let exit = newDoc.querySelector('[aria-label="Dismiss"]')
                     exit.click()
                     await wait(.7)
                     let discard = document.querySelector('[data-control-name="discard_application_confirm_btn"]')
                     discard.click()
                     weStillHere = false


                }
                
            }
            else{
                let exit = newDoc.querySelector('[aria-label="Dismiss"]')
                exit.click()
                await wait(.7)
                let discard = document.querySelector('[data-control-name="discard_application_confirm_btn"]')
                discard.click()
                await wait(.7)
                weStillHere = false
                
            }
        }


        }

    }

    //  code goes here for every link
     

 }
    // after looping through the element in the page
    // get the active page Number
    // and click the next page button
    let activePageLI = fish('.artdeco-pagination__indicator artdeco-pagination__indicator--number active selected ember-view'.split(' ').join('.'));
    let nextPageLi = fish('#ember'+(Number(activePageLI.id.slice(5))+1))
    fish('#ember'+(Number(activePageLI.id.slice(5))+1)).firstElementChild.click()
    // and wait 3 seconds
    await wait(3)
}