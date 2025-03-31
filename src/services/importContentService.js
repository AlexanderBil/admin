import axios from 'axios';

export const getLocales  = async () => {
  const result = await axios.get('marketplace/locale/list')
  return result;
};

export const findAccountImportContent = async (filters) => {
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

export const getExternalSourceList  = async () => {
  const result = await axios.get('marketplace/externalSource/import/list');
  return result;
};

export const batchImport  = async (data) => {
  const result = await axios.post('marketplace/content/batchImport', data);
  return result;
};

export const getImportContentData  = async (data) => {
  const result = await axios.post('marketplace/content/batchUpload/list/page', data);
  return result;
};

export const getImportContentDetails = async(code) => {
  const result = await axios.get(`marketplace/content/batchUpload/status/${code}`)
  return result
}

export const getStatusDetails  = async (data) => {
  const result = await axios.post('marketplace/content/batchUpload/details/page', data);
  return result;
};

