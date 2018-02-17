import PropTypes from 'prop-types'

export const POINT_SHAPE = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
})

const LONDON_LAT_RANGE = 0.3

export const LONDON_LAT = 51.507398
export const MIN_LONDON_LAT = LONDON_LAT - LONDON_LAT_RANGE
export const MAX_LONDON_LAT = LONDON_LAT + LONDON_LAT_RANGE

const LONDON_LNG_RANGE = 0.6

export const LONDON_LNG = -0.127675
export const MIN_LONDON_LNG = LONDON_LNG - LONDON_LNG_RANGE
export const MAX_LONDON_LNG = LONDON_LNG + LONDON_LNG_RANGE

// TODO deep freeze this?
export const DEFAULT_MAP_CENTER = {
  lat: LONDON_LAT,
  lng: LONDON_LNG
}

export const USER_LOCATION_IMAGE_URL =
  process.env.WEBSITE_SITE_IMAGES_ROOT_URL + '/female.png'

export const GOOGLE_MAP_STYLES = [
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#d0d2d2'
      }
    ]
  },
  {
    featureType: 'road',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        color: '#efefef'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        color: '#f6f1ec'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit.line',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#585a5b'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#eff0ef'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#efefef'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#d0e2c9'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f9f9f9'
      }
    ]
  },
  {
    featureType: 'transit.station.bus',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#a5c8ea'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e0e2e0'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#afafaf'
      }
    ]
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.government',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {}
]

export const GOOGLE_MAP_OPTIONS = {
  mapTypeControl: false,
  streetViewControl: false,
  clickableIcons: false,
  styles: GOOGLE_MAP_STYLES,
  scrollwheel: false
}

export const GOOGLE_MAP_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.WEBSITE_GOOGLEMAPS_API_KEY}`
