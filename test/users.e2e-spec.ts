import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { getModelToken } from '@nestjs/mongoose'
import { User } from 'src/models/User'
import { Model } from 'mongoose'
// import { CreateUserDto } from 'src/users/users.dto'

describe('UsersController', () => {
    let app: INestApplication
    let mongooseModel: Model<User>

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        mongooseModel = moduleFixture.get(getModelToken('User'))
        await app.init()
    })

    const newUser = {
        name: 'Miguel',
        lastName: 'Merentiel',
        email: 'bestia@mail.com',
        password: 'bokita123',
    }

    it('/users (GET) should return status code 200 and an array of users', async () => {
        const response = await request(app.getHttpServer())
            .get('/users')
            .expect(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    it('/user (POST) should return status code 201 and create a new user and include it in the response', async () => {
        const postResponse = await request(app.getHttpServer())
            .post('/users')
            .send(newUser)
            .expect(201)

        expect(postResponse.body).toBeInstanceOf(Object)
    })

    // CASO CONTRARIO DE REGISTER
    it('/user (POST) should return a status code 400 and an error message when attempting to create a new user without including the required fields.', async () => {
        const postResponse = await request(app.getHttpServer())
            .post('/users')
            .send({
                name: 'Miguel',
                email: 'lospipppeeppslines@gmail.com',
                password: 'bokita123',
            })
            .expect(400)

        expect(postResponse.body.message).toEqual(
            'Campos incompletos. Por favor, proporcione toda la información requerida.'
        )
    })

    //CASO NEGATIVO DE REGISTER CON EMAIL YA EXITENTE
    it('/user (POST) should return a status code 400 and an error message when attempting to create a new user including an already registered email.', async () => {
        const postResponse = await request(app.getHttpServer())
            .post('/users')
            .send({
                name: 'Miguel',
                email: 'agustin@gmail.com',
                lastName: 'Ferrando',
                password: 'bokita123',
            })
            .expect(400)

        expect(postResponse.body.message).toEqual(
            'Ese email ya esta registrado'
        )
    })

    it('/users/login (POST) should return status code 201 and successfully login an user', async () => {
        await request(app.getHttpServer())
            .post(`/users`)
            .send(newUser)
            .expect(201)

        const postResponse = await request(app.getHttpServer())
            .post('/users/login')
            .send({ email: 'bestia@mail.com', password: 'bokita123' })
            .expect(201)

        expect(postResponse.body.user.email).toEqual('bestia@mail.com')
    })

    // CASO NEGATIVO DE LOGIN
    it('/users/login (POST) should return status code 404 and error login a user', async () => {
        const postResponse = await request(app.getHttpServer())
            .post('/users/login')
            .send({
                email: 'bestia@mail.com',
                password: 'alamaula23',
            })
            .expect(404)

        expect(postResponse.body.message).toEqual('Credenciales incorrectas')
    })

    it('/users/user (GET):_id should return the specified user by id', async () => {
        const postResponse = await request(app.getHttpServer())
            .post('/users')
            .send(newUser)
            .expect(201)

        const getResponse = await request(app.getHttpServer())
            .get(`/users/user/${postResponse.body._id}`)
            .expect(200)

        expect(getResponse.body._id).toEqual(postResponse.body._id)
    })

    it('/users (PATCH):_id should update the specified user by id', async () => {
        const postResponse = await request(app.getHttpServer())
            .post(`/users`)
            .send(newUser)
            .expect(201)

        const patchResponse = await request(app.getHttpServer())
            .patch(`/users/${postResponse.body._id}`)
            .send({ name: 'Miguelin' })
            .expect(201)

        expect(patchResponse.body.name).toEqual('Miguelin')
    })

    it('/users/:token (GET) should return status code 201 and login the user with their existing token', async () => {
        await request(app.getHttpServer())
            .post(`/users`)
            .send(newUser)
            .expect(201)

        const postResponse = await request(app.getHttpServer())
            .post('/users/login')
            .send({ email: 'bestia@mail.com', password: 'bokita123' })
            .expect(201)

        const getResponse = await request(app.getHttpServer())
            .get(`/users/${postResponse.body.token}`)
            .expect(200)

        expect(getResponse.body.email).toEqual('bestia@mail.com')
    })

    afterEach(async () => {
        const testUsers = await mongooseModel
            .find({ email: 'bestia@mail.com' })
            .exec()

        for (const testUser of testUsers) {
            await mongooseModel.findByIdAndDelete(testUser._id).exec()
        }

        // const testUsers2 = await mongooseModel
        //     .find({ email: 'bestia@mail.com' })
        //     .exec()

        await app.close()
    })
})
