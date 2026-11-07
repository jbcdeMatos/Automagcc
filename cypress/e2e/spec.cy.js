describe('Testes da Página Inicial', () => {
  it('Acede à página com sucesso e cadastra card', () => {
    // 1. Acessa à aplicação
    cy.visit('https://onegc-hml.mjvmobile.com.br')
    
    // 2. Valida o carregamento da página
    cy.url().should('include', 'onegc-hml.mjvmobile.com.br')
    cy.wait(5000)
    
    // 3. Autenticação
    cy.get('#email').should('be.visible').type(Cypress.env('ONEGC_EMAIL'));
    cy.wait(5000)
    cy.get('#password').should('be.visible').type(Cypress.env('ONEGC_PASSWORD'));
    cy.wait(5000)
    cy.clickFresh('button[type="submit"]');
    cy.get('li:nth-child(1) span.text-muted-foreground').should('be.visible');
    cy.wait(5000)
    
    // 4. Selencionar a corretora que quer validar
    cy.wait(5000)
    cy.clickFresh('li:nth-child(1) span.text-muted-foreground');
    
    // 5. novo negócio 
    cy.wait(5000)
    cy.contains('button', /novo negócio/i).should('be.visible').click();
    
    // analisar os campos obrigatorio
    //Produto / Detalhe do produto / Grupo de produção / Tipo de pessoa / Cliente / Celular ou E-mail> 
    cy.wait(5000)
    cy.get('[role="dialog"]').should('be.visible').within(() => {
      cy.get('button.shadow').first().should('be.visible').click({ force: true });
    });
    
    // Campo prêmio 
    cy.wait(5000)
    cy.get('[role="dialog"] input.pl-9').should('be.visible').type('100.000,00');
    cy.wait(5000)
    cy.get('[role="dialog"] button.shadow').first().should('be.visible').click({ force: true });
    
    // Campo produto
    cy.wait(5000)
    cy.get('[role="dialog"] div:nth-child(2) > button.flex > span.truncate')
      .should('be.visible')
      .click({ force: true });
    cy.wait(5000)
    cy.contains('button', 'AERONÁUTICOS').should('be.visible').click({ force: true });
    
    // Campo Detalhe do produto
    cy.wait(5000)
    cy.get('[role="dialog"] div:nth-child(3) span.truncate')
      .should('be.visible')
      .click({ force: true });
    cy.wait(5000)
    cy.get('button').filter(':visible').contains(/aeronáuticos/i).should('be.visible').click({ force: true });
    
    // Grupo de produto
    // O botão de seleção de 'Detalhe do produto' está no estado 'aberto'.
    cy.get('#radix-_r_l_ button[data-state="open"]')
      .should(($el) => {
        expect($el).to.have.attr('aria-expanded', 'true')
        expect($el).to.have.attr('aria-controls')
      })
    // O botão do menu de seleção anterior foi fechado.
    cy.get('#radix-_r_l_ div:nth-child(3) button.flex')
      .should(($el) => {
        expect($el).to.have.attr('aria-expanded', 'false')
        expect($el).to.not.have.attr('aria-controls')
      })
    
    
    cy.wait(5000)
    cy.get('[role="option"]')
      .filter(':visible')
      .contains('AUTOMÓVEL')
      .should('be.visible')
      .click({ force: true });
    // O menu de seleção do produto foi fechado e exibe 'AUTOMÓVEL'. O produto selecionado agora é 'AUTOMÓVEL'.
    cy.get('#radix-_r_l_ div.space-y-4 > div:nth-child(2) > button.flex')
      .should(($el) => {
        expect($el).to.have.attr('aria-expanded', 'false')
        expect($el).to.not.have.attr('aria-controls')
        expect($el).to.contain.text('AUTOMÓVEL')
      })
    
    cy.wait(5000)
    cy.get('#radix-_r_l_ div:nth-child(3) button.flex').click();
    // O menu suspenso de 'Grupo de produto' está aberto.
    cy.get('#radix-_r_l_ button[data-state="open"]')
      .should(($el) => {
        expect($el).to.have.attr('aria-expanded', 'true')
        expect($el).to.have.attr('aria-controls')
      })
    // O menu de seleção do grupo de produto está visível.
    cy.wait(5000)
    cy.get('[role="option"]')
      .filter(':visible')
      .contains('AUTOMÓVEL - CASCO')
      .should('be.visible')
      .click({ force: true });
    // O menu suspenso de detalhe do produto foi fechado e exibe o valor selecionado.
    cy.get('#radix-_r_l_ div:nth-child(3) button.flex')
      .should(($el) => {
        expect($el).to.not.have.class('text-muted-foreground')
        expect($el).to.have.attr('aria-expanded', 'false')
        expect($el).to.not.have.attr('aria-controls')
        expect($el).to.contain.text('AUTOMÓVEL - CASCO')
      })
    
    cy.wait(5000)
    cy.get('#radix-_r_l_ span.line-clamp-1').click();
    // Um diálogo/popover de seleção foi aberto.
    cy.wait(5000)
    cy.get('[role="option"]')
      .filter(':visible')
      .contains('BELUCCI')
      .should('be.visible')
      .click({ force: true });
    // A opção selecionada 'BELUCCI' agora é exibida no botão do menu suspenso.
    cy.get('#radix-_r_l_ div.space-y-4 div:nth-child(4) div')
      .should('contain.text', 'BELUCCI')
    // O menu suspenso de seleção foi fechado e exibe 'BELUCCI'.
    cy.get('#radix-_r_l_ div:nth-child(4) > div > button.flex')
      .should(($el) => {
        expect($el).to.not.have.class('text-muted-foreground')
        expect($el).to.have.attr('aria-expanded', 'false')
        expect($el).to.not.have.attr('aria-controls')
      })
    
    cy.wait(5000)
    cy.get('[role="dialog"] div.space-y-4 > div:nth-child(5) button.flex')
      .should('be.visible')
      .then(() => {
        cy.wait(5000)
        cy.get('[role="dialog"] div.space-y-4 > div:nth-child(5) button.flex')
          .click({ force: true });
      });
    cy.wait(5000)
    cy.get('[role="option"]')
      .filter(':visible')
      .first()
      .should('be.visible')
      .then(($option) => {
        const responsible = $option.text().trim();
        cy.wait(5000)
        cy.wrap($option).click({ force: true });
        cy.get('[role="dialog"] div.space-y-4 > div:nth-child(5) button.flex')
          .should('not.contain.text', 'Selecione uma opção')
          .and('contain.text', responsible);
      });
    // O contêiner do diálogo agora está interativo.
    cy.get('#radix-_r_l_')
      .should(($el) => {
        expect($el).to.have.attr('style', 'pointer-events: auto;')
        expect($el).to.not.have.attr('aria-hidden')
      })
    
    cy.wait(5000)
    cy.get('#radix-_r_l_ button.text-primary').click();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: João da Silva"]').click();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: 123.456.789-12"]').click();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: 123.456.789-12"]').type('058.886.652-45');
    // Uma mensagem de erro 'CPF inválido' é exibida.
    cy.get('#radix-_r_l_ section:nth-child(3) div.space-y-4 div:nth-child(2) p.font-medium')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.contain.text('CPF inválido')
      })
    // O campo de CPF está marcado como inválido.
    cy.get('#radix-_r_l_ input[placeholder="Ex: 123.456.789-12"]')
      .should('have.value', '058.886.652-45')
    
    cy.wait(5000)
    cy.get('#radix-_r_l_ div.grid').click();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: 123.456.789-12"]').clear();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: 123.456.789-12"]').type('862.029.380-00');
    // O campo de CPF agora contém o novo valor '862.029.380-00'.
    cy.get('#radix-_r_l_ input[placeholder="Ex: 123.456.789-12"]')
      .should('have.value', '862.029.380-00')
    
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: João da Silva"]').click();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: João da Silva"]').type('Jo');
    // O campo de nome do cliente foi atualizado com o valor 'Jo' e agora é válido.
    cy.get('#radix-_r_l_ input[placeholder="Ex: João da Silva"]')
      .should('have.value', 'Jo')
    
    cy.wait(5000)
    cy.get('#radix-_r_l_ div.grid').click();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: 123.456.789-12"]').clear();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: 123.456.789-12"]').type('963.497.630-17');
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: João da Silva"]').click();
    cy.wait(5000)
    cy.get('#radix-_r_l_ div.grid').click();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[placeholder="Ex: João da Silva"]')
      .clear()
      .type('João matos');
    // O campo de nome do cliente agora contém o valor 'João matos'.
    cy.get('#radix-_r_l_ input[placeholder="Ex: João da Silva"]')
      .should('have.value', 'João matos')
    
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[autocomplete="nome-social"]').click();
    // O campo de 'Nome Social' agora contém o valor 'João matos'.
    cy.wait(5000)
    
    cy.get('#radix-_r_l_ input[autocomplete="nome-social"]')
      .should('have.value', 'João matos')
    
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[autocomplete="nome-social"]')
      .clear()
      .type('João matos');
    // O campo de 'Nome Social' agora contém o valor 'João matos'.
    cy.get('#radix-_r_l_ input[autocomplete="nome-social"]')
      .should('have.value', 'João matos')
    
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[type="date"]').click();
    cy.wait(5000)
    cy.get('#radix-_r_l_ input[type="date"]').type('1993-12-01');
    // O campo de data agora contém o valor '1993-12-01'.
    cy.get('#radix-_r_l_ input[type="date"]')
      .should('have.value', '1993-12-01')
    
    cy.wait(5000)
    cy.get('[role="dialog"] button')
      .filter(':visible')
      .contains('Solteiro(a)')
      .click({ force: true });
    // O menu suspenso de seleção de 'Estado civil' agora está visível.
    // O botão do menu suspenso de 'Estado Civil' agora está no estado 'aberto'.
    cy.get('[role="dialog"] button[data-state="open"]')
      .should(($el) => {
        expect($el).to.have.attr('aria-expanded', 'true')
        expect($el).to.have.attr('aria-controls')
      })
    
    cy.wait(5000)
    cy.get('body').click({ force: true });
    // O menu suspenso de 'Estado Civil' foi fechado e exibe 'Solteiro(a)'. O valor selecionado 'Solteiro(a)' agora está visível no botão do menu.
    cy.get('[role="dialog"] button')
      .filter(':visible')
      .filter((_, element) => element.innerText.trim() === 'Solteiro(a)')
      .first()
      .should(($el) => {
        expect($el).to.have.attr('aria-expanded', 'false')
        expect($el).to.not.have.attr('aria-controls')
      })
    
    cy.wait(5000)
    cy.get('[role="dialog"] button')
      .filter(':visible')
      .filter((_, element) => element.innerText.trim() === 'Masculino')
      .click({ force: true });
    // O contêiner do diálogo agora está ativo e interativo.
    cy.get('#radix-_r_l_')
      .should(($el) => {
        expect($el).to.have.attr('style', 'pointer-events: auto;')
        expect($el).to.not.have.attr('aria-hidden')
      })
    
    cy.wait(5000)
    cy.get('#novo-negocio-celular-0')
      .should('be.visible')
      .clear()
      .type('(11) 98119-4052');
    cy.wait(5000)
    cy.get('[role="dialog"] input[placeholder="cliente@exemplo.com"]')
      .should('be.visible')
      .clear()
      .type('joao.matos@mjv.com.br');
    cy.wait(5000)
    cy.get('[role="dialog"] button')
      .filter(':visible')
      .filter((_, element) => element.innerText.trim() === 'Salvar')
      .last()
      .should('be.enabled')
      .click({ force: true });
    cy.wait(5000)
    cy.get('[role="dialog"]').should('not.exist');
    cy.contains('João matos').should('be.visible');
    cy.get('div:nth-child(1) > dd.text-foreground').click();
    cy.get('section.bg-card.h-full').click();
    cy.get('div:nth-child(3) dd.text-foreground').click();
    cy.get('section.bg-card.h-full').click();
    cy.get('section.bg-card.h-full').click();
    cy.get('dl.gap-x-6').click();
    cy.get('dl.gap-x-6').click();
    cy.get('div.flex.mx-auto').click();
    cy.get('div.flex.mx-auto div.gap-3').click();
    cy.get('div.flex.mx-auto div.gap-3').click();
    cy.wait(5000)
    cy.get('span.text-\\[10px\\].text-muted-foreground').click({ force: true });
    // O diálogo 'Alterar responsável' agora está visível.
    cy.contains('span', 'Alterar responsável')
      .should('be.visible')
      .closest('[role="dialog"]')
      .as('responsibleDialog')
    // A quantidade mudou de 0 para 2.
    cy.get('@responsibleDialog')
      .find('ul.max-h-72 > li')
      .should('have.length', 2)
    // A lista de responsáveis, incluindo 'Rogeiro Pereira', está visível.
    cy.get('@responsibleDialog')
      .find('button.bg-primary\\/5 span.text-foreground')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.contain.text('Rogeiro  Pereira')
      })
    // O título do diálogo 'Alterar responsável' é exibido.
    cy.get('@responsibleDialog')
      .find('span.uppercase')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.contain.text('Alterar responsável')
      })
    
    cy.wait(5000)
    cy.get('@responsibleDialog')
      .find('li')
      .contains('Usuário grande corretora')
      .should('be.visible')
      .click({ force: true });
    // A quantidade mudou de 0 para 1.
    cy.wait(5000)
    // O nome de exibição do usuário foi atualizado para 'Usuário grande corretora'.
    cy.contains('span.font-medium.text-foreground', 'Usuário grande corretora')
      .should('be.visible')
    // O status do card mudou de '0 anos' para 'Indisponível'.
    cy.contains('p.font-medium', 'Indisponível')
      .should(($el) => {
        expect($el).to.contain.text('Indisponível')
        expect($el).to.have.class('text-muted-foreground')
        expect($el).to.not.have.class('text-foreground')
      })
    // O responsável atualizado permanece visível após o desaparecimento do toast.
    cy.get('span.text-xs.font-medium.text-foreground')
      .contains('Usuário grande corretora')
      .should('be.visible')
    
  })
})