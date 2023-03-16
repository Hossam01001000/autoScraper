let wait=(delay)=>new Promise(resolve=>setTimeout(()=>resolve(),delay*1000))
let fish=(arg)=>{
    return document.querySelector(arg)
}
let fishes = (arg)=>{
    return document.querySelectorAll(arg)

}
// define the final array

let finalResults = []
