import { useEffect, useState } from 'react';
import ParticipantsService from 'services/participantsService';

const service = new ParticipantsService();

export const useGetBalance = (id, isCheked, isRefresh) => {
  const [balance, setBalance] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isCheked) return;
    const getBalance = async () => {
      const response = await service.getBalance({ id });
      if(response.data.assetBalances?.length) {
        setBalance(response.data);
      } else {
        setError('No Balance')
      }     
    };

    getBalance();
  }, [id, isCheked, isRefresh]);

  return {
    balance,
    error
  }
};
