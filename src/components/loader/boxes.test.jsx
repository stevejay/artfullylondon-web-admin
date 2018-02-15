import React from 'react'

import BoxesLoader from '_src/components/loader/boxes'

it('should render a default loader correctly', () => {
  const wrapper = shallow(<BoxesLoader immediate />)
  expect(wrapper).toMatchSnapshot()
})

it('should not update when props and state are the same', () => {
  const wrapper = shallow(<BoxesLoader />)

  const result = wrapper
    .instance()
    .shouldComponentUpdate(null, { visible: false })

  expect(result).toEqual(false)
})
