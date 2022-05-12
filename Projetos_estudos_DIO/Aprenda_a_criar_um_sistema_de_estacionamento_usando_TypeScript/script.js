(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calTempo(mil) {
        const minutos = Math.floor(mil / 60000);
        const segundos = Math.floor(mil % 60000) / 1000; //Pegar o resto da divisão
        return `${minutos}m e ${segundos}s`;
    }
    function patio() {
        //Verificar se tem algo no localStorage --> *Transformar em JSON porque o localStorage só recebe string
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        //Transformar o objeto em string quando salvar
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">x</button>
                </td>
            `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("Click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva) { // Se o salva é true então pode salvar no banco
                salvar([...ler(), veiculo]); //Recebe todos veiculos que estão localStorage(fuunção ler() ) e adiciona novo veiculo no array
            }
        }
        function remover(placa) {
            //Buscar a placa do veículo
            const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = calTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
        function render() {
            $("#patio").innerHTML = ""; // O ponto de exclamação está forçando o innerHTML porque tenho certeza que o id patio está 
            // presente no HTML. **Cuidado ao fazer isso para não quebrar o código.
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render(); //Renderizar sempre que carregar a página
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Os campos nome e placa são obrigatório");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true); //Passar o true para que ele no IF e salve os dados
    });
})();
/**
 * Comando para transpilar o arquivo typescript em Javascript
 *
 * npx -p typescript tsc
 *
 */ 
