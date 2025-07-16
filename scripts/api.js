const apiKey = 'CG-mdX6XbrhRoF2QKW8Pv88ajy4';
const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,brl&x_cg_demo_api_key=${apiKey}`;

// Função assíncrona para buscar os precos
async function fetchEthPrice() {
    const priceUsdSpan = document.getElementById('eth-price-usd');
    const priceBrlSpan = document.getElementById('eth-price-brl');
    const lastUpdatedSpan = document.getElementById('last-updated');

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }
        const data = await response.json();

        const priceUSD = data.ethereum.usd;
        const priceBRL = data.ethereum.brl;

        priceUsdSpan.textContent = priceUSD.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        priceBrlSpan.textContent = priceBRL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        lastUpdatedSpan.textContent = `Atualizado às ${new Date().toLocaleTimeString('pt-BR')}`;

    } catch (error) {
        console.error("Falha ao buscar cotação:", error);
        priceUsdSpan.textContent = 'Erro';
        priceBrlSpan.textContent = 'Erro';
        lastUpdatedSpan.textContent = 'Falha na atualização';
    }
}

export function initializePriceDisplay() {
    fetchEthPrice();
    setInterval(fetchEthPrice, 60000);
}