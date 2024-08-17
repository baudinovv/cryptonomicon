const addBtn = document.querySelector('#search-btn') as HTMLDivElement;
const tokensBox = document.querySelector('#tokens-box') as HTMLDivElement;
const tokensInput = document.querySelector('#tokens-input') as HTMLInputElement;
const apiKey = "548543d60cae568eca567de3ef6e1c3a8481c14af37ce4aeb38a22a4f80868e2";

async function showResponse(coin: string , money: string) {

    let apiAdress = fetch(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${money}&api_key=${apiKey}`);
  
    let result = await apiAdress; 

    result.json()
        .then(res => {
            if(res.USD == undefined){
                return 1;
            }
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

            elemBox.append(elemTitle,elemValue,elemBtnBox);
            elemBtnBox.append(elemBtn);

            elemBtn.innerHTML = `
                <span class="icon-[f7--trash] align-middle"></span>
                Удалить
            `;
            elemTitle.innerHTML = `${coin.toUpperCase()} - ${money} `;
            elemValue.innerHTML = `${res.USD}`;

            tokensBox.append(elemBox);
            elemBtnBox.addEventListener('click', () =>{
                elemBox.remove();
            });
        });
}
async function hui() {
    let hui = fetch('https://min-api.cryptocompare.com/data/all/coinlist?summary=true');
    let res = await hui;
    hui.json().then(res => console.log(res));
}
hui()
addBtn.addEventListener('click', () =>{
    showResponse(tokensInput.value, 'USD');
});
tokensInput.addEventListener('keypress', function(e){
    if(e.which === 13){
        e.preventDefault();
        addBtn.click();
    }
});