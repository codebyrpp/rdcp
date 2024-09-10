import FormView from '@/components/builder/components/FormView';
import { useGetFormMutation } from '@/state/formMockApi';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const PageForm = () => {

  const formId = useParams<{ formId: string }>().formId
  const { getForm } = useGetFormMutation();

  const [form, setForm] = React.useState<any>();

  useEffect(() => {
    if(formId){
        getForm(formId).then((data: any) => {
            console.log('data', data)
            setForm(data)
        })
    }
    
}, [formId])

  return (
    <FormView form={form} />
  )
}

export default PageForm


