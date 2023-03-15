for(let link of jobLinks){
    // click the link
    link.click()
    // wait for 900 ms
    await wait(1.5)
    // get the applecation button
    let applingButton = fish('.jobs-apply-button artdeco-button artdeco-button--3 artdeco-button--primary ember-view'.split(' ').join('.'))        
    // check for the applecation button then click it
    if(applingButton){
        applingButton.click()
        await wait(.8)
        let newDoc = fish('.artdeco-modal-overlay artdeco-modal-overlay--layer-default artdeco-modal-overlay--is-top-layer ember-view'.split(' ').join('.')) 
        if(newDoc){
            let inpElements = newDoc.querySelectorAll('input,select,textarea');
            if(inpElements.length){
                for(let element of inpElements){
                    switch (element.tagName) {
                        case 'INPUT':
                            switch (element.type) {
                                case 'text':
                                    let itsValue = element.value
                                    let itsId = element.id
                                    let itslabel = newDoc.querySelector(`[for="${itsId}"]`)
                                    if(itslabel)
                                    {
                                        let itsValue = itslabel.innerHTML
                                        let isItRequired = element.required
                                        let isIt = !!isItRequired
                                        let it = {}
                                        it.itsValue = 'text'
                                        it['requireed'] = isIt
                                        finalREsults.push(it)
                                    }
                                    
                                    
                                    break;
                            
                                default:
                                    break;
                            }
                            
                            break;
                    
                        default:
                            break;
                    }
                }
            }

        }

    }


    const cleanerElement = jobInfo.replace(/<[^>]*>/g, "");
    // append the element to the final array
    finalREsults.push(cleanerElement)


}