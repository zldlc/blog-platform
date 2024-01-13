import { Spin, Flex } from 'antd';

import './Spinner.scss';

const Spinner = () => {
  return (
    <Flex justify="center" align="center" className="main__spinner-wrapper">
      <Spin size="large" className="main__spin spin" />
    </Flex>
  );
};

export default Spinner;
