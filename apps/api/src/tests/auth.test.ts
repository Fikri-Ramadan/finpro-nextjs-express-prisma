import App from "../app";
import prisma from "../lib/prisma";
import supertest from 'supertest';

const app = new App().app;

describe("TEST Auth", () => {
  const sampleRegister = {
    username: 'test',
    email: 'test@test.com',
    password: 'Test123'
  };

  const sampleRegisterValidReferral = {
    username: 'testReferral',
    email: 'testReferral@test.com',
    password: 'Test123',
    referralCode: 'qshxLJRgIC' // referrer to fikri@gmail.com
  };

  const sampleRegisterExistingEmail = {
    ...sampleRegister
  };

  beforeEach(() => {

  });

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterEach(() => {

  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: sampleRegister.email
      }
    });

    await prisma.user.delete({
      where: {
        email: sampleRegisterValidReferral.email
      }
    });

    await prisma.$disconnect();
  });

  // GOOD CASE
  it('Should create new user without using referral code', async () => {
    const response = await supertest(app).post('/api/auth/register').send(sampleRegister);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('Should create new user using referral code', async () => {
    const response = await supertest(app).post('/api/auth/register').send(sampleRegisterValidReferral);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  // BAD CASE
  it('Should handle existing email register', async () => {
    const response = await supertest(app).post('/api/auth/register').send(sampleRegisterExistingEmail);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});