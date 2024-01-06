import React, { FC } from 'react';

import { Tag, ConfigProvider } from 'antd';

import style from './TagList.module.scss';

interface ITagListProps {
  tags: string[];
}

const TagList: FC<ITagListProps> = ({ tags }) => {
  function createTag(tag: string, index: number) {
    if (!tag || !tag.trim() || /\u3164/.test(tag)) {
      return null;
    }

    return (
      <li key={index}>
        <Tag className={style.tag}>{tag}</Tag>
      </li>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            marginXS: 0,
            defaultBg: 'rgba(0, 0, 0, 0)',
            defaultColor: '#404040',
            colorBorder: '#404040',
            fontSize: 12,
            borderRadiusSM: 2,
          },
        },
      }}
    >
      <ul className={style.tag_list}>{tags ? tags.map((tag, index) => createTag(tag, index)) : null}</ul>
    </ConfigProvider>
  );
};

export default TagList;
