import { TestingModule, Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { PrismaService } from "../prisma/prisma.service"
import { userServiceMock } from "../testing/user-service.mock"
import { jwtServiceMock } from "../testing/jwt-service.mock"
import { MailerService } from "@nestjs-modules/mailer"
import { mailerServiceMock } from "../testing/mailer-service.mock"

describe('AuthService', () => {

    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService, 
                PrismaService, 
                MailerService,
                mailerServiceMock,
                userServiceMock, 
                jwtServiceMock
            ]
        }).compile()

        authService = module.get<AuthService>(AuthService)

    })

    test('Valdiate Definition', () => {
        expect(authService).toBeDefined()
    })
})