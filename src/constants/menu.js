const ENTITIES_MENU = {
  label: 'Entities',
  items: [
    {
      label: 'Add Event',
      path: '/event',
      match: /^\/event$/i
    },
    {
      label: 'Add Event Series',
      path: '/event-series',
      match: /^\/event-series$/i
    },
    {
      label: 'Add Talent',
      path: '/talent',
      match: /^\/talent$/i
    },
    {
      label: 'Add Venue',
      path: '/venue',
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
      match: /^\/tags\/medium$/i
    },
    {
      label: 'Style Tags',
      path: '/tags/style',
      match: /^\/tags\/style$/i
    },
    {
      label: 'Audience Tags',
      path: '/tags/audience',
      match: /^\/tags\/audience$/i
    },
    {
      label: 'Geo Tags',
      path: '/tags/geo',
      match: /^\/tags\/geo$/i
    }
  ]
}

export const MENUS = [ENTITIES_MENU, TAGS_MENU]
