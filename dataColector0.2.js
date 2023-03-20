let wait=(delay)=>new Promise(resolve=>setTimeout(()=>resolve(),delay*1000))
let fish=(arg)=>{
    return document.querySelector(arg)
}
let fishes = (arg)=>{
    return document.querySelectorAll(arg)

}

let finalResults = {};

// get the links and loop through them 

let jobLinks = fishes('.disabled ember-view job-card-container__link job-card-list__title'.split(' ').join('.'))

for(let link of jobLinks){
    link.click();
    await wait(2.8);
    let applingButton = fish('.jobs-apply-button artdeco-button artdeco-button--3 artdeco-button--primary ember-view'.split(' ').join('.'))        
    
    
    if(applingButton){
        applingButton.click();
        await wait(1);
        let newDoc = fish('.artdeco-modal-overlay artdeco-modal-overlay--layer-default artdeco-modal-overlay--is-top-layer ember-view'.split(' ').join('.')) 
        if(newDoc){
            let weStillHere = true;
            while(weStillHere){
                let inpElements = newDoc.querySelectorAll('input,select,textarea');
                if(inpElements.length){
                    let files = 0
                    let redFlags =0
                    for(let element of inpElements){
                        let itsId = element.id ?element.id:'';
                        let itsLabel = element.labels[0]?element.labels[0]:'';
                        let parsedLabel = itsLabel.textContent.replace(/\n/g , "").trim().toLowerCase()
                        switch(element.tagName){
                            case 'INPUT':
                                if(!finalResults.input){
                                    finalResults.input ={}
                                }
                                switch(element.type){
                                    case 'text':
                                        if(!finalResults.input.text){
                                            finalResults.input.text={}
                                        }
                                        if(element.value){
                                            if(parsedLabel){
                                                if(!finalResults.input.text.parsedLabel){
                                                    finalResults.input.text.parsedLabel = new Set();
                                                }
                                                finalResults.input.text.parsedLabel.add(element.value)
                                            }
                                            if(!parsedLabel){
                                                let alterLabel = newDoc.querySelector('pb4').textContent.replace(/\n/,"").trim().toLowerCase();
                                                if(!finalResults.input.text.alterLabel){
                                                    finalResults.input.text.alterLabel = new Set()
    
                                                }
                                                finalResults.input.text.alterLabel.add(element.value)
    
                                            }
                                        }
                                        else{
                                            if(!finalResults.input.text.noValue){
                                                finalResults.input.text.noValue = new Set()
                                            }
                                            if(parsedLabel){
                                                finalResults.input.text.noValue.add(parsedLabel)
                                            }
                                            if(!parsedLabel){
                                                let alterLabel = newDoc.querySelector('pb4').textContent.replace(/\n/,"").trim().toLowerCase();
                                                finalResults.input.text.noValue.add(alterLabel)
                                            }
                                            
                                        }



                                }
                        }
                    }
                }

            }
        }
    }

   
}