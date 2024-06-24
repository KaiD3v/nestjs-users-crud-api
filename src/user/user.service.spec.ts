import { TestingModule, Test } from "@nestjs/testing"
import { UserService } from "./user.service"
import { PrismaService } from "../prisma/prisma.service";
import { userPrismaMock } from "../testing/user-prisma.mock";

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

    describe('Create', async () => {})
    describe('Create', async () => {})
    describe('Create', async () => {})

})