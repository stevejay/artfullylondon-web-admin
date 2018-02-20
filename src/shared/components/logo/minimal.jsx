import React from 'react'
import _ from 'lodash'

const LOGO_SIZE_PARAMS = { width: '110px', height: '110px' }

class LogoMinimal extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    // There was a problem when more than one instance of this class was rendered
    // at the same time: the gradient ids needed to be unique.

    const gradientPrefix = _.uniqueId('linearGradientMinimal_')

    return (
      <svg
        aria-label='Artfully London'
        style={LOGO_SIZE_PARAMS}
        viewBox='0 0 320 320'
        version='1.1'
      >
        <defs>
          <filter
            x='-50%'
            y='-50%'
            width='200%'
            height='200%'
            filterUnits='objectBoundingBox'
            id={gradientPrefix + '-filter'}
          >
            <feOffset
              dx='0'
              dy='2'
              in='SourceAlpha'
              result='shadowOffsetOuter1'
            />
            <feGaussianBlur
              stdDeviation='2'
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
          <g
            filter={`url(#${gradientPrefix + '-filter'})`}
            transform='translate(8.000000, 8.000000)'
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

export default LogoMinimal
