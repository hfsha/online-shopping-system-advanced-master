Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore errors from jquery.payform.min.js
  if (err.message.includes('addEventListener') && err.stack.includes('jquery.payform.min.js')) {
    return false;
  }
  // Let other errors fail the test
});

describe('User Registration - Field Validation', () => {
  const baseUrl = 'http://localhost/online-shopping-system-advanced-master/online-shopping-system-advanced-master/signup_form.php';

  beforeEach(() => {
    cy.clearCookies();
    cy.visit(baseUrl);
    cy.get('#signup_form').should('be.visible');
  });

  // All valid data
  it('should register successfully with valid unique data', () => {
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(`valid${Date.now()}@mail.com`);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/store.php');
  });

  // FIRST NAME
  it('should show error when first name is blank', () => {
    const timestamp = Date.now();
    const testEmail = `test1_${timestamp}@gmail.com`;
    cy.get('#f_name').clear();
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('#mobile').type('0123456789');
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').type('StrongPass123!');
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });

  // LAST NAME
  it('should show error when last name is blank', () => {
    const timestamp = Date.now();
    const testEmail = `test2_${timestamp}@gmail.com`;
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').clear();
    cy.get('input[name="email"]').type(testEmail);
    cy.get('#mobile').type('0123456789');
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').type('StrongPass123!');
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });

  // EMAIL
  it('should show error when email is blank', () => {
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').clear();
    cy.get('#mobile').type('0123456789');
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').type('StrongPass123!');
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });
  it('should show browser validation for invalid email format', () => {
    const timestamp = Date.now();
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').clear().type('invalidemail');
    cy.get('#mobile').type('0123456789');
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').type('StrongPass123!');
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('input[name="email"]:invalid').should('exist');
  });

  // MOBILE
  it('should show error when mobile is blank', () => {
    const timestamp = Date.now();
    const testEmail = `test3_${timestamp}@gmail.com`;
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('#mobile').clear();
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').type('StrongPass123!');
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });

  // PASSWORD
  it('should show error when password is blank', () => {
    const timestamp = Date.now();
    const testEmail = `test4_${timestamp}@gmail.com`;
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('#mobile').type('0123456789');
    cy.get('#password').clear();
    cy.get('#repassword').type('StrongPass123!');
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });

  // REPEAT PASSWORD
  it('should show error when repeat password is blank', () => {
    const timestamp = Date.now();
    const testEmail = `test5_${timestamp}@gmail.com`;
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('#mobile').type('0123456789');
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').clear();
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });
  it('should show error for mismatched passwords', () => {
    const timestamp = Date.now();
    const testEmail = `test6_${timestamp}@gmail.com`;
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('#mobile').type('0123456789');
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').type('WrongPass123!');
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'Passwords do not match!');
  });

  // ADDRESS1
  it('should show error when address1 is blank', () => {
    const timestamp = Date.now();
    const testEmail = `test7_${timestamp}@gmail.com`;
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('#mobile').type('0123456789');
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').type('StrongPass123!');
    cy.get('#address1').clear();
    cy.get('#address2').type('Valid City');
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });

  // ADDRESS2
  it('should show error when address2 is blank', () => {
    const timestamp = Date.now();
    const testEmail = `test8_${timestamp}@gmail.com`;
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('#mobile').type('0123456789');
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').type('StrongPass123!');
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').clear();
    cy.get('#ckb1').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });

  // TERMS CHECKBOX
  it('should require terms checkbox to be checked', () => {
    const timestamp = Date.now();
    const testEmail = `test9_${timestamp}@gmail.com`;
    cy.get('#f_name').type('ValidFirst');
    cy.get('#l_name').type('ValidLast');
    cy.get('input[name="email"]').type(testEmail);
    cy.get('#mobile').type('0123456789');
    cy.get('#password').type('StrongPass123!');
    cy.get('#repassword').type('StrongPass123!');
    cy.get('#address1').type('Valid Address');
    cy.get('#address2').type('Valid City');
    // Do not check the checkbox
    cy.get('button[type="submit"]').click();
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'Please agree to the Terms and Conditions!');
  });

  // SQL INJECTION TESTS
  it('should block SQL injection attempts in first name', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#f_name').clear().type("' OR '1'='1");
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for injection)
    cy.get('#signup_msg').should('be.visible').and('contain.text', "this \' OR \'1\'=\'1 is not valid..!");
  });

  it('should block SQL injection attempts in last name', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#l_name').clear().type("' OR '1'='1");
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for injection)
    cy.get('#signup_msg').should('be.visible').and('contain.text', "this \' OR \'1\'=\'1 is not valid..!");
  });

  it('should block SQL injection attempts in email', () => {
    const timestamp = Date.now();
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('input[name="email"]').clear().type("' OR '1'='1");
    cy.get('button[type="submit"]').click();
    // Assert browser validation for invalid email format
    cy.get('input[name="email"]:invalid').should('exist');
  });

  it('should block SQL injection attempts in mobile', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#mobile').clear().type("' OR '1'='1");
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for injection)
    cy.get('#signup_msg').should('be.visible').and('contain.text', "Mobile number \' OR \'1\'=\'1 is not valid");
  });

  it('should block SQL injection attempts in password', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#password').clear().type("' OR '1'='1");
    cy.get('#repassword').clear().type("' OR '1'='1"); // Also inject into repeat password for consistency
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for injection)
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'Password is invalid'); // Keep existing assertion for now
  });

  it('should block SQL injection attempts in address1', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#address1').clear().type("' OR '1'='1");
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for injection)
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!'); // Keep existing assertion for now
  });

  it('should block SQL injection attempts in address2', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#address2').clear().type("' OR '1'='1");
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for injection)
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!'); // Keep existing assertion for now
  });

  // TRIMMED INPUT TESTS
  it('should reject first name with surrounding whitespaces if not trimmed', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#f_name').clear().type('  ValidFirst  ');
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for trimmed input)
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });

  it('should reject last name with surrounding whitespaces if not trimmed', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#l_name').clear().type('  ValidLast  ');
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for trimmed input)
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!');
  });

  it('should reject email with surrounding whitespaces if not trimmed', () => {
    const timestamp = Date.now();
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('input[name="email"]').clear().type(`  valid${timestamp}@mail.com  `);
    cy.get('button[type="submit"]').click();
    // Assert browser validation for invalid email format
    cy.get('input[name="email"]:invalid').should('exist');
  });

  it('should reject mobile with surrounding whitespaces if not trimmed', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#mobile').clear().type('  0123456789  ');
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for trimmed input)
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'Mobile number   0123456789   is not valid');
  });

  it('should reject password with surrounding whitespaces if not trimmed', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#password').clear().type('  StrongPass123!  ');
    cy.get('#repassword').clear().type('  StrongPass123!  '); // Also use trimmed input for repeat password
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for trimmed input)
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'Password is invalid'); // Keep existing assertion for now
  });

  it('should reject address1 with surrounding whitespaces if not trimmed', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address2').clear().type('Valid City');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#address1').clear().type('  Valid Address  ');
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for trimmed input)
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!'); // Keep existing assertion for now
  });

  it('should reject address2 with surrounding whitespaces if not trimmed', () => {
    const timestamp = Date.now();
    const testEmail = `valid${timestamp}@mail.com`;
    // Fill other required fields first to bypass browser validation
    cy.get('#f_name').clear().type('ValidFirst');
    cy.get('#l_name').clear().type('ValidLast');
    cy.get('input[name="email"]').clear().type(testEmail);
    cy.get('#mobile').clear().type('0123456789');
    cy.get('#password').clear().type('StrongPass123!');
    cy.get('#repassword').clear().type('StrongPass123!');
    cy.get('#address1').clear().type('Valid Address');
    cy.get('#ckb1').check({ force: true });
    // Input invalid data into the target field
    cy.get('#address2').clear().type('  Valid City  ');
    cy.get('button[type="submit"]').click();
    // Assert error message (adjust text if different message appears for trimmed input)
    cy.get('#signup_msg').should('be.visible').and('contain.text', 'PLease Fill all fields..!'); // Keep existing assertion for now
  });
});
  