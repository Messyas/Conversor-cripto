document.addEventListener("DOMContentLoaded", () => {
    // --- Constantes de Conversão ---
    // BigInt é usadado para evitar problemas de precisão com números muito grandes como o de Wei.
    const ETH_IN_WEI = 10n ** 18n;
    const GWEI_IN_WEI = 10n ** 9n;

    const conversions = {
        eth: {
            wei: (val) => BigInt(Math.round(val * 1e18)),
            gwei: (val) => val * 1e9,
            eth: (val) => val,
        },
        gwei: {
            wei: (val) => BigInt(Math.round(val * 1e9)),
            eth: (val) => val / 1e9,
            gwei: (val) => val,
        },
        wei: {
            // Para converter de Wei para uma unidade menor, é preciso usa casting de BigInt para Number para evitar erros de ponto flutuante na divisao.
            eth: (val) => Number(BigInt(val)) / 1e18,
            gwei: (val) => Number(BigInt(val)) / 1e9,
            wei: (val) => val,
        },
    };

    // Calcula o custo da transacao
    function calculateTransactionCost(gasPriceGwei, gasLimit) {
        const gasPriceWei = conversions["gwei"]["wei"](gasPriceGwei);
        const totalCostWei = gasPriceWei * BigInt(gasLimit);
        const totalCostEth = conversions["wei"]["eth"](totalCostWei);
        return {
            wei: totalCostWei,
            eth: totalCostEth,
        };
    }

    const inputValue = document.getElementById("inputValue");
    const outputValue = document.getElementById("outputValue");
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
    const convertButton = document.getElementById("convertButton");
    const swapButton = document.getElementById("swapButton");

    const gasPriceInput = document.getElementById("gasPrice");
    const gasLimitInput = document.getElementById("gasLimit");
    const calculateCostButton = document.getElementById("calculateCostButton");
    const costResultDiv = document.getElementById("costResult");
    const costEthSpan = document.getElementById("costEth");
    const costWeiSpan = document.getElementById("costWei");

    convertButton.addEventListener("click", () => {
        const from = fromUnit.value;
        const to = toUnit.value;
        const value = Number(inputValue.value);

        if (isNaN(value)) {
            outputValue.value = "Entrada inválida";
            return;
        }

        const result = conversions[from][to](value);
        // BigInt precisa ser convertido para string para ser exibido 
        outputValue.value = result.toString();
    });

    swapButton.addEventListener("click", () => {
        const fromVal = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = fromVal;
    });

    calculateCostButton.addEventListener("click", () => {
        const gasPrice = gasPriceInput.value;
        const gasLimit = gasLimitInput.value;

        if (
            !gasPrice ||
            !gasLimit ||
            isNaN(Number(gasPrice)) ||
            isNaN(Number(gasLimit))
        ) {
            alert("Por favor, insira valores válidos para Preço e Limite de Gás.");
            return;
        }
        const cost = calculateTransactionCost(gasPrice, gasLimit);

        costEthSpan.textContent = cost.eth.toPrecision(8);
        costWeiSpan.textContent = cost.wei.toString();
        costResultDiv.style.display = "block";
    });
});
