describe('Admin Profile - Password Field Validations and Change', () => {
  const loginUrl = 'http://localhost/online-shopping-master/admin/login.php';
  const profileUrl = 'http://localhost/online-shopping-master/admin/admin/profile.php';
  const adminUsername = 'admin@gmail.com';
  const currentPassword = '123456789'; // Must match current DB value
  const newPassword = 'NewStrongPass456!';

  beforeEach(() => {
    cy.visit(loginUrl);
    cy.get('#your_name').type(adminUsername);
    cy.get('#your_pass').type(currentPassword);
    cy.get('#signin').click();
    cy.url().should('include', 'admin/admin/');
    cy.visit(profileUrl);
  });

  // EMPTY FIELD TESTS
  it('should show alert when old password is empty', () => {
    cy.get('input[name="old_pass"]').clear();
    cy.get('input[name="new_pass"]').type('abc');
    cy.get('input[name="re_pass"]').type('abc');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.match(/old password/i);
    });
  });

  it('should show alert when new password is empty', () => {
    cy.get('input[name="old_pass"]').type(currentPassword);
    cy.get('input[name="new_pass"]').clear();
    cy.get('input[name="re_pass"]').type('abc');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.match(/new password/i);
    });
  });

  it('should show alert when confirm password is empty', () => {
    cy.get('input[name="old_pass"]').type(currentPassword);
    cy.get('input[name="new_pass"]').type('abc');
    cy.get('input[name="re_pass"]').clear();
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.match(/confirm password/i);
    });
  });

  // SQL INJECTION TEST
  it('should reject SQL injection in password fields', () => {
    const injection = "' OR '1'='1";

    cy.get('input[name="old_pass"]').type(injection);
    cy.get('input[name="new_pass"]').type(injection);
    cy.get('input[name="re_pass"]').type(injection);
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.match(/wrong|invalid|not match/i);
    });
  });

  // WHITESPACE HANDLING
  it('should trim leading/trailing whitespace in inputs', () => {
    cy.get('input[name="old_pass"]').type(' 123456789 ');
    cy.get('input[name="new_pass"]').type(' NewPass123 ');
    cy.get('input[name="re_pass"]').type(' NewPass123 ');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.match(/Update Sucessfully|Password updated/i);
    });
  });

  // MISMATCHED PASSWORDS
  it('should not allow password change with mismatched new passwords', () => {
    cy.get('input[name="old_pass"]').type(currentPassword);
    cy.get('input[name="new_pass"]').type(newPassword);
    cy.get('input[name="re_pass"]').type('DifferentPass123');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.include('New Password and Confirm Password do not match');
    });
  });

  // WEAK PASSWORD
  it('should not allow password change with weak new password', () => {
    cy.get('input[name="old_pass"]').type(currentPassword);
    cy.get('input[name="new_pass"]').type('weak');
    cy.get('input[name="re_pass"]').type('weak');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.include('New Password is too weak');
    });
  });

  // SUCCESSFUL CHANGE
  it('should change the password successfully', () => {
    cy.get('input[name="old_pass"]').type(currentPassword);
    cy.get('input[name="new_pass"]').type(newPassword);
    cy.get('input[name="re_pass"]').type(newPassword);
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.include('Update Sucessfully');
    });
  });
});
