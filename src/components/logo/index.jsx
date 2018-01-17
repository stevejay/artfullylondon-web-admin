import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const LOGO_SIZE_SMALL = 'small'
const LOGO_SIZE_MEDIUM = 'medium'
const LOGO_SIZE_LARGE = 'large'
const LOGO_SIZE_XLARGE = 'xlarge'

const LOGO_SIZE_PARAMS = {
  [LOGO_SIZE_SMALL]: { width: '80px', height: '32px', verticalAlign: 'bottom' },
  [LOGO_SIZE_MEDIUM]: {
    width: '120px',
    height: '47px',
    verticalAlign: 'bottom'
  },
  [LOGO_SIZE_LARGE]: {
    width: '218px',
    height: '86px',
    verticalAlign: 'bottom'
  },
  [LOGO_SIZE_XLARGE]: {
    width: '500px',
    height: '198px',
    verticalAlign: 'bottom'
  }
}

const LOGO_TYPE_NORMAL = 'normal'
const LOGO_TYPE_INVERSE = 'inverse'

class Logo extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.size !== this.props.size
  }
  render () {
    const { size, type } = this.props

    // There was a problem when more than one instance of this class was rendered
    // at the same time: the gradient ids needed to be unique.

    const gradientPrefix = _.uniqueId('linearGradient_')
    const textFillColor = type === LOGO_TYPE_NORMAL ? '#FF632A' : '#FFF'

    return (
      <svg
        aria-label='Artfully London Logo'
        style={LOGO_SIZE_PARAMS[size]}
        viewBox='0 0 820 320'
        version='1.1'
      >
        <filter
          x='-50%'
          y='-50%'
          width='200%'
          height='200%'
          filterUnits='objectBoundingBox'
          id={gradientPrefix + '-filter'}
        >
          <feOffset
            dx='7'
            dy='7'
            in='SourceAlpha'
            result='shadowOffsetOuter1'
          />
          <feGaussianBlur
            stdDeviation='4.5'
            in='shadowOffsetOuter1'
            result='shadowBlurOuter1'
          />
          <feColorMatrix
            values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0'
            type='matrix'
            in='shadowBlurOuter1'
            result='shadowMatrixOuter1'
          />
          <feMerge>
            <feMergeNode in='shadowMatrixOuter1' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
        <defs>
          <linearGradient
            x1='0%'
            y1='39.8397281%'
            x2='20.0964096%'
            y2='100%'
            id={gradientPrefix + '-1'}
          >
            <stop stopColor='#F8E81C' offset='0%' />
            <stop stopColor='#FF632A' offset='100%' />
          </linearGradient>
          <linearGradient
            x1='50%'
            y1='0%'
            x2='50%'
            y2='100%'
            id={gradientPrefix + '-2'}
          >
            <stop stopColor='#FF632A' offset='0%' />
            <stop stopColor='#D0011B' offset='100%' />
          </linearGradient>
          <linearGradient
            x1='0%'
            y1='63.2102518%'
            x2='50%'
            y2='88.1091946%'
            id={gradientPrefix + '-3'}
          >
            <stop stopColor='#7ED321' offset='0%' />
            <stop stopColor='#F8E81C' offset='100%' />
          </linearGradient>
          <linearGradient
            x1='50%'
            y1='100%'
            x2='100%'
            y2='77.8581958%'
            id={gradientPrefix + '-4'}
          >
            <stop stopColor='#4990E2' offset='0%' />
            <stop stopColor='#7ED321' offset='100%' />
          </linearGradient>
          <linearGradient
            x1='77.0369764%'
            y1='87.8045704%'
            x2='89.3324607%'
            y2='35.5154758%'
            id={gradientPrefix + '-5'}
          >
            <stop stopColor='#9012FE' offset='0%' />
            <stop stopColor='#4990E2' offset='100%' />
          </linearGradient>
          <linearGradient
            x1='100%'
            y1='50%'
            x2='64.5974099%'
            y2='0%'
            id={gradientPrefix + '-6'}
          >
            <stop stopColor='#DB3A9C' offset='0%' />
            <stop stopColor='#9012FE' offset='100%' />
          </linearGradient>
        </defs>
        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g transform='translate(348.000000, 37.000000)' fill={textFillColor}>
            <path d='M5.985,261 L27.8775,261 L27.8775,155.9475 L5.985,155.9475 L5.985,261 Z M81.2649998,183.51 C59.2149998,183.51 41.4174998,200.9925 41.4174998,223.0425 C41.4174998,244.4625 59.2149998,262.4175 80.9499998,262.4175 C102.37,262.4175 120.325,244.62 120.325,223.3575 C120.325,201.15 103,183.51 81.2649998,183.51 Z M81.1074998,205.0875 C90.5574998,205.0875 98.1174998,213.12 98.1174998,223.2 C98.1174998,232.65 90.0849998,240.84 80.7924998,240.84 C71.3424998,240.84 63.6249998,232.65 63.6249998,223.0425 C63.6249998,213.12 71.6574998,205.0875 81.1074998,205.0875 Z M133.3925,261 L155.285,261 L155.285,218.79 C155.285,210.1275 159.695,205.0875 167.0975,205.0875 C174.5,205.0875 178.7525,210.1275 178.7525,218.79 L178.7525,261 L200.645,261 L200.645,220.8375 C200.645,209.97 198.5975,203.04 193.4,196.2675 C187.2575,188.235 177.65,183.51 167.0975,183.51 C158.12,183.51 149.615,186.8175 143.4725,192.96 C136.385,199.89 133.3925,208.2375 133.3925,220.8375 L133.3925,261 Z M270.412499,214.2225 C270.412499,223.2 269.939999,226.5075 268.679999,230.445 C266.317499,236.5875 260.174999,240.84 253.087499,240.84 C243.479999,240.84 235.762499,233.1225 235.762499,222.885 C235.762499,212.6475 243.322499,204.93 253.559999,204.93 C257.339999,204.93 260.804999,205.7175 266.002499,208.08 L266.002499,185.715 C259.702499,183.9825 256.709999,183.51 252.457499,183.51 C231.037499,183.51 213.554999,200.9925 213.554999,222.885 C213.554999,244.935 231.037499,262.4175 253.244999,262.4175 C263.797499,262.4175 273.089999,258.6375 280.492499,251.7075 C288.524999,243.99 292.304999,233.595 292.304999,219.105 L292.304999,155.9475 L270.412499,155.9475 L270.412499,214.2225 Z M344.589999,183.51 C322.539999,183.51 304.742499,200.9925 304.742499,223.0425 C304.742499,244.4625 322.539999,262.4175 344.274999,262.4175 C365.694999,262.4175 383.649999,244.62 383.649999,223.3575 C383.649999,201.15 366.324999,183.51 344.589999,183.51 Z M344.432499,205.0875 C353.882499,205.0875 361.442499,213.12 361.442499,223.2 C361.442499,232.65 353.409999,240.84 344.117499,240.84 C334.667499,240.84 326.949999,232.65 326.949999,223.0425 C326.949999,213.12 334.982499,205.0875 344.432499,205.0875 Z M396.717499,261 L418.609999,261 L418.609999,218.79 C418.609999,210.1275 423.019999,205.0875 430.422499,205.0875 C437.824999,205.0875 442.077499,210.1275 442.077499,218.79 L442.077499,261 L463.969999,261 L463.969999,220.8375 C463.969999,209.97 461.922499,203.04 456.724999,196.2675 C450.582499,188.235 440.974999,183.51 430.422499,183.51 C421.444999,183.51 412.939999,186.8175 406.797499,192.96 C399.709999,199.89 396.717499,208.2375 396.717499,220.8375 L396.717499,261 Z' />
            <path d='M57.535,107 L79.4275,107 L79.4275,72.8225 C79.4275,61.955 77.2225,52.9775 72.655,46.205 C65.725,35.6525 53.5975,29.51 40.3675,29.51 C18.16,29.51 0.6775,46.9925 0.6775,69.0425 C0.6775,90.935 18.0025,108.4175 39.4225,108.4175 C43.2025,108.4175 46.3525,108.1025 53.125,106.37 L53.125,84.005 C46.825,86.3675 44.1475,86.9975 40.84,86.9975 C30.2875,86.9975 22.885,79.28 22.885,69.0425 C22.885,58.805 30.6025,51.0875 40.21,51.0875 C47.2975,51.0875 53.44,55.34 55.8025,61.4825 C57.0625,65.42 57.535,68.7275 57.535,77.705 L57.535,107 Z M94.3375001,107 L116.23,107 L116.23,66.5225 C116.23,61.01 117.0175,58.0175 119.38,55.4975 C121.7425,52.82 124.735,51.4025 128.3575,51.4025 C128.9875,51.4025 130.2475,51.56 131.5075,51.7175 L131.5075,29.825 C129.145,29.3525 128.3575,29.51 126.94,29.51 C118.2775,29.51 111.0325,32.1875 104.89,37.7 C96.8575001,44.7875 94.3375001,51.7175 94.3375001,66.2075 L94.3375001,107 Z M178.075,85.895 C176.3425,86.6825 175.3975,86.84 173.665,86.84 C166.2625,86.84 163.4275,83.06 163.4275,72.98 L163.4275,51.875 L178.075,51.875 L178.075,30.9275 L163.4275,30.9275 L163.4275,8.405 L141.535,8.405 L141.535,73.61 C141.535,86.84 143.5825,94.2425 149.095,100.07 C154.2925,105.5825 161.38,108.4175 170.3575,108.4175 C173.035,108.4175 174.7675,108.26 178.075,107.4725 L178.075,85.895 Z M189.52,107 L211.4125,107 L211.4125,51.56 L227.4775,51.56 L227.4775,30.9275 L211.4125,30.9275 C212.2,24.47 217.24,20.69 225.43,20.69 C225.5875,20.69 226.69,20.69 227.4775,20.8475 L227.4775,0.53 C225.5875,0.3725 223.3825,0.215 222.595,0.215 C212.0425,0.215 203.695,4.1525 197.2375,12.185 C191.725,19.115 189.52,26.675 189.52,38.015 L189.52,107 Z M281.1325,73.1375 C281.1325,81.8 276.88,86.84 269.4775,86.84 C262.075,86.84 257.665,81.8 257.665,73.1375 L257.665,30.9275 L235.7725,30.9275 L235.7725,71.09 C235.7725,81.9575 237.82,88.8875 243.0175,95.66 C249.3175,103.6925 258.7675,108.4175 269.4775,108.4175 C278.2975,108.4175 286.8025,105.11 292.945,98.9675 C300.0325,92.0375 303.025,83.69 303.025,71.09 L303.025,30.9275 L281.1325,30.9275 L281.1325,73.1375 Z M318.4075,107 L340.3,107 L340.3,1.9475 L318.4075,1.9475 L318.4075,107 Z M356.3125,107 L378.205,107 L378.205,1.9475 L356.3125,1.9475 L356.3125,107 Z M401.4625,135.5075 C409.495,136.925 413.7475,137.24 420.0475,137.24 C430.7575,137.24 438.16,135.5075 444.46,131.7275 C450.9175,127.79 456.43,121.175 459.4225,114.4025 C461.9425,107.945 462.415,104.0075 462.415,87.785 L462.415,30.9275 L440.5225,30.9275 L440.5225,68.4125 C440.5225,78.4925 436.1125,84.005 428.08,84.005 C424.7725,84.005 421.3075,82.745 419.575,80.3825 C417.685,78.02 417.055,75.3425 417.055,69.2 L417.055,30.9275 L395.1625,30.9275 L395.1625,69.9875 C395.1625,81.8 396.58,87.47 400.36,93.455 C405.2425,100.8575 413.275,104.9525 422.095,104.9525 C428.5525,104.9525 433.75,103.3775 440.5225,99.125 C440.05,104.165 439.5775,106.5275 437.6875,109.0475 C434.38,113.93 428.2375,116.2925 420.205,116.2925 C415.3225,116.2925 413.7475,115.9775 401.4625,113.4575 L401.4625,135.5075 Z' />
          </g>
          <g
            filter={`url(#${gradientPrefix + '-filter'})`}
            transform='translate(7.000000, 8.000000)'
          >
            <path
              d='M301.2,181.965628 C301.2,182.45622 301.186179,182.934264 301.15889,183.4 L217.276855,183.4 C217.255956,175.649239 216.902392,167.763219 216.666629,161.993489 L301.2,181.965628 Z M301.2,181.965628 L216.666629,161.993489 C216.340599,154.014683 215.327863,140.755174 212.600098,130.953613 C209.025966,118.110841 203.375021,109.271066 201.2,106.56035 L267.437452,53.4 C270.170548,56.7827908 272.75103,60.3094785 275.167153,63.975112 C292.724189,89.9126949 301.2,124.295072 301.2,165.915845 L301.2,181.965628 Z'
              fill={`url(#${gradientPrefix + '-1'})`}
            />
            <path
              d='M217.203293,297.4 L301.2,297.4 L301.2,182.4 L217.2,182.557113 C217.202202,183.376214 217.203293,184.208055 217.203293,185.052992 L217.203293,297.4 Z'
              fill={`url(#${gradientPrefix + '-2'})`}
            />
            <path
              d='M268.2,54.0023029 C240.796818,19.9377055 198.053367,0.4 151.805489,0.4 L151.200684,83.1645508 C171.738994,83.1645508 190.21243,92.7023615 201.954506,107.4 L268.2,54.0023029 Z'
              fill={`url(#${gradientPrefix + '-3'})`}
            />
            <path
              d='M152.2,0.4 C104.864645,0.4 63.0957289,20.8868082 35.2,53.4956375 L101.083819,106.4 C113.309959,91.9971709 131.359178,83.1428223 151.58667,83.1428223 L152.2,0.4 Z'
              fill={`url(#${gradientPrefix + '-4'})`}
            />
            <path
              d='M35.7028809,52.8625488 C13.3371257,79.2483159 0.2,113.109668 0.2,150.938606 C0.2,161.38647 1.22479457,171.572464 3.17701069,181.4 L85.8111133,161.942745 C85.3060041,158.375146 85.0463013,154.701252 85.0463013,150.938606 C85.0463013,133.109253 91.0506812,118.18224 101.125,106.204834 L35.7028809,52.8625488 Z'
              fill={`url(#${gradientPrefix + '-5'})`}
            />
            <path
              d='M3.17114258,181.09668 C12.5693563,227.959374 42.0973026,266.595336 83.4558105,286.614502 L119.95752,211.213623 C101.125719,201.486429 88.9457644,183.834563 85.7800293,161.686768 L3.17114258,181.09668 Z'
              fill={`url(#${gradientPrefix + '-6'})`}
            />
            <path
              d='M83.2,286.55614 C102.687684,296.079191 124.544525,301.4 147.642859,301.4 C162.14138,301.4 174.223482,300.187097 200.2,293.516129 L200.2,207.4 C176.035797,216.496774 165.766011,218.922581 153.079804,218.922581 C140.606028,218.922581 129.279781,216.100213 119.578492,211.041268 L83.2,286.55614 Z'
              fill='#DB3A9C'
            />
          </g>
        </g>
      </svg>
    )
  }
}

/* istanbul ignore next */
Logo.propTypes = {
  size: PropTypes.oneOf([
    LOGO_SIZE_SMALL,
    LOGO_SIZE_MEDIUM,
    LOGO_SIZE_LARGE,
    LOGO_SIZE_XLARGE
  ]).isRequired,
  type: PropTypes.oneOf([LOGO_TYPE_NORMAL, LOGO_TYPE_INVERSE]).isRequired
}

/* istanbul ignore next */
Logo.defaultProps = {
  type: LOGO_TYPE_NORMAL
}

export default Logo
