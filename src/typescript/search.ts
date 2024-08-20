const tokensSearch = document.querySelector('#tokens-input-search') as HTMLInputElement;
const tokensBox = document.querySelector('#tokens-box') as HTMLDivElement;

tokensSearch.addEventListener('input', () => {
    for(let char of tokensBox.children){
        if(!(char.getAttribute('name') as string).includes(tokensSearch.value.toUpperCase())){
            (char as HTMLDivElement).style.display = 'none';
        } else{
            (char as HTMLDivElement).style.display = 'block';
        }
    }
});