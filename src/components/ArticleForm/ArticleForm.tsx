import { useState, useEffect } from 'react';
import { useFieldArray, useForm, SubmitHandler } from 'react-hook-form';
import { useCreateAnArticleMutation, useUpdateAnArticleMutation } from '../../stores/api/blogApi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../stores/hooks';

import Input from '../UI/Input/Input';

import Alert from 'antd/es/alert/Alert';

import { handleEnterPress } from '../../utility/handleEnterPress';
import { showInputErrors } from '../../utility/showInputErrors';

import { IArticleBody } from '../../types/types';

import style from './ArticleForm.module.scss';

interface IArticleFormProps {
  data?: {
    author: { username: string };
    title: string;
    description: string;
    tagList: string[];
    articleText: string;
    slug: string;
  };
  isEditing?: boolean;
}

interface ITags {
  value: string;
}

interface IFormInput {
  title: string;
  description: string;
  text: string;
  tags: ITags[];
}

const ArticleForm = ({ data, isEditing }: IArticleFormProps) => {
  const { user } = useAppSelector(state => state.user)
  const [addTagInputValue, setAddTagInputValue] = useState<string>('');
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const [createAnArticle, { isSuccess }] = useCreateAnArticleMutation();
  const [editAnArticle, { isSuccess: isSuccessEdit }] = useUpdateAnArticleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IFormInput>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      title: data?.title,
      description: data?.description,
      text: data?.articleText,
      tags: data?.tagList.map((item) => ({ value: item })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  useEffect(() => {
    if (isSuccessEdit) {
      setShowSuccessAlert(true);
    }

    const timeoutId = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, [isSuccessEdit]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  const onSubmit: SubmitHandler<IFormInput> = async (article: IFormInput) => {
    const { title, text, description, tags } = article;

    const requestBody: IArticleBody = {
      article: {
        title,
        description,
        body: text,
        tagList: tags.map((tag) => tag.value),
      },
    };

    if (isEditing) {
      await editAnArticle({
        body: requestBody,
        token: user?.user.token || null,
        slug: data?.slug || '',
      });
    } else {
      await createAnArticle({
        body: requestBody,
        token: user?.user.token || null,
      });
      reset();
    }
  };

  return (
    <>
      <form className={style.form} onKeyDown={handleEnterPress}>
        <span className={style.title}>{!isEditing ? 'Create new article' : 'Edit article'}</span>
        <label className={style.label}>
          <span className={style.input_title}>Title</span>
          <Input
            inputType="text"
            inputPlaceholder="Title"
            inputName="title"
            register={register}
            validateParams={{
              required: 'Field is required',
            }}
            errors={errors.title}
          />
          {showInputErrors(errors.title?.types)}
        </label>
        <label className={style.label}>
          <span className={style.input_title}>Short description</span>
          <Input
            inputType="text"
            inputPlaceholder="Short description"
            inputName="description"
            register={register}
            validateParams={{
              required: 'Field is required',
            }}
            errors={errors.description}
          />
          {showInputErrors(errors.description?.types)}
        </label>
        <label className={style.label}>
          <span className={style.input_title}>Text</span>
          <textarea
            placeholder="Text"
            className={!errors.text ? style.textarea : [style.textarea, style.input_error].join(' ')}
            {...register('text', { required: 'Field is required' })}
          />
          {showInputErrors(errors.text?.types)}
        </label>
        <label className={style.label}>
          <span className={style.input_title}>Tags</span>
          <div className={style.tags_block}>
            <ul className={style.tags_list}>
              {fields.map((field, index) => {
                return (
                  <div className={style.add_tag_block} key={index}>
                    <Input
                      inputType="text"
                      inputPlaceholder="Tag"
                      register={register}
                      inputName={`tags.${index}.value`}
                    />
                    <button
                      className={style.delete_tag_btn}
                      onClick={(e) => {
                        e.preventDefault();
                        remove(index);
                        setAddTagInputValue('');
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </ul>
            <div className={style.add_tag_block}>
              <Input
                inputType="text"
                inputName="addTag"
                inputPlaceholder="Tag"
                value={addTagInputValue}
                onChange={(value) => setAddTagInputValue(value)}
              />
              <button
                className={style.add_tag_btn}
                onClick={(e) => {
                  e.preventDefault();
                  append({ value: addTagInputValue });
                  setAddTagInputValue('');
                }}
              >
                Add tag
              </button>
            </div>
          </div>
        </label>
        <button onClick={handleSubmit(onSubmit)} className={style.send_btn}>
          Send
        </button>
      </form>
      {showSuccessAlert ? (
        <Alert type="success" message={'Article successfully edited'} className={style.success_alert} />
      ) : null}
    </>
  );
};

export default ArticleForm;
