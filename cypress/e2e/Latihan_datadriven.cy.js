/// <reference types="cypress" />


describe('My First Test', () => {
    var productName;
    var pattern = /[0-9]{1,3}\.[0-9]{2}/g;
    let numberItem;
    let userdata;

    beforeEach(() => {
        cy.fixture("test_data").then((data) => {
            userdata = data;
            cy.visit(Cypress.config("baseUrl"));
            cy.loginApp(userdata.username, userdata.password)
        })


    })
    it('Verify product pages', () => {
        cy.get('.inventory_item_img').first().should('be.visible')
        cy.get('.inventory_item_name').first().should('be.visible').invoke('text').as('productName')
        cy.get('.inventory_item_desc').first().should('be.visible').should('have.text', userdata.description)
        cy.get('.inventory_item_price').contains(new RegExp(userdata.usd_regex))
        cy.get('#add-to-cart-sauce-labs-backpack').should("have.text", userdata.add_to_cart)

        cy.get('.inventory_item_name').first().should('be.visible').invoke('text')
            .then((nameProduct) => {
                productName = nameProduct
            })
    })

    it('Verify detail product page', () => {
        cy.get('.inventory_item_name').first().click()
        cy.get('div[data-test="inventory-item-name"]').should("have.text", productName)
        cy.get('#add-to-cart').click()
        cy.get('.shopping_cart_badge').should("have.text", "1")
    })

    it('Verify successfully check out product', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click()
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

            cy.get('#finish').click()

            cy.get('.complete-header').should("have.text", "Thank you for your order!")

        })

    })

})
