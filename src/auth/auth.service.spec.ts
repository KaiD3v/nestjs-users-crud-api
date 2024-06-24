import { userServiceMock } from './../testing/user-service.mock';
import { TestingModule, Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { PrismaService } from "../prisma/prisma.service"
import { jwtServiceMock } from "../testing/jwt-service.mock"
import { MailerService } from "@nestjs-modules/mailer"
import { mailerServiceMock } from "../testing/mailer-service.mock"
import { Rule } from "../enums/rule.enum"
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('AuthService', () => {

    let authService: AuthService;
    let prisma: PrismaService;
    let jwtService: JwtService;
    let userService: UserService;
    let mailerService: MailerService;

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

        authService = module.get<AuthService>(AuthService);
        prisma = module.get<PrismaService>(PrismaService);
        jwtService = module.get<JwtService>(JwtService);
        userService = module.get<UserService>(UserService);
        mailerService = module.get<MailerService>(MailerService);

    })

    test('Valdiate Definition', () => {
        expect(authService).toBeDefined()
    })

    describe('createToken', () => {
        test('should create a token', async () => {
            const testUser = {
                id: '1',
                name: 'Tester',
                email: 'useremail@codes.com',
                password: '123456',
                rule: Rule.Admin,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const expectedToken = 'mocked-jwt-token';
            (jwtService.sign as jest.Mock).mockReturnValue(expectedToken);

            const result = await authService.createToken(testUser);

            expect(jwtService.sign).toHaveBeenCalledWith({
                id: testUser.id,
                name: testUser.name,
                email: testUser.email
            }, {
                expiresIn: '7d',
                subject: String(testUser.id),
                issuer: 'login',
                audience: 'users'
            });
            expect(result).toEqual({ accessToken: expectedToken });
        });
    });
    describe('Autenticação', () => {})
})