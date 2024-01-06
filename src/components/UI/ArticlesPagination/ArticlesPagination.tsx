import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { setCurrentPage } from '../../../stores/slices/articlesSlice';

import { Pagination, ConfigProvider } from 'antd';

interface IArticlesPaginationProps {
  totalResults: number;
}

const ArticlesPagination: FC<IArticlesPaginationProps> = ({ totalResults }) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.articlesList.currentPage);

  const changeCurrentPage = (currentPage: number) => {
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
