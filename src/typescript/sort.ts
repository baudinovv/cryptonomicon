const sortBtn = document.querySelector('#sort-btn') as HTMLSpanElement;
const tokensBox = document.querySelector('#tokens-box') as HTMLDivElement;

let coinSortIncrease = (a: HTMLDivElement, b: HTMLDivElement) : number => {
    if((eval(a.getAttribute('value') as string) > eval(b.getAttribute('value') as string))) {
        return 1;
    } else if((eval(a.getAttribute('value') as string) < eval(b.getAttribute('value') as string))){
        return -1;
    } else{
        return 0;
    }
}

let coinSortDecrease = (a: HTMLDivElement, b: HTMLDivElement): number => {
    if((eval(a.getAttribute('value') as string) > eval(b.getAttribute('value') as string))) {
        return -1;
    } else if((eval(a.getAttribute('value') as string) < eval(b.getAttribute('value') as string))){
        return 1;
    } else{
        return 0;
    }
}

let coinSort = (mode: string) =>{
    let sortedArray = (Array.from(tokensBox.childNodes) as Array<HTMLDivElement>).sort((mode == 'increase') ? coinSortIncrease : coinSortDecrease);
    tokensBox.innerHTML = '';
    for(let i = 0; i < sortedArray.length; i++){
        tokensBox.append(sortedArray[i]);
    }
}

sortBtn.addEventListener('click', () => {
    if(sortBtn.className == "icon-[flat-color-icons--numerical-sorting-12] h-10 w-10 cursor-pointer"){
        sortBtn.className = "icon-[flat-color-icons--numerical-sorting-21] h-10 w-10 cursor-pointer";
        sortBtn.setAttribute('mode', 'decrease');
        coinSort('decrease');
    } else{
        sortBtn.className = "icon-[flat-color-icons--numerical-sorting-12] h-10 w-10 cursor-pointer";
        sortBtn.setAttribute('mode', 'increase');
        coinSort('increase');
    }
});