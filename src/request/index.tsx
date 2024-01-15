import { notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

window.baseUrl = 'http://localhost:4000';

window.fetchJson = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = window.baseUrl + input;
  const option = {
    method: 'GET',
    ...init,
  };

  const response = await window.fetch(url, option).then((res) => res.json());

  if (response.code !== undefined && response.code !== 200) {
    notification.config({ maxCount: 1 });
    notification.error({
      message: '系统提示',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      description: response.message,
      placement: 'bottomRight',
    });
    return Promise.reject(response);
  }
  return Promise.resolve(response);
};
