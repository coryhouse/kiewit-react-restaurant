it("should support adding and deleting a food", () => {
  cy.visit("http://localhost:3000/admin");
  cy.findByLabelText("Name").type("New Food");
  cy.findByLabelText("Description").type("New Description");
  cy.findByLabelText("Price").type("10");
  cy.findByRole("button", { name: "Add Food" }).click();

  // Upon save, we should be on the menu page. Assure the URL is correct.
  cy.url().should("eq", "http://localhost:3000/");

  // The new food should be visible on the menu page.
  cy.findByRole("heading", { name: "New Food" });

  cy.findByRole("button", { name: "Delete New Food" }).click();

  // now the new food should be gone
  cy.findByRole("heading", { name: "New Food" }).should("not.exist");

  // Toast should display a confirmation of the delete.
  cy.findByText("New Food deleted.");
});
