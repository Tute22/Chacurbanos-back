import * as schedule from 'node-schedule'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { UsersService } from '../users/users.service'

export async function runScheduledTask() {
    const app = await NestFactory.createApplicationContext(AppModule)
    const usersService = app.get(UsersService)

    //Programar la tarea diariamente a las 00:00
    schedule.scheduleJob('0 0 * * *', async () => {
        try {
            console.log('Ejecutando la tarea programada...')
            await usersService.resetDeclarationStatusForAllUsers()
            console.log('Tarea programada completada.')
        } catch (error) {
            console.error('Error en la tareea programada:', error)
        }
    })
}

runScheduledTask()
