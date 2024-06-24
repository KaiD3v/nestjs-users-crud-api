import { UserService } from "../user/user.service"

export const userPrismaMock = {
    provide: UserService,
    useValue: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
    }

}