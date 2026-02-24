const request = require('supertest');

const BASE_URL = `http://localhost:3000`; 

describe('User Management System API Tests', () => {
  let authToken;
  let testUserId;
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'password123';
  const testDob = '1995-05-15';
  const testUsername = `user_${Date.now()}`;

  // 1. PASS: Register
  it('should register a new user successfully', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/register')
      .send({
        username: testUsername,
        email: testEmail,
        password: testPassword,
        dob: testDob
      });

    expect(res.statusCode).toBe(201);
    testUserId = res.body.user.id;
  });

  // 2. PASS: Prevent Duplicate
  it('should return 400 when registering with an existing email', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/register')
      .send({
        username: 'otheruser',
        email: testEmail,
        password: 'password123',
        dob: '1990-01-01'
      });
    expect(res.statusCode).toBe(400);
  });

  // 3. PASS: Login
  it('should login and return a JWT token', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);
    authToken = res.body.token;
  });

  // 4. PASS: Validation
  it('should return 400 when fields are missing', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/register')
      .send({ email: 'incomplete@test.com' });
    expect(res.statusCode).toBe(400);
  });

  // 5. PASS: Invalid Password
  it('should return 401 for invalid password', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/login')
      .send({ email: testEmail, password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
  });

  // 6. PASS: Protected Profile
  it('should fetch profile details using token', async () => {
    const res = await request(BASE_URL)
      .get('/api/users/getMe')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
  });

  // 7. PASS: Security Check (Single User)
  it('should deny access to getUserById without token', async () => {
    const res = await request(BASE_URL).get(`/api/users/${testUserId}`);
    expect(res.statusCode).not.toBe(200);
  });

  // 8. PASS: Reset Password
  it('should reset password when email and DOB match', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/reset-password-dob')
      .send({
        email: testEmail,
        dob: testDob,
        newPassword: 'updatedPassword123'
      });
    expect(res.statusCode).toBe(200);
  });

  // 9. PASS: Login for non-existent email (NEW TEST)
  it('should return 404 for a non-existent email login', async () => {
    const res = await request(BASE_URL)
      .post('/api/users/login')
      .send({ 
        email: `ghost_${Date.now()}@notfound.com`, 
        password: 'somepassword' 
      });

    // Your controller returns 404 if user is not found
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/not found/i);
  });

  // 10. PASS: Security Check (All Users)
  it('should deny access to getAllUser without token', async () => {
    const res = await request(BASE_URL).get(`/api/users/getAllUser`);
    expect(res.statusCode).not.toBe(200);
  });
});