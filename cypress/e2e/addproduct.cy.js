import 'cypress-file-upload'; // Import the file upload plugin

describe('Admin Login and Product Addition Test - Online Shopping System', () => {
  const baseUrl = 'http://localhost/online-shopping-system-advanced-master/online-shopping-system-advanced-master/admin/login.php';
  const productPageUrl = 'http://localhost/online-shopping-system-advanced-master/online-shopping-system-advanced-master/admin/admin/add_products.php'; // Add Product page URL
  const filepath = 'images/handphone.jpg'; // File path inside the cypress/fixtures folder
  
  // Admin login credentials
  const adminUsername = 'admin@gmail.com';
  const adminPassword = '123456789';

  beforeEach(() => {
    // Visit the login page before each test
    cy.visit(baseUrl);
  });

  // ✅ TEST CASE: Successful login and product addition
  it('should log in successfully and add a new product', () => {
    // Step 1: Login as Admin
    cy.get('#your_name').type(adminUsername);
    cy.get('#your_pass').type(adminPassword);
    cy.get('#signin').click();

    // ✅ Verify the login is successful and redirect to the admin dashboard
    cy.url({ timeout: 10000 }).should('include', 'admin/admin/');

    // Step 2: Navigate to the Add Product page
    cy.visit(productPageUrl);

    // Step 3: Add Product Details
    // Enter Product Title
    cy.get('#product_name')
      .type('Test Product')
      .should('have.value', 'Test Product');

    // Enter Product Description
    cy.get('#details')
      .type('This is a test description for the product.')
      .should('have.value', 'This is a test description for the product.');

    // Enter Pricing
    cy.get('#price')
      .type('19.99')
      .should('have.value', '19.99');

    // Select Product Category
    cy.get('#product_type')
      .type('1') // Example category ID
      .should('have.value', '1');

    // Select Product Brand
    cy.get('#brand')
      .type('2') // Example brand ID
      .should('have.value', '2');

    // Enter Product Keywords
    cy.get('#tags')
      .type('electronics, gadgets, new')
      .should('have.value', 'electronics, gadgets, new');

    // Upload a sample image
    cy.get('#picture').should('be.visible').attachFile(filepath);

    // Step 4: Submit the Add Product Form
    cy.get('button[type="submit"]').click();

    // ✅ Verify the product is added successfully by checking the URL or success message
    cy.url().should('include', 'sumit_form.php?success=1'); // Adjust based on your actual success redirect or message
  });

 // ✅ TEST CASE 2: Ensure Product Title is required
 it('should show an error if product title is not provided', () => {
  cy.get('#product_name').clear(); // Clear the product title field
  cy.get('#details').type('Test Product Description');
  cy.get('#price').type('19.99');
  cy.get('#product_type').type('1');
  cy.get('#brand').type('2');
  cy.get('#tags').type('electronics, gadgets, new');
  cy.get('#picture').attachFile(filepath);
  
  cy.get('button[type="submit"]').click(); // Submit form

  // ✅ Verify error message for missing product title
  cy.get('.error-message') // Adjust according to your form's error message class or id
    .should('be.visible')
    .and('include.text', 'Product Title is required');
});


});
