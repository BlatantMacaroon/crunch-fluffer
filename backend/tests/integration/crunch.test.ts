import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/app.js';
import { connectDB } from '../../src/database.js';
import mongoose from 'mongoose';

const request = supertest(app);

describe('Crunch Integration Tests', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await mongoose.connection.close());
    
    it('should create a character and return it', async() => {
        const payload = {
            strength: 15,
            dexterity: 10, 
            constitution: 14,
            intelligence: 8,
            wisdom: 12,
            charisma: 10,
            class: 'FIGHTER',
            race: 'HUMAN',
            level: 1
        }

        const response = await request.post('/api/crunch').send(payload);

        expect(response.status).toBe(201);
        expect(response.body.class).toBe('FIGHTER');
        expect(response.body._id).toBeDefined(); //proves it hit the db
    })

    it('should fail if a required field is missing', async() => {
        const response = await request.post('/api/crunch').send({level:5});
        expect(response.status).toBe(400);
    })

    //todo can we chain tests to run them one after the other?
    
})