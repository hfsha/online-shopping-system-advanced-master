describe('Add Item to Cart Test', () => {
  beforeEach(() => {
    // Visit the store page before each test
    cy.visit('http://localhost/online-shopping-master/online-shopping-master/store.php');
    // Wait for the page to load completely
    cy.get('.product', { timeout: 10000 }).should('be.visible');
  });

  it('should add an item to the cart successfully', () => {
    // Get initial cart count
    cy.get('.badge.qty').invoke('text').then((initialCount) => {
      const initialCartCount = parseInt(initialCount) || 0;

      // Scroll to make products visible
      cy.scrollTo('0', 300);

      // Find and click the first add to cart button
      cy.get('.add-to-cart-btn').first().click();

      // Verify cart count increased
      cy.get('.badge.qty').should(($el) => {
        const newCount = parseInt($el.text()) || 0;
        expect(newCount).to.be.greaterThan(initialCartCount);
      });

      // Click on cart dropdown to verify item was added
      cy.get('.dropdown-toggle').click();
      cy.get('#cart_product').should('be.visible');
      cy.get('.product-widget').should('exist');
    });
  });

  it('should navigate to cart page and verify items', () => {
    // Add item to cart first
    cy.get('.add-to-cart-btn').first().click();

    // Navigate to cart page
    cy.visit('http://localhost/online-shopping-master/online-shopping-master/cart.php');

    // Verify cart page loaded
    cy.get('#cart_checkout').should('be.visible');

    // Verify cart has items
    cy.get('.cart-item').should('have.length.greaterThan', 0);
  });

  it('should handle checkout process', () => {
    // Add item to cart
    cy.get('.add-to-cart-btn').first().click();

    // Navigate to cart page
    cy.visit('http://localhost/online-shopping-master/online-shopping-master/cart.php');

    // Click checkout button
    cy.get('.checkout-btn').click();

    // Verify we're on checkout page
    cy.url().should('include', 'checkout.php');

    // Verify checkout form elements
    cy.get('form').should('exist');
    cy.get('input[type="submit"]').should('exist');
  });

  it('should handle quantity updates in cart', () => {
    // Add item to cart
    cy.get('.add-to-cart-btn').first().click();

    // Navigate to cart page
    cy.visit('http://localhost/online-shopping-master/online-shopping-master/cart.php');

    // Update quantity
    cy.get('.qty').first().clear().type('2');

    // Click update button
    cy.get('.update').first().click();

    // Verify quantity was updated
    cy.get('.qty').first().should('have.value', '2');
  });
});
  