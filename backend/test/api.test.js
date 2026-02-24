const request = require('supertest');

const BASE_URL = `http://localhost:3000`; 

describe('User Management System API Tests', () => {
  let authToken;
  let testUserId;
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'password123';
  const testDob = '1995-05-15';

  // 1. PASS: Register a new user
  it('should register a new user successfully', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/register')
      .send({
        username: `user_${Date.now()}`,
        email: testEmail,
        password: testPassword,
        dob: testDob
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    testUserId = res.body.user.id;
  });

  // 2. PASS: Login successfully
  it('should login and return a JWT token', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    authToken = res.body.token;
  });

  // 3. PASS: Registration Validation (Missing Fields)
  it('should return 400 when fields are missing', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/register')
      .send({ email: 'incomplete@test.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // 4. PASS: Login Validation (Wrong Password)
  it('should return 401 for invalid password', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/login')
      .send({ email: testEmail, password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  // 5. PASS: Fetch own profile (getMe)
  it('should fetch profile details using token', async () => {
    const res = await request(BASE_URL)
      .get('/api/users/getMe')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(testEmail);
  });

  // 6. PASS: Reset Password via DOB
  it('should reset password when email and DOB match', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/reset-password-dob')
      .send({
        email: testEmail,
        dob: testDob,
        newPassword: 'updatedPassword123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // 7. PASS: Update User Info
  it('should update user username successfully', async () => {
    const res = await request(BASE_URL)
      .put(`/api/users/update/${testUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ username: 'final_test_name' });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.username).toBe('final_test_name');
  });

  // 8. PASS: Security Check (Unauthorized Access)
  it('should deny access to delete without token', async () => {
    const res = await request(BASE_URL)
      .delete(`/api/users/delete/${testUserId}`);

    // Since no token is provided, authGuard should block this.
    expect(res.statusCode).not.toBe(200);
  });
});