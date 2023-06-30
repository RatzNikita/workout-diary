import * as db from '../../service/db'
import supertest from 'supertest'
import app from '../../../src/app'
import {expect} from "@jest/globals";

const testExercise = {name: 'squats', muscle: 'Big muscle', group: 'legs'}
const invalidExercise = {name: 's', muscle: 0, group: 'face'}


describe('exercise controller test',() => {
    beforeAll(async () => await db.connect());
    beforeEach(async () => await db.clear());
    afterAll(async () => await db.close());
    describe('POST /exercises',() => {
        it('should create exercise if data valid', async () => {
            const response = await supertest(app)
                .post('/exercises')
                .send(testExercise)
            expect(response.status).toEqual(200)
            expect(response.body.name).toEqual('squats')
        })
        it('should throw error if data invalid',async () => {
            const response = await supertest(app)
                .post('/exercises')
                .send(invalidExercise)
            expect(response.status).toEqual(500)
        })
    })
    describe('GET /exercises',  ()  => {
        it('should return empty array if collection is empty', async () => {
            const response = await supertest(app)
                .get('/exercises')
            expect(response.status).toEqual(200)
            expect(response.body).toEqual([])
        })
        it('should return exercises if collection not empty', async () => {
           await supertest(app)
                .post('/exercises')
                .send(testExercise)
            .then(async (res) => {
                const response = await supertest(app).get('/exercises',)
                expect(response.status).toEqual(200)
                expect(response.body).toEqual([res.body])
            })
        })
        it('should throw error if db was disconnected',async () => {
            await db.close();
            const response = await supertest(app)
                .get('/exercises')
            expect(response.status).toEqual(500)
        })
    })
})