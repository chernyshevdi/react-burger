describe("Drag and Drop", () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/');
     
    });

    afterEach(() => {
        cy.saveLocalStorage();
      });
    
    it('should drag ingredient to the order', () => {
      const dataTransfer = new DataTransfer();

      cy.get('div').contains('Флюоресцентная булка R2-D3').trigger('dragstart', {
        dataTransfer
      });
  
      cy.get('#orderPlace').trigger('drop', {
        dataTransfer
      });

      cy.get('div').contains('Краторная булка N-200i').trigger('dragstart', {
        dataTransfer
      });
  
      cy.get('#orderPlace').trigger('drop', {
        dataTransfer
      });

      cy.get('div').contains('Соус с шипами Антарианского плоскоходца').trigger('dragstart', {
        dataTransfer
      });
  
      cy.get('#orderPlace').trigger('drop', {
        dataTransfer
      });

      cy.get('div').contains('Хрустящие минеральные кольца').trigger('dragstart', {
        dataTransfer
      });
  
      cy.get('#orderPlace').trigger('drop', {
        dataTransfer
      });

      cy.get('div').contains('Мини-салат Экзо-Плантаго').trigger('dragstart', {
        dataTransfer
      });
  
      cy.get('#orderPlace').trigger('drop', {
        dataTransfer
      });
      cy.get('div').contains("Оформить заказ").click()
      .get('input[type*="email"]').type('qwerty123@yas.ru')
      .get('input[type*="password"]').type('qwerty123')
      .get('div').contains("Войти").click()

      cy.get('div').contains("Оформить заказ").click()
      
      .get('.modal_close__1Iez6 > svg').click()
    });
  });