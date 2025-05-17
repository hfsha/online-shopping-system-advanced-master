import 'cypress-file-upload'; // Import the file upload plugin

describe('Admin Product Addition - Field Validation', () => {
  const loginUrl = 'http://localhost/online-shopping-system-advanced-master/online-shopping-system-advanced-master/admin/login.php';
  const productPageUrl = 'http://localhost/online-shopping-system-advanced-master/online-shopping-system-advanced-master/admin/admin/add_products.php';
  const filepath = 'images/handphone.jpg';
  const adminUsername = 'admin@gmail.com';
  const adminPassword = '123456789';

  beforeEach(() => {
    cy.session('admin', () => {
      cy.visit(loginUrl);
      cy.get('#your_name').type(adminUsername);
      cy.get('#your_pass').type(adminPassword);
      cy.get('#signin').click();
      cy.url({ timeout: 10000 }).should('include', 'admin/admin/');
    });
    cy.visit(productPageUrl);
  });

  it('should add product with all valid data', () => {
    cy.get('#product_name').clear().type('Test Product');
    cy.get('#details').clear().type('This is a test description for the product.');
    cy.get('#price').clear().type('19.99');
    cy.get('#product_type').clear().type('1');
    cy.get('#brand').clear().type('2');
    cy.get('#tags').clear().type('electronics, gadgets, new');
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.url().should('include', 'sumit_form.php?success=1');
  });

  // PRODUCT NAME
  it('should show browser validation for blank product name', () => {
    cy.get('#product_name').clear();
    cy.get('#details').type('Test Product Description');
    cy.get('#price').type('19.99');
    cy.get('#product_type').type('1');
    cy.get('#brand').type('2');
    cy.get('#tags').type('electronics, gadgets, new');
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('#product_name:invalid').should('exist');
  });

  // DESCRIPTION
  it('should show browser validation for blank description', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').clear();
    cy.get('#price').type('19.99');
    cy.get('#product_type').type('1');
    cy.get('#brand').type('2');
    cy.get('#tags').type('electronics, gadgets, new');
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('#details:invalid').should('exist');
  });

  // PRICE
  it('should show browser validation for blank price', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').type('Test Product Description');
    cy.get('#price').clear();
    cy.get('#product_type').type('1');
    cy.get('#brand').type('2');
    cy.get('#tags').type('electronics, gadgets, new');
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('#price:invalid').should('exist');
  });
  it('should show error for non-numeric price', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').type('Test Product Description');
    cy.get('#price').clear().type('abc');
    cy.get('#product_type').type('1');
    cy.get('#brand').type('2');
    cy.get('#tags').type('electronics, gadgets, new');
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('.alert-danger, .error-message').should('be.visible').and('contain.text', 'Price is invalid');
  });

  // PRODUCT CATEGORY
  it('should show browser validation for blank product category', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').type('Test Product Description');
    cy.get('#price').type('19.99');
    cy.get('#product_type').clear();
    cy.get('#brand').type('2');
    cy.get('#tags').type('electronics, gadgets, new');
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('#product_type:invalid').should('exist');
  });
  it('should show error for invalid product category', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').type('Test Product Description');
    cy.get('#price').type('19.99');
    cy.get('#product_type').clear().type('abc');
    cy.get('#brand').type('2');
    cy.get('#tags').type('electronics, gadgets, new');
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('.alert-danger, .error-message').should('be.visible').and('contain.text', 'Product category is invalid');
  });

  // BRAND
  it('should show browser validation for blank brand', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').type('Test Product Description');
    cy.get('#price').type('19.99');
    cy.get('#product_type').type('1');
    cy.get('#brand').clear();
    cy.get('#tags').type('electronics, gadgets, new');
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('#brand:invalid').should('exist');
  });
  it('should show error for invalid brand', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').type('Test Product Description');
    cy.get('#price').type('19.99');
    cy.get('#product_type').type('1');
    cy.get('#brand').clear().type('abc');
    cy.get('#tags').type('electronics, gadgets, new');
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('.alert-danger, .error-message').should('be.visible').and('contain.text', 'Brand is invalid');
  });

  // TAGS
  it('should show browser validation for blank tags', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').type('Test Product Description');
    cy.get('#price').type('19.99');
    cy.get('#product_type').type('1');
    cy.get('#brand').type('2');
    cy.get('#tags').clear();
    cy.get('#picture').attachFile(filepath);
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('#tags:invalid').should('exist');
  });

  // PICTURE
  it('should show browser validation for blank picture', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').type('Test Product Description');
    cy.get('#price').type('19.99');
    cy.get('#product_type').type('1');
    cy.get('#brand').type('2');
    cy.get('#tags').type('electronics, gadgets, new');
    // Do not attach file
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('#picture:invalid').should('exist');
  });
  it('should show error for invalid picture type', () => {
    cy.get('#product_name').type('Test Product');
    cy.get('#details').type('Test Product Description');
    cy.get('#price').type('19.99');
    cy.get('#product_type').type('1');
    cy.get('#brand').type('2');
    cy.get('#tags').type('electronics, gadgets, new');
    cy.get('#picture').attachFile('files/invalid.txt'); // Use a non-image file in your fixtures
    cy.get('button#btn_save, button[type="submit"]').click();
    cy.get('.alert-danger, .error-message').should('be.visible').and('contain.text', 'Picture type is invalid');
  });
});
