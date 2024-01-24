describe("Add new water measurment", () => {
  it("passes", () => {
    cy.visit("http://localhost:4200/wypijana-woda");
    cy.get("input[type=email]").type("Igor@Igor.com", { force: true });
    cy.get("input[type=password]").type("Igor123", { force: true });
    cy.get("button").contains("Zaloguj").click();
    cy.get('.example-icon').click()
    cy.get('mat-list-item').contains('Kontrola wypijanej wody').click()
    cy.get('button').contains('Dodaj pomiar spożytej wody').click()
    cy.get("input[type=number]").type('1500', { force: true });
    cy.get('.add-water-measurment').contains('Dodaj').click()
  });
});
