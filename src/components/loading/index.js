import { Spin } from 'antd';

export default function Loading ({ wrapperStyle, ...rest }) {
  return (
    <div
      style={{
        minHeight: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...wrapperStyle
      }}
    >
      <Spin {...rest} />
    </div>
  );
}
