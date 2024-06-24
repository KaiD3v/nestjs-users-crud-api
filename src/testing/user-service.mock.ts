import { UserService } from "../user/user.service"

export const userServiceMock = {
    provide: UserService,
    useValue: {
        readOne: jest.fn(),
        readAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
};