const tokensBox = document.querySelector('#tokens-box') as HTMLDivElement;
const apiKey = import.meta.env.VITE_API_KEY;

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
                if(res.USD){
                    for(let i = 0; i < tokensBox.childNodes.length; i++){
                        try{
                            let updateName = (tokensBox.childNodes[i] as HTMLDivElement).getAttribute('name') as string;
                            (document.querySelector(`[name=${(tokensBox.childNodes[i] as HTMLDivElement).getAttribute('name')}] #price`) as HTMLDivElement).innerHTML = `${res[updateName].USD}`;
                            (tokensBox.childNodes[i] as HTMLDivElement).setAttribute('value', res[updateName].USD);
                        } catch{}
                    }
                }
            });
    } catch{}
}
setInterval(updateCoin, 1000);