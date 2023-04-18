import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    const user = await service.create(input);

    expect(service).toBeDefined();
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.username).toBe('unit-test');
  });

  it('should not create an user without the username', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: null,
      password: '123',
      email: 'test@email.com',
    };

    expect(service.create(input)).rejects.toEqual(
      new BadRequestException('Username is required'),
    );
  });

  it('should not create an user without the password', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: null,
      email: 'test@email.com',
    };

    expect(service.create(input)).rejects.toEqual(
      new BadRequestException('Password is required'),
    );
  });

  it('should not create an user without the email', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: null,
    };

    expect(service.create(input)).rejects.toEqual(
      new BadRequestException('Email is required'),
    );
  });

  it('should not create an user without the first name', async () => {
    const input = {
      firstName: null,
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    expect(service.create(input)).rejects.toEqual(
      new BadRequestException('First name is required'),
    );
  });

  it('should not create an user without the last name', async () => {
    const input = {
      firstName: 'Unit',
      lastName: null,
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    expect(service.create(input)).rejects.toEqual(
      new BadRequestException('Last name is required'),
    );
  });

  it('should find all users', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    const user = await service.create(input);

    expect(service).toBeDefined();
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.username).toBe('unit-test');

    const users = service.findAll();

    expect(users).toBeDefined();
    expect(users.length).toBe(1);
    expect(users[0].username).toBe('unit-test');
  });

  it('should fail to find one user', async () => {
    try {
      service.findOne('123');
    } catch (e) {
      expect(e.message).toBe('User not found.');
    }
  });

  it('should find one user', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    const user = await service.create(input);

    expect(service).toBeDefined();
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.username).toBe('unit-test');

    const foundUser = service.findOne(user.id);

    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(user.id);
  });

  it('should fail to update one user', async () => {
    try {
      service.update('123', { firstName: 'New name' });
    } catch (e) {
      expect(e.message).toBe('User not found.');
    }
  });

  it('should update one user', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    const user = await service.create(input);
    await service.create(input);

    expect(service).toBeDefined();
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.username).toBe('unit-test');

    let updatedUser = service.update(user.id, { firstName: 'New name' });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.firstName).toBe('New name');

    updatedUser = service.update(user.id, { lastName: 'New last name' });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.lastName).toBe('New last name');
  });

  it('should fail to remove one user', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    await service.create(input);

    try {
      service.remove('123');
    } catch (e) {
      expect(e.message).toBe('User not found.');
    }
  });

  it('should remove one user', async () => {
    const input = {
      firstName: 'Unit',
      lastName: 'Test',
      username: 'unit-test',
      password: '123',
      email: 'test@email.com',
    };

    const user = await service.create(input);

    expect(service).toBeDefined();
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.username).toBe('unit-test');

    service.remove(user.id);
    const users = service.findAll();

    expect(users).toBeDefined();
    expect(users.length).toBe(0);
  });
});
