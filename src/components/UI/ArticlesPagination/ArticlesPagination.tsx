import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { setCurrentPage } from '../../../stores/slices/articlesSlice';

import { Pagination, ConfigProvider } from 'antd';

interface IArticlesPaginationProps {
  totalResults: number;
}

const ArticlesPagination = ({ totalResults }: IArticlesPaginationProps) => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.articlesList);

  const changeCurrentPage = (currentPage: number): void => {
    dispatch(setCurrentPage(currentPage));
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            lineWidth: 0,
            colorPrimary: '#FFF',
            colorPrimaryHover: '#FFF',
          },
        },
      }}
    >
      <Pagination
        defaultCurrent={1}
        total={totalResults}
        pageSize={5}
        showSizeChanger={false}
        current={currentPage}
        onChange={changeCurrentPage}
        hideOnSinglePage={true}
      />
    </ConfigProvider>
  );
};

export default ArticlesPagination;
