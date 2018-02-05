import _ from 'lodash'

import * as imageLib from '_src/lib/image'

export function mapServerConstantsData (contentJson) {
  const { heroImage, namedClosures } = contentJson

  return {
    heroImage: {
      desktopUrl: imageLib.createHeroImageUrl(heroImage.name, false),
      mobileUrl: imageLib.createHeroImageUrl(heroImage.name, true),
      dominantColor: heroImage.dominantColor
    },
    namedClosuresDropdownOptions: Object.keys(namedClosures).map(key => ({
      value: key,
      label: namedClosures[key].label
    })),
    namedClosuresLookup: _.assignWith(
      {},
      namedClosures,
      (_objValue_, srcValue) => srcValue.dates
    )
  }
}
