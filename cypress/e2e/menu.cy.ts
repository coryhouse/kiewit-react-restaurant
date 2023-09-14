/// <reference types="cypress" />

it("should display the menu heading and the menu items, and support filtering by tag", () => {
  cy.visit("http://localhost:3000");
  cy.findByRole("heading", { name: "Menu" });

  cy.findByRole("heading", { name: "Burger" });

  // Filter by tag
  cy.findByRole("combobox", { name: "Filter by Tag" }).select("Breakfast");
  cy.findByText("1 food found.");
  cy.findByRole("heading", { name: "Banana Blueberry French Toast" });

  // Burger should be hidden when the breakfast tag is selected
  cy.findByRole("heading", { name: "Burger" }).should("not.exist");
});
