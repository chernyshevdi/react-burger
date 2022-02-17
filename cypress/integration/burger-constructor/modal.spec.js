describe('app works correctly with routes', function() {
    before(function() {
        cy.visit('http://localhost:3000');
        cy.waitForReact(1000, '#root');
    });

  it('open modal', function() {
    cy.get('section')
    .should('have.class', 'product-item_card__3f30t ml-4 mb-10')
    .get('img')
    .should('have.class', 'product-item_image__3O8nZ mb-1 ml-4 mr-4').eq(1)
    .click()
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  it('close modal', function() {
    cy.get('div')
    .get('.ingredient-details_description__1Lsj6 > .text_type_main-medium')
    .get('.ingredient-details_description__1Lsj6 > img')
    .get('.ingredient-details_stat__raaV- > :nth-child(1) > :nth-child(2)')
    .get('.ingredient-details_stat__raaV- > :nth-child(2) > :nth-child(2)')
    .get('.ingredient-details_stat__raaV- > :nth-child(3) > :nth-child(2)')
    .get('.ingredient-details_stat__raaV- > :nth-child(4) > :nth-child(2)')
    .get('.modal_close__1Iez6 > svg').click()
  });
})
