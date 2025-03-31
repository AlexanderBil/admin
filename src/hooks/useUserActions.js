import UserService from 'services/userService';
import parseErrorMessage from 'utils/parseErrorMessage';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userDataState } from 'store/userStore';
import User from 'models/User';


const useUserActions = () => {
  const service = new UserService();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userDataState);

  const login = async ({ username, password }) => {
    try {
      if (user.id) {
        await service.logout();
        setUser(new User())
      }
      await service.login({ username, password })
      await checkAuth();
    } catch (e) {
      enqueueSnackbar(parseErrorMessage(e) || 'Error', { variant: 'error' })
      return Promise.reject()
    }
  }
  const logout = async () => {
    try {
      await service.logout();
      setUser(new User())
      navigate('/login', { replace: true });
    } catch (e) {
      enqueueSnackbar(parseErrorMessage(e) || 'Error', { variant: 'error' })
      return Promise.reject()
    }
  }
  const checkAuth = async () => {
    try {
      const { data } = await service.getAccountData();
      await setUser(new User(data));
    } catch (e) {
      setUser(new User());
      return Promise.reject(e)
    }
  }

  return {
    login,
    logout,
    checkAuth
  }
}

export default useUserActions