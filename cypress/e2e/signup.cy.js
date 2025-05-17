describe('User Registration - Online Shopping System', () => {

    const baseUrl = 'http://localhost/online-shopping-system-advanced-master/online-shopping-system-advanced-master/signup_form.php';
  
    beforeEach(() => {
      // Clear any existing cookies/session
      cy.clearCookies();
      // Visit the signup page before each test
      cy.visit(baseUrl);
      // Wait for the form to be fully loaded
      cy.get('#signup_form').should('be.visible');
    });
  
    // ✅ TEST CASE 1: Successful registration with valid inputs
    it('should register successfully with valid unique data', () => {
      const timestamp = Date.now();
      const testEmail = `test_${timestamp}@gmail.com`;
  
      cy.get('#f_name').type('Test');
      cy.get('#l_name').type('User');
      cy.get('input[name="email"]').type(testEmail);
      cy.get('#mobile').type('0192110000');
      cy.get('#password').type('123456789');
      cy.get('#repassword').type('123456789');
      cy.get('#address1').type('Test Address');
      cy.get('#address2').type('Test City');
      cy.get('#ckb1').check({ force: true });
  
      cy.get('button[type="submit"]').should('be.visible').click();
  
      cy.url().should('include', '/store.php');
    });
  
    // ❌ TEST CASE 2: Registration with empty required fields
    it('should show error when required fields are empty', () => {
      cy.get('button[type="submit"]').should('be.visible').click();
  
      cy.get('#signup_msg')
        .should('be.visible')
        .and('contain.text', 'PLease Fill all fields..!');
    });
  
    // 🛑 TEST CASE 3: Invalid email format
    it('should show error for invalid email format', () => {
      cy.get('#f_name').type('Test');
      cy.get('#l_name').type('User');
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('#mobile').type('0192110000');
      cy.get('#password').type('123456789');
      cy.get('#repassword').type('123456789');
      cy.get('#address1').type('Test Address');
      cy.get('#address2').type('Test City');
      cy.get('#ckb1').check({ force: true });
  
      cy.get('button[type="submit"]').should('be.visible').click();
  
      cy.get('#signup_msg')
        .should('be.visible')
        .and('contain.text', 'Please enter a valid email address!');
    });
  
    // ❗ TEST CASE 4: Mismatched password and repeat password
    it('should show error when password and confirm password do not match', () => {
      const timestamp = Date.now();
      const testEmail = `test_${timestamp}@gmail.com`;
  
      cy.get('#f_name').type('Test');
      cy.get('#l_name').type('User');
      cy.get('input[name="email"]').type(testEmail);
      cy.get('#mobile').type('0192110000');
      cy.get('#password').type('123456789');
      cy.get('#repassword').type('987654321');
      cy.get('#address1').type('Test Address');
      cy.get('#address2').type('Test City');
      cy.get('#ckb1').check({ force: true });
  
      cy.get('button[type="submit"]').should('be.visible').click();
  
      cy.get('#signup_msg')
        .should('be.visible')
        .and('contain.text', 'Passwords do not match!');
    });
  
    // Additional test case for terms checkbox
    it('should require terms checkbox to be checked', () => {
      const timestamp = Date.now();
      const testEmail = `test_${timestamp}@gmail.com`;
  
      cy.get('#f_name').type('Test');
      cy.get('#l_name').type('User');
      cy.get('input[name="email"]').type(testEmail);
      cy.get('#mobile').type('0192110000');
      cy.get('#password').type('123456789');
      cy.get('#repassword').type('123456789');
      cy.get('#address1').type('Test Address');
      cy.get('#address2').type('Test City');
  
      cy.get('button[type="submit"]').should('be.visible').click();
  
      cy.get('#signup_msg')
        .should('be.visible')
        .and('contain.text', 'Please agree to the Terms and Conditions!');
    });
  
    // --- FRONTEND JS FIX NEEDED ---
    // In your JS, before using .addEventListener, always check if the element exists:
    // var el = document.getElementById('some-id');
    // if (el) { el.addEventListener('click', ...); }
    // This will prevent 'Cannot read properties of undefined (reading addEventListener)' errors.
  });
  