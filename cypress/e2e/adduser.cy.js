describe('Add User Form - Field Validation', () => {
  const loginUrl = 'http://localhost/online-shopping-system-advanced-master/online-shopping-system-advanced-master/admin/login.php';
  const addUserUrl = 'http://localhost/online-shopping-system-advanced-master/online-shopping-system-advanced-master/admin/admin/addsuppliers.php';
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
    cy.visit(addUserUrl);
  });

  // All valid data
  it('should add user with all valid data', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('#first_name').should('have.value', '');
  });

  // FIRST NAME
  it('should show browser validation for blank first name', () => {
    cy.get('#first_name').clear();
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid2+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('#first_name:invalid').should('exist');
  });
  it('should show error for invalid first name', () => {
    cy.get('#first_name').clear().type('1234');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid13+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('.alert-danger').should('be.visible').and('contain.text', 'First name is invalid');
  });

  // LAST NAME
  it('should show browser validation for blank last name', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear();
    cy.get('#email').clear().type(`valid4+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('#last_name:invalid').should('exist');
  });
  it('should show error for invalid last name', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('!@#');
    cy.get('#email').clear().type(`valid14+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('.alert-danger').should('be.visible').and('contain.text', 'Last name is invalid');
  });

  // EMAIL
  it('should show browser validation for invalid email', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type('invalidemail');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('#email:invalid').should('exist');
  });
  it('should show browser validation for blank email', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear();
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('#email:invalid').should('exist');
  });
  it('should show browser validation for email missing @', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type('invalidemail.com');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('#email:invalid').should('exist');
  });

  // PASSWORD
  it('should show browser validation for blank password', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid6+${Date.now()}@mail.com`);
    cy.get('#password').clear();
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('#password:invalid').should('exist');
  });
  it('should show error for short password', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid15+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('12');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('.alert-danger').should('be.visible').and('contain.text', 'Password is too short');
  });

  // PHONE
  it('should show browser validation for blank phone', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid8+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear();
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('#phone:invalid').should('exist');
  });
  it('should show error for invalid phone', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid16+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('abcde');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('.alert-danger').should('be.visible').and('contain.text', 'Phone is invalid');
  });

  // CITY
  it('should show browser validation for blank city', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid10+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear();
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('#city:invalid').should('exist');
  });
  it('should show error for invalid city', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid17+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('1234');
    cy.get('#country').clear().type('ValidCountry');
    cy.get('button#btn_save').click();
    cy.get('.alert-danger').should('be.visible').and('contain.text', 'City is invalid');
  });

  // COUNTRY
  it('should show browser validation for blank country', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid12+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear();
    cy.get('button#btn_save').click();
    cy.get('#country:invalid').should('exist');
  });
  it('should show error for invalid country', () => {
    cy.get('#first_name').clear().type('ValidName');
    cy.get('#last_name').clear().type('ValidLast');
    cy.get('#email').clear().type(`valid18+${Date.now()}@mail.com`);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#phone').clear().type('0123456789');
    cy.get('#city').clear().type('ValidCity');
    cy.get('#country').clear().type('1234');
    cy.get('button#btn_save').click();
    cy.get('.alert-danger').should('be.visible').and('contain.text', 'Country is invalid');
  });
});
