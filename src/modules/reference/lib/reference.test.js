import * as referenceLib from '_src/modules/reference/lib/reference'
import * as imageLib from '_src/lib/image'

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

    imageLib.createHeroImageUrl = jest
      .fn()
      .mockImplementation((a, b) => `${a} ${b}`)

    const actual = referenceLib.mapReferenceData(contentJson)

    expect(actual).toEqual({
      heroImage: {
        desktopUrl: 'shoreditch-graffiti false',
        mobileUrl: 'shoreditch-graffiti true',
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
