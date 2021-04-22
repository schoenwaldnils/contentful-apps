import { FieldExtensionSDK } from '@contentful/app-sdk'
import { Spinner, TextField } from '@contentful/forma-36-react-components'
import styled from '@emotion/styled'
import { ApiTemplate } from 'atomicassets/build/API/Explorer/Types'
import { NextPage } from 'next'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { NftImage, NftImageContainer } from '../../components/NftImage'
import { assetsApi } from '../../utils/api/assetsApi'
import { withSdk } from '../../utils/withSdk'

const NftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${NftImageContainer} {
    max-width: 320px;
  }
`

// Ensure the correct sdk type definition
export interface AppProps {
  sdk: FieldExtensionSDK
}

const SwitchApp: NextPage<AppProps> = ({ sdk }) => {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading')
  const [fieldValue, setFieldValue] = useState<string>(sdk.field.getValue())
  const [template, setTemplate] = useState<ApiTemplate>()

  const loadTemplate = useCallback(async (fieldValue) => {
    setState('loading')
    const [collection, templateId] = (fieldValue && fieldValue.split('/')) || []
    if (collection && templateId) {
      const res = await assetsApi
        .getTemplate(collection, templateId)
        .catch((err) => {
          console.error(err)
        })

      if (res && res.collection.collection_name === collection) {
        setTemplate(res)
        setState('success')
      }
    } else {
      setTemplate(null)
    }
  }, [])

  useEffect(() => {
    loadTemplate(fieldValue)
  }, [fieldValue, loadTemplate])

  useEffect(() => {
    const subscribe = () => {
      // Handler(s) for external field value changes.
      // (e.g. when multiple authors are working on the same entry)
      // If you are changing multiple/sibling fields you should add handlers for them here.
      const detachExternalChange = sdk.field.onValueChanged((value) => {
        setFieldValue(value)
      })

      // Return unsubscribe
      return () => {
        // Detach external changes
        // If you are changing multiple/sibling fields you should detach them here.
        detachExternalChange()
      }
    }

    // Subscribe and return the unsubscribe handler(s)
    return subscribe()
  }, [sdk])

  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      // Save the local state of the field value
      setFieldValue(value)
      // Save the state of the field value on contentful
      // This will update the local (unpublished) change on contenful
      void sdk.field.setValue(value)
    },
    [sdk.field],
  )

  return (
    <NftContainer>
      <TextField
        name="templateId"
        id="templateId"
        labelText=""
        value={fieldValue}
        onChange={handleChange}
      />
      {(state === 'loading' || !template) && <Spinner />}

      {state === 'success' && (
        <NftImage
          {...{
            img: template.immutable_data.img,
            imgBack: template.immutable_data.backimg,
          }}
        />
      )}
    </NftContainer>
  )
}

// Decorate the app with the contenful sdk and define the type of sdk here.
export default withSdk<FieldExtensionSDK>(SwitchApp)
