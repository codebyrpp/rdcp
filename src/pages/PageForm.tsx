import FormView, { FormFieldValuesType, FormValueType } from '@/components/builder/components/FormView';
import Brand from '@/components/common/Brand';
import { useGetFormQuery, useViewFormQuery } from '@/state/apiSlices/formsApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import useSubmitForm from '@/hooks/useSubmitForm';
import Loading from '@/components/common/Loading';
import { Form } from '@/models/forms';
import { PageError } from './PageError';

const PageForm = () => {

  const { formId } = useParams<{ formId: string }>()

  // RTK Query hook to get the form settings
  const { data: form, isLoading: isDataLoading, isSuccess, isError, error: viewError } = useViewFormQuery({
    formId: formId ?? '',
  }, {
    skip: !formId
  });

  const { submitForm, loading, error, success } = useSubmitForm();
  const [showForm, setShowForm] = useState<boolean>(true);

  const sendFormDataCallback = async (formId: string, values: FormFieldValuesType): Promise<void> => {
    // Make the POST request
    try {
      const res = await submitForm(formId, values);
      if (res.success) {
        setShowForm(false);
      }
      // Handle success, such as showing a message or redirecting
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  if (success && !showForm)
    return <PageSubmissionSuccess form={form! as Form} showForm={() => {
      setShowForm(true);
    }} />

  if (isDataLoading) return <Loading />

  if (!isSuccess)
    return <PageError />

  return (
    <div className='overflow-y-hidden overflow-x-hidden min-h-screen flex flex-col justify-between gap-2'>
      {
        showForm && form && <FormView form={form!} submitFormHandler={sendFormDataCallback} />
      }
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className='w-full border-t border-gray-300'>
      <div className='container mx-auto py-0 md:py-4'>
        <div className="transform scale-50">
          <Brand />
        </div>
      </div>
    </div>
  )
}

const PageSubmissionSuccess = ({ form, showForm }: { form: Form, showForm: () => void }) => {
  // Show a success message
  return (
    <div className="flex-1 max-h-full h-full flex-grow w-screen flex justify-center">
      <div className="flex flex-col gap-2 w-1/2
            bg-slate-200 rounded-md  pt-5 
            h-full">
        <div className="bg-white w-full p-4 rounded-md border-t-[6px] border-t-slate-500">
          <p className="text-xl font-bold">{form.name}</p>
          <div className="flex flex-col items-start justify-start mt-3">
            <p className='text-sm'>You response has been recorded!</p>
            {/* if form accepts multiple responses add link here */}
            {
              form.multipleResponses && <button
                onClick={() => showForm()}>
                <span className='text-blue-500 underline text-sm'>Submit another response</span>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageForm


