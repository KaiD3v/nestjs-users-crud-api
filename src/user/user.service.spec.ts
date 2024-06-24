import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaServiceMock } from '../testing/user-prisma.mock';
import { CreateUserDTO } from './dto/create-user.dto';
import { Rule } from '../enums/rule.enum';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

describe('UserService', () => {
    let userService: UserService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: PrismaService,
                    useValue: prismaServiceMock,
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    test("Validate definition", () => {
        expect(userService).toBeDefined();
    });

    describe('Create Method', () => {
        test('should create a new user', async () => {
            const data: CreateUserDTO = {
                name: 'Create Test',
                email: 'createtest@gmail.com',
                password: '123456',
                rule: Rule.User,
            };

            const expectedResult = { id: '0258360e-6d2e-496f-bb16-244ef588d4ca', ...data };
            (prisma.user.create as jest.Mock).mockResolvedValue(expectedResult);

            const result = await userService.create(data);

            expect(prisma.user.create).toHaveBeenCalledWith({ data });
            expect(result).toEqual(expectedResult);
        });
    });

    describe('Read All Method', () => {
        test('should list all users', async () => {
            const expectedUsers = [
                { id: 1, name: 'User One', email: 'userone@gmail.com', rule: 'User' },
                { id: 2, name: 'User Two', email: 'usertwo@gmail.com', rule: 'Admin' },
            ];

            (prisma.user.findMany as jest.Mock).mockResolvedValue(expectedUsers);

            const result = await userService.readAll();
            expect(result).toEqual(expectedUsers);
            expect(prisma.user.findMany).toHaveBeenCalled();
        });
    });

    describe('Update Method', () => {
        test('Update Method - should update an existing user', async () => {
            const updatePutUserDTO: UpdatePutUserDTO = {
                name: 'Updated User',
                email: 'updateduser@gmail.com',
                password: 'newpassword',
                rule: Rule.Admin,
            };
    
            const expectedResult = { id: '0258360e-6d2e-496f-bb16-244ef588d4ca', ...updatePutUserDTO };
            (prisma.user.update as jest.Mock).mockResolvedValue(expectedResult);
    
            const result = await userService.update('0258360e-6d2e-496f-bb16-244ef588d4ca', updatePutUserDTO);
    
            expect(prisma.user.update).toHaveBeenCalledWith({
                where: { id: '0258360e-6d2e-496f-bb16-244ef588d4ca' },
                data: updatePutUserDTO,
            });
            expect(result).toEqual(expectedResult);
         });
        });

    describe('Delete Method', () => {
        test('should delete an existing user', async () => {
            const result = await userService.delete('0258360e-6d2e-496f-bb16-244ef588d4ca')

            const resulted = expect(prisma.user.delete).toHaveBeenCalledWith({
                where: {id: '0258360e-6d2e-496f-bb16-244ef588d4ca'}
            })

            expect(resulted).toEqual(result)
        });
    });
});
