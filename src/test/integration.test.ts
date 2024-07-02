import request from "supertest";
import { describe, it, expect, vi, beforeEach } from 'vitest';

import app from '../index';
import { ErrorCode } from '../utils/errorCodes';

describe('Base exemple integration test API', () => {
  const testErrorCases = [
    { message: null, ErrorCode: ErrorCode.REQUIRED, httpStatus: 400 },
    { message: '', ErrorCode: ErrorCode.EMPTY, httpStatus: 400 },
    { message: 'a'.repeat(256), ErrorCode: ErrorCode.MAX_LENGTH, httpStatus: 400 },
  ]

  describe('GET /api/v1/base-example', () => {
    it('should return a message', async () => {
      const messageExpected = 'Hello World!';

      const response = await request(app).get('/api/v1/base-example');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: messageExpected });
    });
  });

  describe('POST /api/v1/base-example', () => {
    it('should set a message', async () => {
      const message = 'New message';

      const response = await request(app)
        .post('/api/v1/base-example')
        .send({ message });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message });
    });

    testErrorCases.forEach(({ message, ErrorCode, httpStatus }) => {
      it(`should return ${ErrorCode} error when message is ${message}`, async () => {
        const response = await request(app)
          .post('/api/v1/base-example')
          .send({ message });

        expect(response.status).toBe(httpStatus);
        expect(response.body[0]['code']).toEqual(ErrorCode);
      });
    });
  });
});