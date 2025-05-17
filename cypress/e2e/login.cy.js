describe('Admin Login Functionality - Online Shopping System', () => {
  const baseUrl = 'http://localhost/online-shopping-system-advanced-master/online-shopping-system-advanced-master/admin/login.php';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  // ✅ TEST CASE 1: Successful login
  it('should log in successfully with valid email and password', () => {
    cy.get('#your_name').should('be.visible').type('admin@gmail.com');
    cy.get('#your_pass').should('be.visible').type('123456789');
    cy.get('#signin').should('be.enabled').click();

    // ✅ Actual redirect is to /admin/admin/, not index.php
    cy.url({ timeout: 10000 }).should('include', 'admin/admin/');
  });

  // ❌ TEST CASE 2: Invalid Email/Password
  it('should display error for invalid email or password', () => {
    cy.get('#your_name').type('admin@gmail.com');
    cy.get('#your_pass').type('wrongpassword');
    cy.get('#signin').click();

    // ✅ Match actual error message
    cy.get('#e_msg')
      .should('be.visible')
      .invoke('text')
      .should('include', 'Wrong username/password combination');
  });

  // ⚠️ TEST CASE 3: Empty Fields
  it('should not allow login with empty email and password', () => {
    cy.get('#signin').click();

    // ✅ Match both required field messages
    cy.get('#e_msg')
      .should('be.visible')
      .invoke('text')
      .should('include', 'Username is required')
      .and('include', 'Password is required');
  });

  // 🔐 TEST CASE 4: SQL Injection Attempt
  it('should block SQL injection attempts in email and password', () => {
    cy.get('#your_name').type("' OR '1'='1");
    cy.get('#your_pass').type("' OR '1'='1");
    cy.get('#signin').click();

    // ✅ SQLi should be blocked with error
    cy.get('#e_msg')
      .should('be.visible')
      .invoke('text')
      .should('include', 'Wrong username/password combination');
  });

  // 🧼 TEST CASE 5: Trimmed Input Handling
  it('should reject credentials with surrounding whitespaces if not trimmed', () => {
    cy.get('#your_name').type('  admin@gmail.com  ');
    cy.get('#your_pass').type('  123456789  ');
    cy.get('#signin').click();

    // ✅ Should fail if input isn't trimmed properly
    cy.get('#e_msg')
      .should('be.visible')
      .invoke('text')
      .should('include', 'Wrong username/password combination');
  });
});
