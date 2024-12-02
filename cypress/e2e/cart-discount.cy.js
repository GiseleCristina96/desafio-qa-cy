describe('Carrinho de Compras - Teste de Cupons', () => {

  // Função para adicionar um produto ao carrinho
  const adicionarProdutoAoCarrinho = () => {
    cy.contains('PRODUTO').should('be.visible').click();  // Clicar no produto desejado
    cy.get('.botao-comprar').first().click();  // Clicar no botão "comprar" do primeiro produto
    cy.get('.buttons').contains('Continuar comprando').click();  // Continuar comprando após adicionar ao carrinho
    cy.get('.carrinho').should('have.length', 1); // Valor conforme o número de produtos
  };

  // Função para aplicar um cupom no carrinho
  const aplicarCupom = (cupom) => {
    cy.get('#usarCupom').type(cupom);  // Digitar o cupom
    cy.get('#btn-cupom').click();  // Aplicar o cupom
    cy.get('.mensagem-cupom', { timeout: 5000 }).should('not.exist');  // Garantir que não há mensagens de erro
  };

  // Função para verificar o valor do frete
  const verificarFrete = () => {
    cy.get('.cor-principal').should('contain', 'R$ 0,00');  // Verificar se o valor do frete foi zerado
  };

  // Função para capturar o valor total
  const obterValorTotal = () => {
    return cy.get('.valor-total').then($total => {
      const totalValue = parseFloat($total.text().replace('R$', '').replace(',', '.').trim());
      return totalValue;
    });
  };

  // Função para verificar o desconto aplicado
  const verificarDesconto = (valorOriginal, percentualDesconto) => {
    const descontoEsperado = valorOriginal * (1 - percentualDesconto / 100);
    cy.get('.valor-total').then($total => {
      const valorAtual = parseFloat($total.text().replace('R$', '').replace(',', '.').trim());
      expect(valorAtual).to.be.closeTo(descontoEsperado, 0.01);  // Verificar se o valor é próximo ao esperado
    });
  };

  it('Deve aplicar o cupom FRETEGRATIS e zerar o valor do frete', () => {
    cy.visit('https://qastoredesafio.lojaintegrada.com.br/');

    adicionarProdutoAoCarrinho();

    cy.get('.carrinho').click();

    cy.get('#calcularFrete').type('69085288');  // Digitar o CEP para calcular o frete
    cy.get('#btn-frete').should('be.enabled').click();  // Clicar para calcular o frete
    cy.get('.prazo').contains('2 dias úteis').click();  // Escolher a opção de prazo de entrega

    aplicarCupom('FRETEGRATIS');  // Aplicar o cupom FRETEGRATIS

    verificarFrete();  // Verificar se o valor do frete foi zerado
  });

  it('Deve aplicar o cupom 10OFF e descontar 10% do total', () => {
    cy.visit('https://qastoredesafio.lojaintegrada.com.br/');

    adicionarProdutoAoCarrinho();

    cy.get('.carrinho').click();

    obterValorTotal().then(valorOriginal => {
      aplicarCupom('10OFF');  // Aplicar o cupom 10OFF
      verificarDesconto(valorOriginal, 10);  // Verificar se o desconto de 10% foi aplicado
    });
  });

});
