import { describe, it, expect, beforeEach } from 'vitest';

import { BaseRepository } from '../repositories/baseRepository';
import { ErrorCode } from '../utils/errorCodes';
import { CustomError } from '../utils/customError';

describe('BaseRepository', () => {
  let baseRepository: BaseRepository;

  beforeEach(() => {
    baseRepository = new BaseRepository();
  });

  describe('getMessage', () => {
    it('should return the default message', async () => {
      const message = await baseRepository.getMessage();
      expect(message).toBe('Hello World!');
    });
  });

  describe('setMessage', () => {
    it('should set the message', async () => {
      const messageExpexted = 'New Message';
      await baseRepository.setMessage(messageExpexted);
      const message = await baseRepository.getMessage();
      expect(message).toBe(messageExpexted);
    });
  });
});