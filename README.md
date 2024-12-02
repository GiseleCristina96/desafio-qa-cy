# desafio-qa-cy

O arquivo de teste está localizado na pasta `e2e/cart-discount.cy.js`

## Explicação estrutura de código
- Cálculo do Desconto Esperado:
Função verificarDesconto calcula o valor esperado com base no total antes do cupom e o percentual de desconto.

- Reutilização de Funções:
Função obterValorTotal é usada para capturar o valor total antes de aplicar o cupom.

- Validação Precisa:
Uso de to.be.closeTo para tolerar pequenas diferenças devido a arredondamentos.

- Fluxo Completo:
O teste cobre desde adicionar um produto ao carrinho até aplicar o cupom e validar o resultado.

## Observações
- Bloco describe Compartilhado:
Ambos os cenários (FRETEGRATIS e 10OFF) estão no mesmo describe, facilitando a execução conjunta.

- Modularização:
As funções compartilhadas (adicionarProdutoAoCarrinho, aplicarCupom, obterValorTotal) evitam repetição de código.

- Execução Independente:
Cada it é um teste isolado, permitindo que falhas em um cenário não afetem o outro.

## Execução
Ao rodar o arquivo, os dois cenários serão executados sequencialmente.

>### Clone

Clone este repositório para sua máquina local. O repositório está público no git.

>### Execução na interface

Acessar a raiz do repositório

Execute comando para instalar as dependências listadas na seção de `devDependencies` do arquivo `package.json`

```
npm install
```

Execute comando para abrir a UI do cypress
```
npx cypress open
```

Na UI do cypress
```
- Clicar em E2E Testing
- Selecionar Chrome
- No menu, selecionar Specs
- Clicar em card-discount.cy.js
```
