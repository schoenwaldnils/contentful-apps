import { FieldExtensionSDK } from '@contentful/app-sdk'
import styled from '@emotion/styled'
import { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'

import { withSdk } from '../../utils/withSdk'

const ColorContainer = styled.div`
  padding: 1rem 0.75rem 1.5rem;
`

// Ensure the correct sdk type definition
export interface AppProps {
  sdk: FieldExtensionSDK
}

const SwitchApp: NextPage<AppProps> = ({ sdk }) => {
  const [color, setColor] = useState<string>(sdk.field.getValue() || '#000')

  useEffect(() => {
    const subscribe = () => {
      // Handler(s) for external field value changes.
      // (e.g. when multiple authors are working on the same entry)
      // If you are changing multiple/sibling fields you should add handlers for them here.
      const detachExternalChange = sdk.field.onValueChanged((value) => {
        setColor(value)
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

  const handleChange = useCallback((color) => {
    // Save the local state of the field value
    setColor(color.hex)
    // Save the state of the field value on contentful
    // This will update the local (unpublished) change on contenful
    void sdk.field.setValue(color.hex)
  }, [])

  return (
    <ColorContainer>
      <SketchPicker
        color={color}
        onChangeComplete={handleChange}
        presetColors={[]}
        disableAlpha
      />
    </ColorContainer>
  )
}

// Decorate the app with the contenful sdk and define the type of sdk here.
export default withSdk<FieldExtensionSDK>(SwitchApp)
