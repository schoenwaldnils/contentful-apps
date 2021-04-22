import { KnownSDK } from '@contentful/app-sdk'
import { Spinner } from '@contentful/forma-36-react-components'
import { ComponentType, ReactNode, useEffect } from 'react'

import { useSdk } from '../hooks/useSdk'

export interface WithSDKProps<S extends KnownSDK> {
  sdk: S
}

export const withSdk = <S extends KnownSDK, T = Record<string, unknown>>(
  Component: ComponentType<WithSDKProps<S> & T>,
  {
    autoResizer = true,
  }: {
    autoResizer?: boolean
  } = {},
): ((props: T) => ReactNode) => {
  const SdkWrapper = (props: T): ReactNode => {
    const sdk = useSdk()

    useEffect(() => {
      const subscribe = () => {
        // Enable autoResizer if available and requested
        if (sdk && 'window' in sdk && autoResizer) {
          sdk.window.startAutoResizer()

          return () => {
            sdk.window.stopAutoResizer()
          }
        }
      }

      return subscribe()
    }, [sdk])

    return sdk ? (
      <Component {...props} sdk={sdk as S} />
    ) : (
      <Spinner size="large" />
    )
  }

  return SdkWrapper
}
