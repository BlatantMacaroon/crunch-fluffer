import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/app.js';
import { connectDB } from '../../src/database.js';
import mongoose from 'mongoose';
import { CrunchModel } from '../../src/models/crunchModel.js';

const request = supertest(app);

describe('Crunch Integration Tests', () => {
    beforeAll(async () => await connectDB());
    afterAll(async () => await mongoose.connection.close()); 

    //todo: this test is slow because it takes a while for gemini to respond. 
    //Tried to speed things up by using cheaper model but hasn't helped a lot.
    it('should generate fluff for exiting crunch', async () => {
        const crunch = new CrunchModel({
            strength: 10, dexterity: 10, constitution: 10,
            intelligence: 10, wisdom: 10, charisma: 10,
            class: 'FIGHTER', race: 'HUMAN', level: 1
        });

        await crunch.save();
        
        const response = await request.post(`/api/fluff/${crunch._id}`).send({ "model": "gemini-2.5-flash-lite" });
        
        expect(response.body).not.toBe("");
        expect(response.status).toBe(201);
    }, 10000);
});