/// <reference types="cypress" />


describe('My First Test', () => {
  var productName
  var pattern = /[0-9]{1,3}\.[0-9]{2}/g;
  let numberItem
  it('Does not do much!', () => {
    cy.visit("https://www.saucedemo.com/");

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

 })
})



//Locators
// tag id --> #id
// tag class --> .class
// tag attribute --> [atribute='value']
// tag class atribute --> .class[atribute='value']