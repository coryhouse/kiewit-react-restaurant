function clickAddFood() {
  cy.findByRole("button", { name: "Add Food" }).click();
}

function testValidation() {
  // Test validation by trying to submit an empty form.
  clickAddFood();

  cy.findByText("String must contain at least 1 character(s)");
  cy.findByText("String must contain at least 2 character(s)");
  cy.findByText("Number must be greater than or equal to 1");
}

function testAddingAFood() {
  cy.findByLabelText("Name").type("New Food");
  cy.findByLabelText("Description").type("New Description");
  cy.findByLabelText("Price").type("10");
  clickAddFood();

  // Upon save, we should be on the menu page. Assure the URL is correct.
  cy.url().should("eq", "http://localhost:3000/");

  // The new food should be visible on the menu page.
  cy.findByRole("heading", { name: "New Food" });
}

function testDeletingAFood() {
  cy.findByRole("button", { name: "Delete New Food" }).click();

  // now the new food should be gone
  cy.findByRole("heading", { name: "New Food" }).should("not.exist");

  // Toast should display a confirmation of the delete.
  cy.findByText("New Food deleted.");
}

function testEditingAFood() {
  cy.findByRole("link", { name: "New Food" }).click();
  cy.findByLabelText("Name").should("have.value", "New Food");
}

it("should support adding, editing, and deleting a food", () => {
  cy.visit("http://localhost:3000/admin");

  testValidation();
  testAddingAFood();
  testEditingAFood();
  testDeletingAFood();
});
