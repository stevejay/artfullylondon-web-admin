import eventType from '_src/domain/types/event-type'
import occurrenceType from '_src/domain/types/occurrence-type'
import entityType from '_src/domain/types/entity-type'
import * as timeLib from '_src/shared/lib/time'

const yesterday = '2016/01/01' // 1st Jan 2016
const today = '2016/01/02' // 2nd Jan 2016
const dateAfterTodayOne = '2016/11/19' // 19th Nov 2016
const dateAfterTodayOneCopy = '2016/11/19' // 19th Nov 2016
const dateAfterTodayOneDayNumber = 5
const dateAfterTodayTwo = '2016/11/23' // 23rd Nov 2016
const dateAfterTodayTwoDayNumber = 6
const dateAfterTodayThree = '2016/11/24' // 24th Nov 2016
const dateAfterTodayFour = '2016/11/25' // 25th Nov 2016
const dateAfterTodayFourDayNumber = 2

const activeNamedClosuresLookup = {
  Named1: {
    '2016': [dateAfterTodayOne],
    '2017': []
  },
  Named2: {
    '2016': [dateAfterTodayTwo],
    '2017': []
  }
}

const emptyNamedClosuresLookup = {}

describe('addDaysToStringDate', () => {
  const tests = [
    {
      args: {
        dateStr: '2017/01/20',
        days: 3
      },
      expected: '2017/01/23'
    },
    {
      args: {
        dateStr: '2017/01/31',
        days: 3
      },
      expected: '2017/02/03'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = timeLib.addDaysToStringDate(
        test.args.dateStr,
        test.args.days
      )
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('formatOpeningTimesOrPerformanceTimeForDisplay', () => {
  const tests = [
    {
      it: 'should format an opening time',
      arg: { from: '11:00', to: '14:05' },
      expected: '11:00 am to 2:05 pm'
    },
    {
      it: 'should format an opening time that has the same from and to times',
      arg: { from: '11:00', to: '11:00' },
      expected: '11:00 am'
    },
    {
      it: 'should format a performance time',
      arg: { at: '11:00' },
      expected: '11:00 am'
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = timeLib.formatOpeningTimesOrPerformanceTimeForDisplay(
        test.arg
      )
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createDateRangeLabel', () => {
  const tests = [
    // dateTo === dateFrom
    {
      args: {
        dateStr: '2016/07/11', // day after
        dateFrom: '2016/07/10',
        dateTo: '2016/07/10'
      },
      expected: 'Ended'
    },
    {
      args: {
        dateStr: '2016/07/10', // same day
        dateFrom: '2016/07/10',
        dateTo: '2016/07/10'
      },
      expected: 'Today only'
    },
    {
      args: {
        dateStr: '2016/07/09', // day before
        dateFrom: '2016/07/10',
        dateTo: '2016/07/10'
      },
      expected: 'Tomorrow only'
    },
    {
      args: {
        dateStr: '2016/07/08', // two days before
        dateFrom: '2016/07/10',
        dateTo: '2016/07/10'
      },
      expected: 'Open in 2 days'
    },
    {
      args: {
        dateStr: '2016/07/01', // nine days before
        dateFrom: '2016/07/10',
        dateTo: '2016/07/10'
      },
      expected: 'Open 10th Jul 2016'
    },
    // dateTo > dateFrom
    {
      args: {
        dateStr: '2016/07/20', // same day as end
        dateFrom: '2016/07/10',
        dateTo: '2016/07/20'
      },
      expected: 'Ends today'
    },
    {
      args: {
        dateStr: '2016/07/19', // day before end
        dateFrom: '2016/07/10',
        dateTo: '2016/07/20'
      },
      expected: 'Ends tomorrow'
    },
    {
      args: {
        dateStr: '2016/07/18', // two days before end
        dateFrom: '2016/07/10',
        dateTo: '2016/07/20'
      },
      expected: 'Ends in 2 days'
    },
    {
      args: {
        dateStr: '2016/07/11', // nine days before end
        dateFrom: '2016/07/10',
        dateTo: '2016/07/20'
      },
      expected: 'Now on'
    },
    {
      args: {
        dateStr: '2016/07/10', // same day
        dateFrom: '2016/07/10',
        dateTo: '2016/07/11'
      },
      expected: 'Opens today'
    },
    {
      args: {
        dateStr: '2016/07/09', // day before
        dateFrom: '2016/07/10',
        dateTo: '2016/07/11'
      },
      expected: 'Opens tomorrow'
    },
    {
      args: {
        dateStr: '2016/07/08', // two days before
        dateFrom: '2016/07/10',
        dateTo: '2016/07/11'
      },
      expected: 'Opens in 2 days'
    },
    {
      args: {
        dateStr: '2016/07/01', // nine days before
        dateFrom: '2016/07/10',
        dateTo: '2016/07/11'
      },
      expected: 'Opens 10th Jul 2016'
    },
    // no dates
    {
      args: {
        dateStr: '2016/07/10',
        dateFrom: null,
        dateTo: null
      },
      expected: 'Now on'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = timeLib.createDateRangeLabel(
        test.args.dateStr,
        test.args.dateFrom,
        test.args.dateTo
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('getRegularTimesForDisplay', () => {
  const tests = [
    {
      arg: [],
      expected: []
    },
    {
      arg: [
        { day: 2, at: '09:30' },
        { day: 2, at: '10:30' },
        { day: 4, at: '08:30' }
      ],
      expected: [
        { label: 'Wednesday', times: [{ at: '09:30' }, { at: '10:30' }] },
        { label: 'Friday', times: [{ at: '08:30' }] }
      ]
    },
    {
      arg: [{ day: 0, at: '09:30' }, { day: 6, at: '08:30' }],
      expected: [
        { label: 'Monday', times: [{ at: '09:30' }] },
        { label: 'Sunday', times: [{ at: '08:30' }] }
      ]
    },
    {
      arg: [
        { day: 2, from: '09:30', to: '10:00' },
        { day: 2, from: '10:30', to: '14:00' },
        { day: 4, from: '08:30', to: '18:00' }
      ],
      expected: [
        {
          label: 'Wednesday',
          times: [
            { from: '09:30', to: '10:00' },
            { from: '10:30', to: '14:00' }
          ]
        },
        { label: 'Friday', times: [{ from: '08:30', to: '18:00' }] }
      ]
    },
    {
      arg: [
        { day: 0, from: '09:30', to: '10:00' },
        { day: 6, from: '08:30', to: '18:00' }
      ],
      expected: [
        { label: 'Monday', times: [{ from: '09:30', to: '10:00' }] },
        { label: 'Sunday', times: [{ from: '08:30', to: '18:00' }] }
      ]
    }
  ]

  tests.forEach(test => {
    it(
      'should return ' +
        JSON.stringify(test.expected) +
        ' for arg ' +
        JSON.stringify(test.arg),
      () => {
        expect(timeLib.getRegularTimesForDisplay(test.arg)).toEqual(
          test.expected
        )
      }
    )
  })
})

describe('getAdditionalPerformancesForDisplay', () => {
  const tests = [
    {
      arg: [],
      expected: []
    },
    {
      arg: [{ date: dateAfterTodayOne, at: '16:00' }],
      expected: [
        {
          date: '2016/11/19',
          label: '19th Nov 2016',
          times: [{ date: '2016/11/19', at: '16:00' }]
        }
      ]
    },
    {
      arg: [
        { date: dateAfterTodayOne, at: '16:00' },
        { date: dateAfterTodayOneCopy, at: '18:00' },
        { date: dateAfterTodayTwo, at: '12:00' }
      ],
      expected: [
        {
          date: '2016/11/19',
          label: '19th Nov 2016',
          times: [
            { date: '2016/11/19', at: '16:00' },
            { date: '2016/11/19', at: '18:00' }
          ]
        },
        {
          date: '2016/11/23',
          label: '23rd Nov 2016',
          times: [{ date: '2016/11/23', at: '12:00' }]
        }
      ]
    },
    {
      arg: [
        { date: today, at: '16:00' },
        { date: today, at: '18:00' },
        { date: dateAfterTodayTwo, at: '12:00' }
      ],
      expected: [
        {
          date: '2016/01/02',
          label: '2nd Jan 2016',
          times: [
            { date: '2016/01/02', at: '16:00' },
            { date: '2016/01/02', at: '18:00' }
          ]
        },
        {
          date: '2016/11/23',
          label: '23rd Nov 2016',
          times: [{ date: '2016/11/23', at: '12:00' }]
        }
      ]
    },
    {
      arg: [
        { date: yesterday, at: '16:00' },
        { date: yesterday, at: '18:00' },
        { date: dateAfterTodayTwo, at: '12:00' }
      ],
      expected: [
        {
          date: '2016/11/23',
          label: '23rd Nov 2016',
          times: [{ date: '2016/11/23', at: '12:00' }]
        }
      ]
    }
  ]

  tests.forEach(test => {
    it(
      'should return ' +
        JSON.stringify(test.expected) +
        ' for arg ' +
        JSON.stringify(test.arg),
      () => {
        expect(
          timeLib.getAdditionalPerformancesForDisplay(
            test.arg,
            today,
            '2017/01/01'
          )
        ).toEqual(test.expected)
      }
    )
  })
})

describe('getAdditionalOpeningTimesForDisplay', () => {
  const tests = [
    {
      args: {
        event: [],
        venue: []
      },
      expected: []
    },
    {
      args: {
        event: [
          { date: dateAfterTodayOne, from: '10:00', to: '12:00' },
          { date: dateAfterTodayOneCopy, from: '14:00', to: '16:00' },
          { date: dateAfterTodayTwo, from: '10:00', to: '16:00' }
        ],
        venue: []
      },
      expected: [
        {
          date: '2016/11/19',
          label: '19th Nov 2016',
          times: [
            { date: '2016/11/19', from: '10:00', to: '12:00' },
            { date: '2016/11/19', from: '14:00', to: '16:00' }
          ]
        },
        {
          date: '2016/11/23',
          label: '23rd Nov 2016',
          times: [{ date: '2016/11/23', from: '10:00', to: '16:00' }]
        }
      ]
    },
    {
      args: {
        event: [],
        venue: [
          { date: dateAfterTodayOne, from: '10:00', to: '12:00' },
          { date: dateAfterTodayOneCopy, from: '14:00', to: '16:00' },
          { date: dateAfterTodayTwo, from: '10:00', to: '16:00' }
        ]
      },
      expected: [
        {
          date: '2016/11/19',
          label: '19th Nov 2016',
          times: [
            { date: '2016/11/19', from: '10:00', to: '12:00' },
            { date: '2016/11/19', from: '14:00', to: '16:00' }
          ]
        },
        {
          date: '2016/11/23',
          label: '23rd Nov 2016',
          times: [{ date: '2016/11/23', from: '10:00', to: '16:00' }]
        }
      ]
    },
    // {
    //   args: {
    //     event: [
    //       { date: dateAfterTodayOne, from: "10:00", to: "12:00" },
    //       { date: dateAfterTodayOneCopy, from: "14:00", to: "16:00" },
    //       { date: dateAfterTodayTwo, from: "10:00", to: "16:00" }
    //     ],
    //     venue: [
    //       { date: dateAfterTodayOne, from: "20:00", to: "21:00" },
    //       { date: dateAfterTodayOneCopy, from: "22:00", to: "23:00" },
    //       { date: dateAfterTodayTwo, from: "20:00", to: "23:00" }
    //     ]
    //   },
    //   expected: [
    //     {
    //       date: "2016/11/19",
    //       label: "19th Nov 2016",
    //       times: [
    //         { date: "2016/11/19", from: "10:00", to: "12:00" },
    //         { date: "2016/11/19", from: "14:00", to: "16:00" }
    //       ]
    //     },
    //     {
    //       date: "2016/11/23",
    //       label: "23rd Nov 2016",
    //       times: [{ date: "2016/11/23", from: "10:00", to: "16:00" }]
    //     }
    //   ]
    // },
    // {
    //   args: {
    //     event: [
    //       { date: dateAfterTodayOne, from: "10:00", to: "12:00" },
    //       { date: dateAfterTodayOneCopy, from: "14:00", to: "16:00" }
    //     ],
    //     venue: [
    //       { date: dateAfterTodayOne, from: "20:00", to: "21:00" },
    //       { date: dateAfterTodayOneCopy, from: "22:00", to: "23:00" },
    //       { date: dateAfterTodayTwo, from: "20:00", to: "23:00" }
    //     ]
    //   },
    //   expected: [
    //     {
    //       date: "2016/11/19",
    //       label: "19th Nov 2016",
    //       times: [
    //         { date: "2016/11/19", from: "10:00", to: "12:00" },
    //         { date: "2016/11/19", from: "14:00", to: "16:00" }
    //       ]
    //     },
    //     {
    //       date: "2016/11/23",
    //       label: "23rd Nov 2016",
    //       times: [{ date: "2016/11/23", from: "20:00", to: "23:00" }]
    //     }
    //   ]
    // },
    {
      args: {
        event: [{ date: yesterday, from: '10:00', to: '12:00' }],
        venue: []
      },
      expected: []
    }
  ]

  tests.forEach(test => {
    it(
      'should return ' +
        JSON.stringify(test.expected) +
        ' for args ' +
        JSON.stringify(test.args),
      () => {
        expect(
          timeLib.getAdditionalOpeningTimesForDisplay(
            test.args.event,
            test.args.venue,
            today,
            '2017/01/01'
          )
        ).toEqual(test.expected)
      }
    )
  })
})

describe('getClosuresForDisplay', () => {
  const tests = [
    {
      args: {
        event: [],
        venue: [],
        venueNamed: []
      },
      expected: []
    },
    // {
    //   args: {
    //     event: [],
    //     venue: [],
    //     venueNamed: ["ChristmasDay", "NewYearsDay"]
    //   },
    //   expected: [{ label: "Christmas Day" }, { label: "New Years Day" }]
    // },
    // {
    //   args: {
    //     event: [{ date: dateAfterTodayOne }, { date: dateAfterTodayTwo }],
    //     venue: [],
    //     venueNamed: ["ChristmasDay"]
    //   },
    //   expected: [
    //     { date: "2016/11/19", label: "19th Nov 2016", times: [] },
    //     { date: "2016/11/23", label: "23rd Nov 2016", times: [] },
    //     { label: "Christmas Day" }
    //   ]
    // },
    {
      args: {
        event: [],
        venue: [{ date: dateAfterTodayOne }, { date: dateAfterTodayTwo }],
        venueNamed: []
      },
      expected: [
        { date: '2016/11/19', label: '19th Nov 2016', times: [] },
        { date: '2016/11/23', label: '23rd Nov 2016', times: [] }
      ]
    },
    {
      args: {
        event: [{ date: dateAfterTodayOne }, { date: dateAfterTodayTwo }],
        venue: [{ date: dateAfterTodayOneCopy }, { date: dateAfterTodayTwo }],
        venueNamed: []
      },
      expected: [
        { date: '2016/11/19', label: '19th Nov 2016', times: [] },
        { date: '2016/11/23', label: '23rd Nov 2016', times: [] }
      ]
    },
    {
      args: {
        event: [{ date: dateAfterTodayTwo }],
        venue: [{ date: dateAfterTodayOne }],
        venueNamed: []
      },
      expected: [
        { date: '2016/11/19', label: '19th Nov 2016', times: [] },
        { date: '2016/11/23', label: '23rd Nov 2016', times: [] }
      ]
    }
    // {
    //   args: {
    //     event: [{ date: yesterday }],
    //     venue: [{ date: yesterday }],
    //     venueNamed: ["ChristmasDay"]
    //   },
    //   expected: [{ label: "Christmas Day" }]
    // }
  ]

  tests.forEach(test => {
    it(
      'should return ' +
        JSON.stringify(test.expected) +
        ' for args ' +
        JSON.stringify(test.args),
      () => {
        expect(
          timeLib.getClosuresForDisplay(
            test.args.event,
            test.args.venue,
            test.args.venueNamed,
            today,
            '2017/01/01'
          )
        ).toEqual(test.expected)
      }
    )
  })
})

describe('getTimesDetailsForVenue', () => {
  const tests = [
    {
      args: {
        openingTimes: [],
        additionalOpeningTimes: [],
        openingTimesClosures: [],
        namedClosures: []
      },
      expected: {
        regularTimes: [],
        additionalTimes: [],
        specialTimes: [],
        closures: []
      }
    }
    // {
    //   args: {
    //     openingTimes: [{ day: 2, from: "09:30", to: "10:00" }],
    //     additionalOpeningTimes: [
    //       { date: dateAfterTodayOne, from: "10:00", to: "12:00" },
    //       { date: dateAfterTodayOneCopy, from: "14:00", to: "16:00" }
    //     ],
    //     openingTimesClosures: [{ date: dateAfterTodayTwo }],
    //     namedClosures: ["ChristmasDay"]
    //   },
    //   expected: {
    //     regularTimes: [
    //       { label: "Wednesday", times: [{ from: "09:30", to: "10:00" }] }
    //     ],
    //     additionalTimes: [
    //       {
    //         label: "19th Nov 2016",
    //         times: [
    //           { from: "10:00", to: "12:00" },
    //           { from: "14:00", to: "16:00" }
    //         ]
    //       }
    //     ],
    //     specialTimes: [],
    //     closures: [{ label: "23rd Nov 2016" }, { label: "Christmas Day" }]
    //   }
    // }
  ]

  tests.forEach(test => {
    it(
      'should return ' +
        JSON.stringify(test.expected) +
        ' for args ' +
        JSON.stringify(test.args),
      () => {
        expect(
          timeLib.getTimesDetailsForVenue(
            {
              openingTimes: test.args.openingTimes,
              additionalOpeningTimes: test.args.additionalOpeningTimes,
              openingTimesClosures: test.args.closures,
              namedClosures: test.args.namedClosures
            },
            'venue',
            today
          )
        ).toEqual(test.expected)
      }
    )
  })
})

describe('getTimesDetailsForPerformanceEvent', () => {
  const tests = [
    {
      args: {
        performances: [],
        additionalPerformances: [],
        performancesClosures: []
      },
      expected: {
        regularTimes: [],
        additionalTimes: [],
        specialTimes: [],
        closures: []
      }
    },
    {
      args: {
        performances: [{ day: 2, at: '09:30' }],
        additionalPerformances: [{ date: dateAfterTodayOne, at: '16:00' }],
        performancesClosures: [{ date: dateAfterTodayTwo }]
      },
      expected: {
        regularTimes: [{ label: 'Wednesday', times: [{ at: '09:30' }] }],
        additionalTimes: [
          {
            date: '2016/11/19',
            label: '19th Nov 2016',
            times: [{ date: '2016/11/19', at: '16:00' }]
          }
        ],
        specialTimes: [],
        closures: [{ date: '2016/11/23', label: '23rd Nov 2016', times: [] }]
      }
    }
  ]

  tests.forEach(test => {
    it(
      'should return ' +
        JSON.stringify(test.expected) +
        ' for args ' +
        JSON.stringify(test.args),
      () => {
        expect(
          timeLib.getTimesDetailsForPerformanceEvent(
            {
              performances: test.args.performances,
              additionalPerformances: test.args.additionalPerformances,
              performancesClosures: test.args.performancesClosures
            },
            today,
            '2017/01/01'
          )
        ).toEqual(test.expected)
      }
    )
  })
})

describe('getTimesDetailsForExhibitionEvent', () => {
  const tests = [
    {
      args: {
        event: {
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        fromStr: today,
        toStr: '2017/01/01'
      },
      expected: {
        regularTimes: [],
        additionalTimes: [],
        specialTimes: [],
        closures: []
      }
    },
    {
      args: {
        event: {
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [{ day: 4, from: '12:30', to: '14:00' }],
            additionalOpeningTimes: [
              { date: dateAfterTodayOne, from: '10:00', to: '12:00' }
            ],
            openingTimesClosures: [{ date: dateAfterTodayThree }],
            namedClosures: []
          },
          openingTimes: [{ day: 2, from: '09:30', to: '10:00' }],
          additionalOpeningTimes: [
            { date: dateAfterTodayTwo, from: '16:00', to: '18:00' }
          ],
          openingTimesClosures: [{ date: dateAfterTodayFour }]
        },
        fromStr: today,
        toStr: '2017/01/01'
      },
      expected: {
        regularTimes: [
          { label: 'Wednesday', times: [{ from: '09:30', to: '10:00' }] }
        ],
        additionalTimes: [
          {
            date: '2016/11/23',
            label: '23rd Nov 2016',
            times: [{ date: '2016/11/23', from: '16:00', to: '18:00' }]
          }
        ],
        specialTimes: [],
        closures: [{ date: '2016/11/25', label: '25th Nov 2016', times: [] }]
      }
    },
    {
      args: {
        event: {
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [{ day: 4, from: '12:30', to: '14:00' }],
            additionalOpeningTimes: [
              { date: dateAfterTodayOne, from: '10:00', to: '12:00' }
            ],
            openingTimesClosures: [{ date: dateAfterTodayThree }],
            namedClosures: []
          },
          openingTimes: [
            { day: dateAfterTodayFourDayNumber, from: '09:30', to: '10:00' }
          ],
          additionalOpeningTimes: [
            { date: dateAfterTodayTwo, from: '16:00', to: '18:00' }
          ],
          openingTimesClosures: [{ date: dateAfterTodayFour }]
        },
        fromStr: today,
        toStr: '2017/01/01'
      },
      expected: {
        regularTimes: [
          { label: 'Wednesday', times: [{ from: '09:30', to: '10:00' }] }
        ],
        additionalTimes: [
          {
            date: '2016/11/23',
            label: '23rd Nov 2016',
            times: [{ date: '2016/11/23', from: '16:00', to: '18:00' }]
          }
        ],
        specialTimes: [],
        closures: [{ date: '2016/11/25', label: '25th Nov 2016', times: [] }]
      }
    },
    {
      args: {
        event: {
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [],
            additionalOpeningTimes: [
              { date: dateAfterTodayTwo, from: '10:00', to: '12:00' }
            ],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [
            { date: dateAfterTodayTwo, from: '16:00', to: '18:00' }
          ],
          openingTimesClosures: []
        },
        fromStr: today,
        toStr: '2017/01/01'
      },
      expected: {
        regularTimes: [],
        additionalTimes: [
          {
            date: '2016/11/23',
            label: '23rd Nov 2016',
            times: [{ date: '2016/11/23', from: '16:00', to: '18:00' }]
          }
        ],
        specialTimes: [],
        closures: []
      }
    },
    {
      args: {
        event: {
          useVenueOpeningTimes: true,
          venue: {
            openingTimes: [{ day: 4, from: '12:30', to: '14:00' }],
            additionalOpeningTimes: [
              { date: dateAfterTodayOne, from: '10:00', to: '12:00' }
            ],
            openingTimesClosures: [{ date: dateAfterTodayThree }],
            namedClosures: []
          },
          openingTimes: [{ day: 2, from: '09:30', to: '10:00' }],
          additionalOpeningTimes: [
            { date: dateAfterTodayTwo, from: '16:00', to: '18:00' }
          ],
          openingTimesClosures: [{ date: dateAfterTodayFour }]
        },
        fromStr: today,
        toStr: '2017/01/01'
      },
      expected: {'additionalTimes': [{'date': '2016/11/19', 'label': '19th Nov 2016', 'times': [{'date': '2016/11/19', 'from': '10:00', 'to': '12:00'}]}, {'date': '2016/11/23', 'label': '23rd Nov 2016', 'times': [{'date': '2016/11/23', 'from': '16:00', 'to': '18:00'}]}], 'closures': [{'date': '2016/11/24', 'label': '24th Nov 2016', 'times': []}, {'date': '2016/11/25', 'label': '25th Nov 2016', 'times': []}], 'regularTimes': [{'label': 'Friday', 'times': [{'from': '12:30', 'to': '14:00'}]}], 'specialTimes': []}
    }
  ]

  tests.forEach(test => {
    it(
      'should return ' +
        JSON.stringify(test.expected) +
        ' for args ' +
        JSON.stringify(test.args),
      () => {
        expect(
          timeLib.getTimesDetailsForExhibitionEvent(
            test.args.event,
            test.args.fromStr,
            test.args.toStr
          )
        ).toEqual(test.expected)
      }
    )
  })
})

describe('formatTimesStringForGivenDate with a venue', () => {
  const tests = [
    {
      args: {
        entity: {
          entityType: entityType.VENUE,
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: [],
          namedClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: null
    },
    {
      args: {
        entity: {
          entityType: entityType.VENUE,
          openingTimes: [
            { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' },
            { day: dateAfterTodayOneDayNumber, from: '12:00', to: '13:00' }
          ],
          additionalOpeningTimes: [],
          openingTimesClosures: [],
          namedClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: '12:00 pm to 1:00 pm, 3:00 pm to 6:00 pm'
    },
    {
      args: {
        entity: {
          entityType: entityType.VENUE,
          openingTimes: [
            { day: dateAfterTodayOneDayNumber, from: '12:00', to: '13:00' },
            { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
          ],
          additionalOpeningTimes: [
            { date: dateAfterTodayOneCopy, from: '19:00', to: '19:30' },
            { date: dateAfterTodayOne, from: '20:00', to: '21:00' }
          ],
          openingTimesClosures: [],
          namedClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: '12:00 pm to 1:00 pm, 3:00 pm to 6:00 pm, 7:00 pm to 7:30 pm, 8:00 pm to 9:00 pm'
    },
    {
      args: {
        entity: {
          entityType: entityType.VENUE,
          openingTimes: [
            { day: dateAfterTodayOneDayNumber, from: '12:00', to: '13:00' },
            { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
          ],
          additionalOpeningTimes: [
            { date: dateAfterTodayOneCopy, from: '19:00', to: '19:30' },
            { date: dateAfterTodayOne, from: '20:00', to: '21:00' }
          ],
          openingTimesClosures: [
            { date: dateAfterTodayOneCopy, from: '12:00', to: '13:00' },
            { date: dateAfterTodayOne, from: '15:00', to: '18:00' }
          ],
          namedClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: '7:00 pm to 7:30 pm, 8:00 pm to 9:00 pm'
    },
    {
      args: {
        entity: {
          entityType: entityType.VENUE,
          openingTimes: [
            { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' },
            { day: dateAfterTodayOneDayNumber, from: '12:00', to: '13:00' }
          ],
          additionalOpeningTimes: [],
          openingTimesClosures: [{ date: dateAfterTodayOne }],
          namedClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: 'Closed'
    },
    {
      args: {
        entity: {
          entityType: entityType.VENUE,
          openingTimes: [
            { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' },
            { day: dateAfterTodayOneDayNumber, from: '12:00', to: '13:00' }
          ],
          additionalOpeningTimes: [],
          openingTimesClosures: [],
          namedClosures: ['Named1']
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: activeNamedClosuresLookup
      },
      expected: 'Closed'
    }
  ]

  tests.forEach(test => {
    it(
      'should return ' +
        JSON.stringify(test.expected) +
        ' for args ' +
        JSON.stringify(test.args),
      () => {
        const result = timeLib.formatTimesStringForGivenDate(
          test.args.entity,
          test.args.dateStr,
          test.args.timeStr,
          test.args.namedClosuresLookup
        )

        expect(result).toEqual(test.expected)
      }
    )
  })
})

describe('formatTimesStringForGivenDate with a performance event', () => {
  const tests = [
    {
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.PERFORMANCE,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          performances: [],
          additionalPerformances: [],
          performancesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: activeNamedClosuresLookup
      },
      expected: 'No performances'
    },
    {
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.PERFORMANCE,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          performances: [
            { day: dateAfterTodayOneDayNumber, at: '15:00' },
            { day: dateAfterTodayOneDayNumber, at: '12:00' }
          ],
          additionalPerformances: [],
          performancesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: activeNamedClosuresLookup
      },
      expected: '12:00 pm, 3:00 pm'
    },
    {
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.PERFORMANCE,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          performances: [
            { day: dateAfterTodayOneDayNumber, at: '15:00' },
            { day: dateAfterTodayOneDayNumber, at: '12:00' }
          ],
          additionalPerformances: [
            { date: dateAfterTodayOne, at: '18:00' },
            { date: dateAfterTodayOneCopy, at: '17:00' }
          ],
          performancesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: activeNamedClosuresLookup
      },
      expected: '12:00 pm, 3:00 pm, 5:00 pm, 6:00 pm'
    },
    {
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.PERFORMANCE,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          performances: [
            { day: dateAfterTodayOneDayNumber, at: '15:00' },
            { day: dateAfterTodayOneDayNumber, at: '12:00' }
          ],
          additionalPerformances: [
            { date: dateAfterTodayOne, at: '18:00' },
            { date: dateAfterTodayOneCopy, at: '17:00' }
          ],
          performancesClosures: [
            { date: dateAfterTodayOne, at: '15:00' },
            { date: dateAfterTodayOneCopy, at: '12:00' }
          ]
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: activeNamedClosuresLookup
      },
      expected: '5:00 pm, 6:00 pm'
    },
    {
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.PERFORMANCE,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          performances: [
            { day: dateAfterTodayOneDayNumber, at: '15:00' },
            { day: dateAfterTodayOneDayNumber, at: '12:00' }
          ],
          additionalPerformances: [],
          performancesClosures: [{ date: dateAfterTodayOne }]
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: activeNamedClosuresLookup
      },
      expected: 'No performances'
    },
    {
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.PERFORMANCE,
          occurrenceType: occurrenceType.BOUNDED,
          dateFrom: today,
          dateTo: today,
          performances: [
            { day: dateAfterTodayOneDayNumber, at: '15:00' },
            { day: dateAfterTodayOneDayNumber, at: '12:00' }
          ],
          additionalPerformances: [
            { date: dateAfterTodayOne, at: '18:00' },
            { date: dateAfterTodayOneCopy, at: '17:00' }
          ],
          performancesClosures: [{ date: dateAfterTodayOne }]
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: activeNamedClosuresLookup
      },
      expected: null
    }
  ]

  tests.forEach(test => {
    it(
      'should return ' +
        JSON.stringify(test.expected) +
        ' for args ' +
        JSON.stringify(test.args),
      () => {
        const result = timeLib.formatTimesStringForGivenDate(
          test.args.entity,
          test.args.dateStr,
          test.args.timeStr,
          test.args.namedClosuresLookup
        )

        expect(result).toEqual(test.expected)
      }
    )
  })
})

describe('formatTimesStringForGivenDate with an exhibition event', () => {
  const tests = [
    {
      it: 'should return closed when venue is not used and there are no opening times',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: 'Closed'
    },
    {
      it: 'should return closed when venue is used and there are no opening times',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: true,
          venue: {
            openingTimes: [],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: 'Closed'
    },
    {
      it: 'should return event opening times when there are event opening times and they are used',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [
            { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
          ],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: '3:00 pm to 6:00 pm'
    },
    {
      it: 'should return closed when there are event opening times and they are used but they do not apply',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [
            { day: dateAfterTodayTwoDayNumber, from: '15:00', to: '18:00' }
          ],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: 'Closed'
    },
    {
      it: 'should include event opening override times',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [
            { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
          ],
          additionalOpeningTimes: [
            { date: dateAfterTodayOne, from: '19:00', to: '20:00' }
          ],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: '3:00 pm to 6:00 pm, 7:00 pm to 8:00 pm'
    },
    {
      it: 'should return closed when has event closure on the day',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [
            { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
          ],
          additionalOpeningTimes: [],
          openingTimesClosures: [{ date: dateAfterTodayOne }]
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: 'Closed'
    },
    {
      it: 'should include event opening time override when has override and venue times are to be used',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: true,
          venue: {
            openingTimes: [
              { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
            ],
            additionalOpeningTimes: [
              { date: dateAfterTodayOne, from: '19:00', to: '20:00' }
            ],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [
            { date: dateAfterTodayOne, from: '21:00', to: '22:00' }
          ],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: '3:00 pm to 6:00 pm, 7:00 pm to 8:00 pm, 9:00 pm to 10:00 pm'
    },
    {
      it: 'should include venue opening override times',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: true,
          venue: {
            openingTimes: [
              { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
            ],
            additionalOpeningTimes: [
              { date: dateAfterTodayOne, from: '19:00', to: '20:00' }
            ],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: '3:00 pm to 6:00 pm, 7:00 pm to 8:00 pm'
    },
    {
      it: 'should only use venue opening override times',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: true,
          venue: {
            openingTimes: [
              { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
            ],
            additionalOpeningTimes: [
              { date: dateAfterTodayOne, from: '19:00', to: '20:00' }
            ],
            openingTimesClosures: [
              { date: dateAfterTodayOne, from: '15:00', to: '18:00' }
            ],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: '7:00 pm to 8:00 pm'
    },
    {
      it: 'should return closed when venue opening times exist but is closed on day at event level',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: true,
          venue: {
            openingTimes: [
              { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
            ],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: [{ date: dateAfterTodayOne }]
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: 'Closed'
    },
    {
      it: 'should return closed when venue opening times exist but is closed on day at venue level',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: true,
          venue: {
            openingTimes: [
              { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
            ],
            additionalOpeningTimes: [],
            openingTimesClosures: [{ date: dateAfterTodayOne }],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: 'Closed'
    },
    {
      it: 'should return venue opening times',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: true,
          venue: {
            openingTimes: [
              { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
            ],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: '3:00 pm to 6:00 pm'
    },
    {
      it: 'should return closed when has venue opening times but has venue named closure on day',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.CONTINUOUS,
          dateFrom: null,
          dateTo: null,
          useVenueOpeningTimes: true,
          venue: {
            openingTimes: [
              { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
            ],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: ['Named1']
          },
          openingTimes: [],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: activeNamedClosuresLookup
      },
      expected: 'Closed'
    },
    {
      it: 'should return null when date is later than event date range',
      args: {
        entity: {
          entityType: entityType.EVENT,
          eventType: eventType.EXHIBITION,
          occurrenceType: occurrenceType.BOUNDED,
          dateFrom: today,
          dateTo: today,
          useVenueOpeningTimes: false,
          venue: {
            openingTimes: [],
            additionalOpeningTimes: [],
            openingTimesClosures: [],
            namedClosures: []
          },
          openingTimes: [
            { day: dateAfterTodayOneDayNumber, from: '15:00', to: '18:00' }
          ],
          additionalOpeningTimes: [],
          openingTimesClosures: []
        },
        dateStr: dateAfterTodayOne,
        timeStr: '14:00',
        namedClosuresLookup: emptyNamedClosuresLookup
      },
      expected: null
    }
  ]

  tests.forEach(test => {
    it(test.it, () => {
      const result = timeLib.formatTimesStringForGivenDate(
        test.args.entity,
        test.args.dateStr,
        test.args.timeStr,
        test.args.namedClosuresLookup
      )

      expect(result).toEqual(test.expected)
    })
  })
})

// describe('getEventTimesFormDisplayFlags', () => {
//   const tests = [
//     {
//       it: 'should handle a one-time performance',
//       args: {
//         eventType: 'Performance',
//         occurrenceType: 'OneTime',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/01/20'
//       },
//       expected: {
//         showPerformances: false,
//         showAdditionalPerformances: false,
//         showAdditionalPerformancesAsPerformances: true,
//         showSpecialPerformances: false,
//         showPerformancesClosures: false,
//         showTimesRanges: false
//       }
//     },

//     {
//       it: 'should handle a one-day performance',
//       args: {
//         eventType: 'Performance',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/01/20'
//       },
//       expected: {
//         showPerformances: false,
//         showAdditionalPerformances: false,
//         showAdditionalPerformancesAsPerformances: true,
//         showSpecialPerformances: true,
//         showPerformancesClosures: false,
//         showTimesRanges: false
//       }
//     },

//     {
//       it: 'should handle a four-day performance',
//       args: {
//         eventType: 'Performance',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/01/23'
//       },
//       expected: {
//         showPerformances: false,
//         showAdditionalPerformances: false,
//         showAdditionalPerformancesAsPerformances: true,
//         showSpecialPerformances: true,
//         showPerformancesClosures: true,
//         showTimesRanges: false
//       }
//     },

//     {
//       it: 'should handle a four-week performance',
//       args: {
//         eventType: 'Performance',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/02/16'
//       },
//       expected: {
//         showPerformances: true,
//         showAdditionalPerformances: true,
//         showAdditionalPerformancesAsPerformances: false,
//         showSpecialPerformances: true,
//         showPerformancesClosures: true,
//         showTimesRanges: true
//       }
//     },

//     {
//       it: 'should handle a continuous performance',
//       args: {
//         eventType: 'Performance',
//         occurrenceType: 'Continuous'
//       },
//       expected: {
//         showPerformances: true,
//         showAdditionalPerformances: true,
//         showAdditionalPerformancesAsPerformances: false,
//         showSpecialPerformances: true,
//         showPerformancesClosures: true,
//         showTimesRanges: false
//       }
//     },

//     {
//       it: 'should handle a one-day exhibition for a venue with no opening times',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/01/20',
//         venue: VENUE_WITHOUT_OPENING_TIMES
//       },
//       expected: {
//         showUseVenueTimesOption: false,
//         showOpeningTimes: false,
//         showAdditionalOpeningTimes: false,
//         showAdditionalOpeningTimesAsOpeningTimes: true,
//         showSpecialOpeningTimes: false,
//         showOpeningTimesClosures: false,
//         showTimesRanges: false
//       }
//     },
//     {
//       it: 'should handle a one-day exhibition for a venue with opening times that are used',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/01/20',
//         venue: VENUE_WITH_OPENING_TIMES,
//         useVenueOpeningTimes: true
//       },
//       expected: {
//         showUseVenueTimesOption: true,
//         showOpeningTimes: false,
//         showAdditionalOpeningTimes: false,
//         showAdditionalOpeningTimesAsOpeningTimes: false,
//         showSpecialOpeningTimes: false,
//         showOpeningTimesClosures: false,
//         showTimesRanges: false
//       }
//     },
//     {
//       it: 'should handle a one-day exhibition for a venue with opening times that are not used',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/01/20',
//         venue: VENUE_WITH_OPENING_TIMES,
//         useVenueOpeningTimes: false
//       },
//       expected: {
//         showUseVenueTimesOption: true,
//         showOpeningTimes: false,
//         showAdditionalOpeningTimes: false,
//         showAdditionalOpeningTimesAsOpeningTimes: true,
//         showSpecialOpeningTimes: false,
//         showOpeningTimesClosures: false,
//         showTimesRanges: false
//       }
//     },

//     {
//       it: 'should handle a four-day exhibition for a venue with no opening times',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/01/23',
//         venue: VENUE_WITHOUT_OPENING_TIMES
//       },
//       expected: {
//         showUseVenueTimesOption: false,
//         showOpeningTimes: false,
//         showAdditionalOpeningTimes: false,
//         showAdditionalOpeningTimesAsOpeningTimes: true,
//         showSpecialOpeningTimes: true,
//         showOpeningTimesClosures: true,
//         showTimesRanges: false
//       }
//     },
//     {
//       it: 'should handle a four-day exhibition for a venue with opening times that are used',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/01/23',
//         venue: VENUE_WITH_OPENING_TIMES,
//         useVenueOpeningTimes: true
//       },
//       expected: {
//         showUseVenueTimesOption: true,
//         showOpeningTimes: false,
//         showAdditionalOpeningTimes: true,
//         showAdditionalOpeningTimesAsOpeningTimes: false,
//         showSpecialOpeningTimes: true,
//         showOpeningTimesClosures: true,
//         showTimesRanges: false
//       }
//     },
//     {
//       it: 'should handle a four-day exhibition for a venue with opening times that are not used',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/01/23',
//         venue: VENUE_WITH_OPENING_TIMES,
//         useVenueOpeningTimes: false
//       },
//       expected: {
//         showUseVenueTimesOption: true,
//         showOpeningTimes: false,
//         showAdditionalOpeningTimes: false,
//         showAdditionalOpeningTimesAsOpeningTimes: true,
//         showSpecialOpeningTimes: true,
//         showOpeningTimesClosures: true,
//         showTimesRanges: false
//       }
//     },

//     {
//       it: 'should handle a four-week exhibition for a venue with no opening times',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/02/16',
//         venue: VENUE_WITHOUT_OPENING_TIMES
//       },
//       expected: {
//         showUseVenueTimesOption: false,
//         showOpeningTimes: true,
//         showAdditionalOpeningTimes: true,
//         showAdditionalOpeningTimesAsOpeningTimes: false,
//         showSpecialOpeningTimes: true,
//         showOpeningTimesClosures: true,
//         showTimesRanges: true
//       }
//     },
//     {
//       it: 'should handle a four-week exhibition for a venue with opening times that are used',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/02/16',
//         venue: VENUE_WITH_OPENING_TIMES,
//         useVenueOpeningTimes: true
//       },
//       expected: {
//         showUseVenueTimesOption: true,
//         showOpeningTimes: false,
//         showAdditionalOpeningTimes: true,
//         showAdditionalOpeningTimesAsOpeningTimes: false,
//         showSpecialOpeningTimes: true,
//         showOpeningTimesClosures: true,
//         showTimesRanges: false
//       }
//     },
//     {
//       it: 'should handle a four-week exhibition for a venue with opening times that are not used',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Bounded',
//         dateFrom: '2017/01/20',
//         dateTo: '2017/02/16',
//         venue: VENUE_WITH_OPENING_TIMES,
//         useVenueOpeningTimes: false
//       },
//       expected: {
//         showUseVenueTimesOption: true,
//         showOpeningTimes: true,
//         showAdditionalOpeningTimes: true,
//         showAdditionalOpeningTimesAsOpeningTimes: false,
//         showSpecialOpeningTimes: true,
//         showOpeningTimesClosures: true,
//         showTimesRanges: true
//       }
//     },

//     {
//       it: 'should handle a continuous exhibition for a venue with no opening times',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Continuous',
//         venue: VENUE_WITHOUT_OPENING_TIMES
//       },
//       expected: {
//         showUseVenueTimesOption: false,
//         showOpeningTimes: true,
//         showAdditionalOpeningTimes: true,
//         showAdditionalOpeningTimesAsOpeningTimes: false,
//         showSpecialOpeningTimes: true,
//         showOpeningTimesClosures: true,
//         showTimesRanges: false
//       }
//     },
//     {
//       it: 'should handle a continuous exhibition for a venue with opening times that are used',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Continuous',
//         venue: VENUE_WITH_OPENING_TIMES,
//         useVenueOpeningTimes: true
//       },
//       expected: {
//         showUseVenueTimesOption: true,
//         showOpeningTimes: false,
//         showAdditionalOpeningTimes: true,
//         showAdditionalOpeningTimesAsOpeningTimes: false,
//         showSpecialOpeningTimes: true,
//         showOpeningTimesClosures: true,
//         showTimesRanges: false
//       }
//     },
//     {
//       it: 'should handle a continuous exhibition for a venue with opening times that are not used',
//       args: {
//         eventType: 'Exhibition',
//         occurrenceType: 'Continuous',
//         venue: VENUE_WITH_OPENING_TIMES,
//         useVenueOpeningTimes: false
//       },
//       expected: {
//         showUseVenueTimesOption: true,
//         showOpeningTimes: true,
//         showAdditionalOpeningTimes: true,
//         showAdditionalOpeningTimesAsOpeningTimes: false,
//         showSpecialOpeningTimes: true,
//         showOpeningTimesClosures: true,
//         showTimesRanges: false
//       }
//     }
//   ]

//   tests.map(test => {
//     it(test.it, () => {
//       const actual = timeLib.getEventTimesFormDisplayFlags(
//         test.args.eventType,
//         test.args.occurrenceType,
//         test.args.dateFrom,
//         test.args.dateTo,
//         test.args.venue,
//         test.args.useVenueOpeningTimes
//       )

//       expect(actual).toEqual(test.expected)
//     })
//   })
// })