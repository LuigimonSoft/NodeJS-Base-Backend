import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { BaseController } from '../controllers/baseController';
import { IBaseService } from '../services/interfaces/IBaseService';
import { CustomError } from '../utils/customError';

describe('baseController', () => {
  let controller: BaseController;
  let mockService: IBaseService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockService = {
      getMessage: vi.fn(),
      setMessage: vi.fn(),
    };
    controller = new BaseController(mockService);

    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    nextFunction = vi.fn();
  });

  describe('getMessage', () => {
    it('should return the message from the service', async () => {
      const expectedMessage = 'Test message';
      vi.mocked(mockService.getMessage).mockResolvedValue(expectedMessage);

      await controller.getMessage(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockService.getMessage).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: expectedMessage });
    });

    it('should call next with CustomError when service throws an error', async () => {
      const error = new Error('Service error');
      vi.mocked(mockService.getMessage).mockRejectedValue(error);

      await controller.getMessage(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.any(CustomError));
    });
  });

  describe('setMessage', () => {
    it('should call service setMessage and return the message', async () => {
      const message = 'New message';
      mockRequest.body = { message };

      await controller.setMessage(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockService.setMessage).toHaveBeenCalledWith(message);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message });
    });

    it('should call next with CustomError when service throws an error', async () => {
      const error = new Error('Service error');
      mockRequest.body = { message: 'Test' };
      vi.mocked(mockService.setMessage).mockRejectedValue(error);

      await controller.setMessage(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.any(CustomError));
    });
  });

});