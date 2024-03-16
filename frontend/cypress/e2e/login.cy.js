describe("login", () => {
  it("passes", () => {
    cy.visit("http://localhost:4200/zaloguj-sie");
    cy.get("input[type=email]").type("Igor@Igor.com", { force: true });
    cy.get("input[type=password]").type("Igor123", { force: true });
    cy.get("button").contains("Zaloguj").click();
  });
});
