import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProcessingService } from '../../src/services/processingService';

describe('ProcessingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('processData', () => {
    it('should process data successfully', async () => {
      const testData = { name: 'test', value: 123 };
      const testOptions = { format: 'json' };

      const result = await ProcessingService.processData(testData, testOptions);

      expect(result).toHaveProperty('processed', true);
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('originalData', testData);
      expect(result).toHaveProperty('options', testOptions);
      expect(new Date(result.timestamp)).toBeInstanceOf(Date);
    });

    it('should process data with default options', async () => {
      const testData = { name: 'test' };

      const result = await ProcessingService.processData(testData);

      expect(result).toHaveProperty('processed', true);
      expect(result).toHaveProperty('originalData', testData);
      expect(result).toHaveProperty('options', {});
    });

    it('should handle null data', async () => {
      const result = await ProcessingService.processData(null);

      expect(result).toHaveProperty('processed', true);
      expect(result).toHaveProperty('originalData', null);
    });

    it('should simulate async behavior', async () => {
      const startTime = Date.now();
      await ProcessingService.processData({ test: 'data' });
      const endTime = Date.now();

      // Should take at least 100ms due to setTimeout in the implementation
      expect(endTime - startTime).toBeGreaterThanOrEqual(100);
    });
  });

  describe('getProcessingStatus', () => {
    it('should return status for given id', async () => {
      const testId = 'test-id-123';

      const result = await ProcessingService.getProcessingStatus(testId);

      expect(result).toHaveProperty('id', testId);
      expect(result).toHaveProperty('status', 'completed');
      expect(result).toHaveProperty('progress', 100);
      expect(result).toHaveProperty('completedAt');
      expect(new Date(result.completedAt)).toBeInstanceOf(Date);
    });

    it('should handle different id formats', async () => {
      const testIds = ['123', 'abc-def-ghi', 'proc_12345', ''];

      for (const id of testIds) {
        const result = await ProcessingService.getProcessingStatus(id);
        expect(result.id).toBe(id);
        expect(result.status).toBe('completed');
      }
    });
  });
});
