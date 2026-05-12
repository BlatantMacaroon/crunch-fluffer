import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as crunchService from '../../src/services/crunchService.js';
import * as crunchRepo from '../../src/repos/crunchRepo.js';
import { CrunchDocument } from '../../src/models/crunchModel.js';

// 1. Tell Vitest to "fake" the repository
vi.mock('../../src/repos/crunchRepo.js');

describe('Crunch service unit tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call the repo with the correct data', async () => {
        const mockDto: any = { strength: 10, class: 'BARD' };

        vi.mocked(crunchRepo.create).mockResolvedValue(mockDto as CrunchDocument);

        const result = await crunchService.create(mockDto);

        expect(crunchRepo.create).toHaveBeenCalledWith(mockDto);
        expect(result.class).toBe('BARD');
    });
});