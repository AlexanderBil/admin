import axios from 'axios';
import cleanObject from 'utils/cleanObject';

export default class ContentService {
  getContentData(locale, data) {
    return axios.post(`marketplace/content/${locale}/admin_search/page`, data);
  }

  getTopAccount(data) {
    return axios.post('marketplace/account/top/20/active', data);
  }

  getDetailsData(id) {
    return axios.get(`marketplace/content/${id}/admin_details`);
  }

  getAllUsersList({ page, pageSize, keyword, role, subRole: subRoleId }) {
    return axios.get(`marketplace/account/${role}/profile/list`, {
      params: cleanObject({ page, pageSize, keyword, subRoleId }),
    });
  }

  getAllService = async () => {
    const result = await axios.get('marketplace/token/service');
    return result;
  };

  getLocales() {
    return axios.get('marketplace/locale/list')
  }
}

export const activateContent = async (id) => {
  const result = await axios.post(`marketplace/content/${id}/admin_activate`);
  return result;
};

export const deleteContent = async (id) => {
  const result = await axios.delete(`marketplace/content/${id}/admin_remove`);
  return result;
}

export const findAccountContent = async (filters) => {
  const result = await axios.get(
    `marketplace/account/all/profile/list?keyword=${filters.keyword}`,
    {
      params: {
        pageSize: 30,
      },
    }
  );
  return result;
};

export const singleBulkActivation = async (contentId) => {
  const result = await axios.post(
    `marketplace/content/${contentId}/admin_activate`
  );
  return result;
};

export const groupBulkActivation = async (contentId) => {
  const result = await axios.put(
    'marketplace/content/admin_activate_group', {
      contentIdSet: contentId
    }
  );
  return result;
};