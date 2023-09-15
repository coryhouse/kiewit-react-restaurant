const testFood = {
  name: "New Food",
  description: "New Description",
  price: 10,
};

const editedFood = {
  name: "New Food2",
  description: "New Description2",
  price: 2,
};

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
  cy.findByLabelText("Name").type(testFood.name);
  cy.findByLabelText("Description").type(testFood.description);
  cy.findByLabelText("Price").type(testFood.price.toString());
  clickAddFood();

  // Upon save, we should be on the menu page. Assure the URL is correct.
  cy.url().should("eq", "http://localhost:3000/");

  // The new food should be visible on the menu page.
  cy.findByRole("heading", { name: testFood.name }).should("exist");
}

function testDeletingAFood() {
  cy.findByRole("button", { name: `Delete ${editedFood.name}` }).click();

  // now the new food should be gone
  cy.findByRole("heading", { name: editedFood.name }).should("not.exist");

  // Toast should display a confirmation of the delete.
  cy.findByText(`${editedFood.name} deleted.`);
}

function testEditingAFood() {
  cy.findByRole("link", { name: testFood.name }).click();

  // First, assure the form is populated with the info for the food we just clicked on.
  cy.findByLabelText("Name").should("have.value", testFood.name);
  cy.findByLabelText("Description").should("have.value", testFood.description);
  cy.findByLabelText("Price").should("have.value", testFood.price);

  // Now, change the name and submit the form.
  cy.findByLabelText("Name").clear().type(editedFood.name);
  cy.findByLabelText("Description").clear().type(editedFood.description);
  cy.findByLabelText("Price").clear().type(editedFood.price.toString());
  cy.findByRole("button", { name: "Save Food" }).click();

  // Upon save, we should be on the menu page. Assure the URL is correct.
  cy.url().should("eq", "http://localhost:3000/");

  // The new food should be visible on the menu page.
  cy.findByRole("heading", { name: editedFood.name }).should("exist");
}

it("should support adding, editing, and deleting a food", () => {
  cy.visit("http://localhost:3000/admin");

  testValidation();
  testAddingAFood();
  testEditingAFood();
  testDeletingAFood();
});
