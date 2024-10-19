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

    cy.get('.inventory_item_img').first().should('be.visible')
    // cy.get('.inventory_item_name').first().should('be.visible').invoke('text').as('productName')

    cy.get('.inventory_item_desc').first().should('be.visible')
    cy.get('.inventory_item_price').first().should('be.visible').invoke('text').then(price => cy.log(price))
    cy.get('.inventory_item_price').contains(new RegExp ('^\\$[0-9]{1,3}\\.[0-9]{2}$'))
    cy.get('#add-to-cart-sauce-labs-backpack').should("have.text","Add to cart")
    
    cy.get('.inventory_item_name').first().should('be.visible').invoke('text')
    .then((nameProduct) => {
       productName = nameProduct
       cy.log(productName)
       cy.get('.inventory_item_name').first().click()
       cy.get('div[data-test="inventory-item-name"]').should("have.text",productName)

    })
    
    cy.get('#add-to-cart').click()
    cy.get('.shopping_cart_badge').should("have.text","1")

    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()


    cy.get('#first-name').type("John")
    cy.get('#last-name').type("Robert")
    cy.get('#postal-code').type("70282")
    cy.get('#continue').click()

    cy.get('.summary_subtotal_label').first().should('be.visible').invoke('text').then(item => {
      numberItem = item.match(pattern)
      cy.log(numberItem[0])

      cy.get('.summary_tax_label').first().should('be.visible').invoke('text').then(tax => {
        let numbertax = tax.match(pattern)
        cy.log(numbertax[0])

        let totalSummary = parseFloat(numberItem[0]) + parseFloat(numbertax[0])
        cy.log(totalSummary)

        cy.get('.summary_total_label').first().contains(totalSummary)

      })
    })

    cy.get('#finish').click()

    cy.get('.complete-header').should("have.text", "Thank you for your order!")

 })
})



//Locators
// tag id --> #id
// tag class --> .class
// tag attribute --> [atribute='value']
// tag class atribute --> .class[atribute='value']