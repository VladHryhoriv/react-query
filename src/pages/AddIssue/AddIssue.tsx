import { FC } from 'react';
import { Input } from 'components/Input';
import { Textarea } from 'components/Textarea';
import { Form, Formik } from 'formik';
import { useAddIssue } from 'hooks/UseAddIssue/useAddIssue';
import * as Yup from 'yup';

const initialValues = {
  title: '',
  comment: ''
};

const validationSchema = Yup.object({
  title: Yup.string().required('Field is required'),
  comment: Yup.string().required('Field is required')
});

export const AddIssue: FC = () => {
  const mutator = useAddIssue();

  function onSubmit(values: typeof initialValues) {
    mutator.mutate(values);
  }

  return (
    <div className='add-issue'>
      <h2>Add issue</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <label htmlFor='title'>Title</label>
          <Input type='text' id='title' placeholder='Title' name='title' />
          <label htmlFor='comment'>Comment</label>
          <Textarea name='comment' id='comment' placeholder='Comment' />
          <button type='submit'>
            {mutator.isLoading ? 'Adding ...' : 'Add issue'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
