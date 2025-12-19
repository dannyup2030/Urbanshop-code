describe('Urban Shop - Pruebas E2E Frontend', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('La aplicación carga correctamente', () => {
    cy.url().should('include', 'localhost');
  });

  it('Existe contenido visible en la página', () => {
    cy.get('body').should('be.visible');
  });

  it('Existen enlaces o botones de navegación', () => {
    cy.get('a, button').should('exist');
  });

});
