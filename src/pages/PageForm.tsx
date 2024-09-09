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
            setForm(data)
        })
    }
    
}, [formId])

  return (
    <div>PageForm</div>
  )
}

export default PageForm


