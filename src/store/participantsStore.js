import { atom, selector } from 'recoil';
import ParticipantsService from 'services/participantsService';
import { Participant, PaginationData } from 'models';

const service = new ParticipantsService();

export const participantsFiltersState = atom({
  key: 'participantsFiltersState',
  default: { page: 0, pageSize: 10, keyword: '', role: 'all', subRole: '' }
})

export const participantsState = selector({
  key: 'participantsState',
  get: async ({ get }) => {
    try {
      const filters = get(participantsFiltersState);
      const { data } = await service.getParticipantsList(filters);
      return {
        participants: data[1].map(item => new Participant(item)),
        pagination: new PaginationData(data[0])
      }
    } catch (e) {
      throw e
    }
  }
})

