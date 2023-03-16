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
                let file = 0
                for(let element of inpElements){
                    let itsId = element.id ?element.id:'';
                    let itslabel = itsId ?  newDoc.querySelector(`[for="${itsId}"]`) :'';
                    // represents the element object will be checked and pushed to the final results array
                    let it ={}
                    // red flags will be increased at any case of unsatsfyible requirement and will be checked for at yhe end of the loop if its not 0 it will break
                    let redFlags = 0
                    
                    switch (element.tagName) {
                        case 'INPUT':
                            switch (element.type) {
                                case 'text':
                                    if(itslabel)
                                    {
                                        
                                        if(element.value){
                                            it[`${itslabel.innerHTML}`] = element.value
                                        }
                                        else {
                                            it[`${itslabel.innerHTML}`] = 'default'
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
                                            
                                            it[`${itslabel.innerHTML}`] = 'file'
                                            if(!file >0){
                                                document.querySelector('[aria-label="Choose Resume"]').click()
                                                file++;
                                            }
                                            
                                        }
                                        else{
                                            if(!file >0){
                                                document.querySelector('[aria-label="Choose Resume"]').click()
                                                file++;
                                            }
                                           

                                        }
                                        
                                        
                                    break; 
                                case 'checkbox':
                                        if(itslabel)
                                        {
                                            
                                            it[`${itslabel.innerHTML}`] = 'checkbox'
                                            
                                            
                                        }
                                        if(!element.checked){element.click()}
                                        
                                        
                                    break;
                                case 'radio':
                                        if(itslabel)
                                        {
                                            
                                            it[`${itslabel.innerHTML}`] = 'checkbox'
                                            
                                            
                                        }
                                        if(!element.checked){element.click()}
                                        
                                        
                                    break;   


                            
                                default:
                                    redFlags ++;
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