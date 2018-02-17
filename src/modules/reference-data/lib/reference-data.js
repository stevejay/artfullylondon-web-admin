import _ from 'lodash'

export function mapReferenceData (contentJson) {
  const { heroImage, namedClosures } = contentJson

  return {
    heroImage: {
      desktopUrl: createHeroImageUrl(heroImage.name, false),
      mobileUrl: createHeroImageUrl(heroImage.name, true),
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

function createHeroImageUrl (name, forMobile) {
  return (
    process.env.WEBSITE_SITE_IMAGES_ROOT_URL +
    `/hero-image/${name}${forMobile ? '.mobile' : ''}.jpg`
  )
}
