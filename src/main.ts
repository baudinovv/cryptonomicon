const addBtn = document.querySelector('#search-btn') as HTMLDivElement;
const tokensBox = document.querySelector('#tokens-box') as HTMLDivElement;
const tokensInput = document.querySelector('#tokens-input') as HTMLInputElement;
const apiKey = "548543d60cae568eca567de3ef6e1c3a8481c14af37ce4aeb38a22a4f80868e2";
const completeMain = document.querySelector('#auto-complete') as HTMLDivElement;
const completeBox = document.querySelector('#auto-complete-box') as HTMLDivElement;
const completeItem = document.querySelectorAll('#complete-item');

interface Coin{
    Id: string,
    ImageUrl: string, 
    Symbol: string, 
    FullName: string
} 

let coinCollection: Record<string, Coin> = {};

async function addCoin(coin: string , money: string) {

    let apiAdress = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${money}&api_key=${apiKey}`); 


    const elemBox = document.createElement('div');
    const elemTitle = document.createElement('div');
    const elemValue = document.createElement('div');
    const elemBtnBox = document.createElement('div');
    const elemBtn = document.createElement('button');

    elemBox.className = "bg-white flex flex-col text-center";
    elemTitle.className = "mt-6 text-sm font-medium";
    elemValue.className = "mt-1 text-4xl font-bold";
    elemBtnBox.className = "bg-slate-300 mt-5 transition hover:bg-slate-600 hover:text-white cursor-pointer";
    elemBtn.className = "py-5";

    elemBtn.type = "button";
    elemValue.id = "price";

    elemBox.append(elemTitle,elemValue,elemBtnBox);
    elemBtnBox.append(elemBtn);

    elemBox.setAttribute('name', coin.toUpperCase());
    tokensBox.append(elemBox);

    elemTitle.innerHTML = `${coin.toUpperCase()} - ${money} `
    elemValue.innerHTML = `-`;
    elemBtn.innerHTML = `
        <span class="icon-[f7--trash] align-middle"></span>
        Удалить
    `;

    elemBtnBox.addEventListener('click', () =>{
        elemBox.remove();
    });
    for(let char of completeItem){
        if((char as HTMLDivElement).getAttribute('name') == coin) return 1;
    }
    apiAdress.json()
        .then(res => {
            if(res.USD == undefined){
                elemBox.className = "bg-red-100 flex flex-col text-center";
                return 1;
            }
            elemTitle.innerHTML = `${coin.toUpperCase()} - ${money} `;
            elemValue.innerHTML = `${res.USD}`;

        });
}


async function updateCoin() {
    try{
        if(!tokensBox.childNodes.length) return 1;
        let updateCoinsList = '';
        for(let i = 0; i < tokensBox.childNodes.length ; i++){
            if(tokensBox.childNodes[i + 1]){
                updateCoinsList = updateCoinsList + `${(tokensBox.childNodes[i] as HTMLDivElement).getAttribute('name')},`;
            } else{
                updateCoinsList = updateCoinsList + `${(tokensBox.childNodes[i] as HTMLDivElement).getAttribute('name')}`;
            }
        }
        let updateAdress = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${updateCoinsList}&tsyms=USD&api_key=${apiKey}`); 
        updateAdress.json()
            .then(res => {
                for(let i = 0; i < tokensBox.childNodes.length; i++){
                    try{
                        (document.querySelector(`[name=${(tokensBox.childNodes[i] as HTMLDivElement).getAttribute('name')}] #price`) as HTMLDivElement).innerHTML = `${res[updateName].USD}`
                        let updateName = (tokensBox.childNodes[i] as HTMLDivElement).getAttribute('name') as string;
                    } catch{}
                }
            });
    } catch{}
}
setInterval(updateCoin, 1000);


async function coinList() {
    let path = await fetch('https://min-api.cryptocompare.com/data/all/coinlist?summary=true');
    coinCollection = (await path.json()).Data
}
coinList();

