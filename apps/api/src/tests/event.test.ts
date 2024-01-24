import App from "../app";
import prisma from "../lib/prisma";
import supertest from 'supertest';

const app = new App().app;

describe("TEST Event", () => {
const sampleEvent = {
    name: "Bulu Tangkis",
        price: 20000,
        startEvent: "2024-01-23T13:14:47.415Z" ,
        endEvent: "2024-02-23T13:14:47.415Z",
        categoryId: "clrqeb3la0008ihjnz0cq45dj",
        location: "Bandung",
        description: "Lorem Ipsum Dolor",
        availableSeat: 200,
        eventType: "PAID"
}
let eventId : string = ''; 
let token : string = '';
  beforeEach(() => {

  });

  beforeAll(async () => {
    await prisma.$connect();
    
    const response = await supertest(app).post('/api/auth/login').send({

        email: "ibnu2@mail.com",
        password: '123'
    });

    token = response.body.token
    console.log(response.body);
    
  });

  afterEach(() => {

  });

  afterAll(async () => {
    await prisma.event.delete({where: {id: eventId}})

    await prisma.$disconnect();
  });

  // GOOD CASE
  it('Should create new user without using referral code', async () => {
    const response = await supertest(app).post('/api/events').set('Authorization', `Bearer ${token}`).send(sampleEvent);

    // expect(response.status).toBe(201);
    // console.log(response);
    
    expect(response.body.success).toBe(true);
    eventId = response.body.results.id
  });

//   it('Should create new user using referral code', async () => {
//     const response = await supertest(app).post('/api/auth/register').send(sampleRegisterValidReferral);

//     expect(response.status).toBe(201);
//     expect(response.body.success).toBe(true);
//   });

//   // BAD CASE
//   it('Should handle existing email register', async () => {
//     const response = await supertest(app).post('/api/auth/register').send(sampleRegisterExistingEmail);

//     expect(response.status).toBe(400);
//     expect(response.body.success).toBe(false);
//   });
});