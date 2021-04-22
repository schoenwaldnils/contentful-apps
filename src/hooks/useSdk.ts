import { KnownSDK } from '@contentful/app-sdk'
import React, { useEffect } from 'react'

// Add contentfulExtension to window
declare global {
  interface Window {
    contentfulExtension: {
      init: <T extends KnownSDK = KnownSDK>(
        initCallback: (sdk: T) => unknown,
        options?: {
          supressIframeWarning?: boolean
        },
      ) => void
    }
  }
}

/**
 * Since the Contentful sdk is attached to window we need to initialize it on the client to prevent
 * SSR issues when next.js builds the pages.
 * @see {@link https://github.com/contentful/extensions/issues/354}
 */
export const useSdk = (): KnownSDK => {
  const [knownSDK, setKnownSDK] = React.useState<null | KnownSDK>(null)
  useEffect(() => {
    window.contentfulExtension.init((sdk) => {
      setKnownSDK(sdk)
    })
  }, [])
  return knownSDK
}
