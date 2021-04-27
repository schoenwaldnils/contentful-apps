import { FieldExtensionSDK } from '@contentful/app-sdk'
import {
  FieldGroup,
  Grid,
  Note,
  Option,
  SelectField,
} from '@contentful/forma-36-react-components'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'

import { AspectRatio } from '../../components/AspectRatio'
import { withSdk } from '../../utils/withSdk'

const ASPECT_RATIOS = ['9:16', '1:1', '16:9']

const ImageApp: FC<AppProps> = ({ sdk }) => {
  const [focus, setFocus] = useState<string>(
    sdk.entry.fields.focus.getValue() ?? '',
  )
  const [fit, setFit] = useState<string>(sdk.entry.fields.fit.getValue() ?? '')
  const [imageSrc, setImgSrc] = useState('')

  const saveFocus = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
      void sdk.entry.fields.focus.setValue(value)
      setFocus(value)
    },
    [sdk],
  )

  const saveFit = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
      void sdk.entry.fields.fit.setValue(value)
      setFit(value)
    },
    [sdk],
  )

  useEffect(() => {
    const subscribe = () => {
      // Enable auto-resizer
      sdk.window.startAutoResizer()

      // Handlers for external field value changes (e.g. when multiple authors are working on the same entry).
      const detachExternalFit = sdk.entry.fields.fit.onValueChanged((value) => {
        setFit(value)
      })
      const detachExternalFocus = sdk.entry.fields.focus.onValueChanged(
        (value) => {
          setFocus(value)
        },
      )
      const detachImageChangeHandler = sdk.entry.fields.image.onValueChanged(
        (value) => {
          if (value) {
            void sdk.space.getAsset<AssetEntry>(value.sys.id).then((asset) => {
              // For multiple locales, this should have a switch
              setImgSrc(asset.fields.file[sdk.locales.default].url)
            })
          } else {
            setImgSrc('')
          }
        },
      )

      // Return unsubscribe
      return () => {
        // Disable auto-resizer
        sdk.window.stopAutoResizer()

        // Detach external changes
        detachExternalFit()
        detachExternalFocus()
        detachImageChangeHandler()
      }
    }

    // Subscribe and return the unsubscribe handler
    return subscribe()
  }, [sdk])

  useEffect(() => {
    const entryLink = sdk.entry.fields.image.getValue()
    if (entryLink) {
      void sdk.space.getAsset<AssetEntry>(entryLink.sys.id).then((asset) => {
        setImgSrc(asset.fields.file[sdk.locales.default].url)
      })
    }
  }, [sdk])

  return (
    <div>
      {imageSrc ? (
        <>
          <FieldGroup>
            <Grid columns={2} rows={1} columnGap="spacingXs" rowGap="spacingXs">
              <SelectField
                id="focus"
                name="focus"
                labelText="Focus"
                value={focus}
                onChange={saveFocus}
              >
                <Option value="">None</Option>
                <Option value="face">Face</Option>
                <Option value="faces">Faces</Option>
                <Option value="center">Center</Option>
                <Option value="top">Top</Option>
                <Option value="top_right">Top Right</Option>
                <Option value="right">Right</Option>
                <Option value="bottom_right">Bottom Right</Option>
                <Option value="bottom">Bottom</Option>
                <Option value="bottom_left">Bottom Left</Option>
                <Option value="left">Left</Option>
                <Option value="top_left">Top Left</Option>
              </SelectField>
              <SelectField
                id="fit"
                name="fit"
                labelText="Fit"
                value={fit}
                onChange={saveFit}
              >
                <Option value="">None</Option>
                <Option value="scale">Scale</Option>
                <Option value="pad">Pad</Option>
                <Option value="fill">Fill</Option>
                <Option value="crop">Crop</Option>
                <Option value="thumb">Thumb</Option>
              </SelectField>
            </Grid>
          </FieldGroup>
          {Boolean(focus) && !fit ? (
            <Note noteType="warning">Please select a fit value</Note>
          ) : (
            <Grid
              columns={ASPECT_RATIOS.length}
              columnGap="spacingXs"
              rowGap="spacingXs"
            >
              {ASPECT_RATIOS.map((aspectRatio) => {
                return (
                  <AspectRatio
                    key={aspectRatio}
                    focus={focus}
                    fit={fit}
                    aspectRatio={aspectRatio}
                    src={imageSrc}
                  />
                )
              })}
            </Grid>
          )}
        </>
      ) : (
        <Note noteType="primary">Please select an image</Note>
      )}
    </div>
  )
}

export default withSdk<FieldExtensionSDK>(ImageApp)
