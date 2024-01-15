import { ConfigProvider, Input, InputProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function FilterMusic(props: InputProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: '#d9d9d9',
            hoverBorderColor: '#d9d9d9',
          },
        },
      }}
    >
      <Input
        placeholder="搜索歌单音乐"
        style={{ borderRadius: 12, boxShadow: 'none', fontSize: 12, backgroundColor: '#F7F7F7' }}
        prefix={<SearchOutlined style={{ color: '#3D3D3D' }} />}
        bordered={false}
        allowClear
        {...props}
      />
    </ConfigProvider>
  );
}
