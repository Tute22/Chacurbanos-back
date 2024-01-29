import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('health')
@ApiTags('health')
export class HealthController {
    @Get()
    @ApiResponse({ status: 200, description: 'Returns a status code 200 OK' })
    ok() {
        return 'OK'
    }
}
