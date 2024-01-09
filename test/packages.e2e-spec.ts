import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { getModelToken } from '@nestjs/mongoose'
import { Package } from 'src/models/Package'
import { Model } from 'mongoose'

describe('PackagesController', () => {
    let app: INestApplication
    let mongooseModel: Model<Package>

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        mongooseModel = moduleFixture.get(getModelToken('Package'))
        await app.init()
    })

    const newPackage = {
        address: 'Av Falsa 123, CABA',
        recipient: 'Juan Román Riquelme',
        weight: 5,
        date: new Date('2023-01-01T12:00:00Z'),
    }

    it('/packages (GET) should return status code 200 and an array of packages', async () => {
        const response = await request(app.getHttpServer())
            .get('/packages')
            .expect(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    it('/packages (POST) should return status code 201 and create a new package and include it in the response', async () => {
        const postResponse = await request(app.getHttpServer())
            .post('/packages')
            .send(newPackage)
            .expect(201)

        expect(postResponse.body).toBeInstanceOf(Object)
    })

    it('/packages (GET):_id should return the specified package by id', async () => {
        const postResponse = await request(app.getHttpServer())
            .post('/packages')
            .send(newPackage)
            .expect(201)

        const getResponse = await request(app.getHttpServer())
            .get(`/packages/${postResponse.body._id}`)
            .expect(200)

        expect(getResponse.body._id).toEqual(postResponse.body._id)
    })

    it('/packages (PATCH):_id should update the specified package by id', async () => {
        const postResponse = await request(app.getHttpServer())
            .post('/packages')
            .send(newPackage)
            .expect(201)

        const patchResponse = await request(app.getHttpServer())
            .patch(`/packages/${postResponse.body._id}`)
            .send({ address: 'José Hernández 166' })
            .expect(201)

        expect(patchResponse.body.address).toEqual('José Hernández 166')
    })

    it('/packages (DELETE):_id should delete the specified package by id', async () => {
        const postResponse = await request(app.getHttpServer())
            .post('/packages')
            .send(newPackage)
            .expect(201)

        const deleteResponse = await request(app.getHttpServer())
            .delete(`/packages/${postResponse.body._id}`)
            .expect(200)

        expect(deleteResponse.body.message).toEqual('Package deleted')
    })

    afterAll(async () => {
        const testPackages = await mongooseModel
            .find({ recipient: 'Juan Román Riquelme' })
            .exec()

        for (const testPackage of testPackages) {
            await mongooseModel.findByIdAndDelete(testPackage._id).exec()
        }

        await app.close()
    })
})
