const ENTITIES_MENU = {
  label: 'Entities',
  items: [
    {
      label: 'Add Event',
      path: '/event',
      value: '/event',
      match: /^\/event$/i
    },
    {
      label: 'Add Event Series',
      path: '/event-series',
      value: '/event-series',
      match: /^\/event-series$/i
    },
    {
      label: 'Add Talent',
      path: '/talent',
      value: '/talent',
      match: /^\/talent$/i
    },
    {
      label: 'Add Venue',
      path: '/venue',
      value: '/venue',
      match: /^\/venue$/i
    }
  ]
}

const TAGS_MENU = {
  label: 'Tags',
  items: [
    {
      label: 'Medium Tags',
      path: '/tags/medium',
      value: '/tags/medium',
      match: /^\/tags\/medium$/i
    },
    {
      label: 'Style Tags',
      path: '/tags/style',
      value: '/tags/style',
      match: /^\/tags\/style$/i
    },
    {
      label: 'Audience Tags',
      path: '/tags/audience',
      value: '/tags/audience',
      match: /^\/tags\/audience$/i
    },
    {
      label: 'Geo Tags',
      path: '/tags/geo',
      value: '/tags/geo',
      match: /^\/tags\/geo$/i
    }
  ]
}

export const MENUS = [ENTITIES_MENU, TAGS_MENU]
