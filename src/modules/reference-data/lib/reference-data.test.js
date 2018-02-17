import * as referenceDataLib from './reference-data'

describe('mapReferenceData', () => {
  it('should create a server constants structure from the input', () => {
    const contentJson = {
      heroImage: {
        name: 'shoreditch-graffiti',
        dominantColor: '#2e2d27',
        label: 'Graffiti in Shoreditch'
      },
      namedClosures: {
        BankHolidays: {
          label: 'Bank Holidays',
          dates: {
            '2017': ['2017/01/01'],
            '2018': ['2018/01/01']
          }
        },
        BankHolidayWeekends: {
          label: 'Bank Holiday Weekends',
          dates: {
            '2017': ['2017/01/01', '2017/01/02']
          }
        }
      }
    }

    const actual = referenceDataLib.mapReferenceData(contentJson)

    expect(actual).toEqual({
      heroImage: {
        desktopUrl: 'https://siteimages.test.com/hero-image/shoreditch-graffiti.jpg',
        mobileUrl: 'https://siteimages.test.com/hero-image/shoreditch-graffiti.mobile.jpg',
        dominantColor: '#2e2d27'
      },
      namedClosuresDropdownOptions: [
        { value: 'BankHolidays', label: 'Bank Holidays' },
        { value: 'BankHolidayWeekends', label: 'Bank Holiday Weekends' }
      ],
      namedClosuresLookup: {
        BankHolidays: {
          '2017': ['2017/01/01'],
          '2018': ['2018/01/01']
        },
        BankHolidayWeekends: {
          '2017': ['2017/01/01', '2017/01/02']
        }
      }
    })
  })
})
