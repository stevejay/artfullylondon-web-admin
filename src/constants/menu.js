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

const SITE_INFO_MENU = {
  label: 'Site Info',
  items: [
    {
      label: 'About',
      path: '/about',
      match: /^\/about$/i
    },
    {
      label: 'Privacy & Cookies',
      path: '/privacy',
      match: /^\/privacy$/i
    },
    {
      label: 'Terms Of Service',
      path: '/terms',
      match: /^\/terms$/i
    }
  ]
}

export const LOGGED_OUT_MENUS = [SITE_INFO_MENU]
export const LOGGED_IN_MENUS = [ENTITIES_MENU, TAGS_MENU, SITE_INFO_MENU]
