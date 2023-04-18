import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an user', async () => {
    const input = {
      firstName: 'e2e',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    const user = await controller.create(input);
    expect(user.id).toBeDefined();
    expect(user.firstName).toBe('e2e');
  });

  it('should find an user', async () => {
    const input = {
      firstName: 'e2e',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    const user = await controller.create(input);
    expect(user.id).toBeDefined();
    expect(user.firstName).toBe('e2e');

    const foundUser = await controller.findOne(user.id);
    expect(foundUser.id).toBe(user.id);
    expect(foundUser.firstName).toBe('e2e');
  });

  it('should find all users', async () => {
    const input = {
      firstName: 'e2e',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    await controller.create(input);
    await controller.create(input);

    const users = await controller.findAll();

    expect(users.length).toBe(2);
  });

  it('should update one user', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    const user = await controller.create(input);
    await controller.create(input);

    expect(controller).toBeDefined();
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.username).toBe('unit-test');

    let updatedUser = controller.update(user.id, { firstName: 'New name' });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.firstName).toBe('New name');

    updatedUser = controller.update(user.id, { lastName: 'New last name' });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.lastName).toBe('New last name');
  });

  it('should remove one user', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    const user = await controller.create(input);

    expect(controller).toBeDefined();
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.username).toBe('unit-test');

    controller.remove(user.id);
    const users = controller.findAll();

    expect(users).toBeDefined();
    expect(users.length).toBe(0);
  });
});
