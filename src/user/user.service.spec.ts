import { TestingModule, Test } from "@nestjs/testing"
import { UserService } from "./user.service"
import { PrismaService } from "../prisma/prisma.service";
import { userPrismaMock } from "../testing/user-prisma.mock";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Rule } from "../enums/rule.enum";

describe('UserService', () => {

    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaService,
                userPrismaMock
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    test("Validate definition", () => {
        expect(userService).toBeDefined()
    })

    describe('Create Method', () => {
        test('should create a new user', async () => {
            const data: CreateUserDTO = {
                name: 'Create Test',
                email: 'createtest@gmail.com',
                password: '123456',
                rule: Rule.User
            };

            const expectedResult = {...data};
            (userService.create as jest.Mock).mockResolvedValue(expectedResult);

            const result = await userService.create(data);

            expect(userService.create).toHaveBeenCalledWith(data);
            expect(result).toBe(expectedResult);
        });
    })
    describe('Read', () => {})
    describe('Update', () => {})
    describe('Delete', () => {})

})