addBtn.addEventListener('click', () =>{
    if(tokensInput.value){
        addCoin(tokensInput.value, 'USD');
        tokensInput.value = "";
    }
});
tokensInput.addEventListener('keypress', function(e : KeyboardEvent){
    if(e.code === 'Enter'){
        e.preventDefault();
        addBtn.click();
        hideComplete();
    }
    if(e.code === 'Escape'){
        completeBox.removeAttribute('active');  
        hideComplete();
    }
    if(e.code === 'ArrowDown'){
        (completeItem[0] as HTMLDivElement).focus();
    }
});

let showComplete = () => {
    completeBox.style.display = "block";
    tokensInput.className = "outline-none px-2.5 py-2 border-2 border-solid border-gray-300 rounded-t-lg shadow-[0_0px_11px_-2px_rgba(34,60,80,0.2)] w-full";
    tokensInput.style.borderBottom = "none";
    tokensInput.setAttribute('active','true');
}

let hideComplete = () => {
    completeBox.style.display = "none";
    tokensInput.className = "outline-none px-2.5 py-2 border-2 border-solid border-gray-300 rounded-lg shadow-[0_0px_11px_-2px_rgba(34,60,80,0.2)] w-full";
    tokensInput.style.borderBottom = "2px solid rgb(209 213 219 / var(--tw-border-opacity))";
    tokensInput.removeAttribute('active');
}

tokensInput.addEventListener('focus' , () => {
    if(tokensInput.value){
        showComplete();
    }
    completeMain.setAttribute('active', 'true');
});

tokensInput.addEventListener('blur' , () => {
    setTimeout(hideComplete, 50);
});

addBtn.addEventListener('focus' , () => {
    addBtn.setAttribute('active', 'true');
});

addBtn.addEventListener('blur' , () => {
    addBtn.removeAttribute('active');
});

tokensInput.addEventListener('input', function(){   
    try{
        let coinTuple = Object.keys(coinCollection).filter((word) => word.match(new RegExp(`${tokensInput.value.toUpperCase()}`)));
        if(tokensInput.value){
            // console.log(coinTuple)
            for(let i = 0; i < completeItem.length; i++){
                if(coinTuple[i] == undefined || completeItem[i] == undefined){
                    // hideComplete();
                    continue;
                }
                showComplete();
                completeItem[i].innerHTML = coinTuple[i];
                completeItem[i].addEventListener('click' , (e) => {
                    e.stopImmediatePropagation()
                    tokensInput.value = `${completeItem[i].textContent}`;
                    addBtn.click();
                    setTimeout(hideComplete, 100);
                });
                completeItem[i].addEventListener('focus' , () => {
                    completeBox.setAttribute('active', 'true');
                    setTimeout(showComplete, 50);
                });
                
                completeItem[i].addEventListener('blur' , () => {
                    setTimeout(() => {
                        if(addBtn.hasAttribute('active')){
                            hideComplete();
                            completeBox.removeAttribute('active');
                        }
                    }, 1);
                });
                (completeItem[i] as HTMLDivElement).onkeyup = (e : KeyboardEvent) => {
                    if(e.code === 'Enter'){
                        e.preventDefault();
                        e.stopImmediatePropagation()
                        tokensInput.value = `${completeItem[i].textContent}`;
                        addBtn.click();
                        hideComplete();
                    }
                    if(e.code === 'Escape'){
                        completeBox.removeAttribute('active');  
                        hideComplete();
                    }
                    if(e.code === 'ArrowUp'){
                        if(!completeItem[i - 1]) return 1;
                        (completeItem[i - 1] as HTMLDivElement).focus();
                    }
                    if(e.code === 'ArrowDown'){
                        if(!completeItem[i + 1]) return 1;
                        (completeItem[i + 1] as HTMLDivElement).focus();
                    }
                }
            }
        } else{
            hideComplete();
        }
    } catch{
        
    }
});