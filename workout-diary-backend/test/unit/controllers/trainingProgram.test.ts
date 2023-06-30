import * as db from '../../service/db'
import supertest from 'supertest'
import app from '../../../src/app'

const program = {
    name: "testProgram",
    workouts: [
        {
            day: "mon",
            exercises: [
                {
                    exercise: {
                        _id: "649bc78a79afd9b9de84086c",
                        name: "Жим лёжа",
                        muscle: "Большая грудная",
                        group: "chest"
                    },
                    sets: 4,
                    reps: 8,
                    weight: 0
                },
                {
                    exercise: {
                        _id: "649bc89379afd9b9de840870",
                        name: "Подтягивания широким хватом",
                        muscle: "Широчайшие мышцы спины",
                        group: "back"
                    },
                    sets: 4,
                    reps: 8,
                    weight: 0
                }
            ]
        },
    ]
}

const invalidProgram = {
    name: "testProgram",
    workouts: {}
}

describe('trainingProgram controller test', () => {
    beforeAll(async () => await db.connect());
    beforeEach(async () => await db.clear());
    afterAll(async () => await db.close());
    describe('POST /trainingProgram', () => {
        it('should save program', async () => {
            const response = await supertest(app)
                .post('/trainingProgram')
                .send(program)
            expect(response.status).toEqual(200)
            expect(response.body.name).toEqual(program.name)
        })
        it('should throw error if data invalid', async () => {
            const response = await supertest(app)
                .post('/trainingProgram')
                .send(invalidProgram)
            expect(response.status).toEqual(500)
        })
    })
    describe('GET /trainingProgram', () => {
        it('should return all trainingPrograms', async () => {
            await supertest(app)
                .post('/trainingProgram')
                .send(program)
                .then(async (trainingProgram) => {
                    const response = await supertest(app)
                        .get('/trainingProgram')
                    expect(response.status).toEqual(200)
                    expect(response.body).toEqual([trainingProgram.body])
                })
        })
        it('should throw error if collection not exist', async () => {
            await db.close();
            const response = await supertest(app)
                .get('/trainingProgram')
            expect(response.status).toEqual(500)

        })
    })
})