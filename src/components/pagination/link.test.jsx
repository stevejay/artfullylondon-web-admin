import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import PaginationLink from '_src/components/pagination/link'

it('should render correctly when is not current page', () => {
  const wrapper = shallow(
    <PaginationLink
      pageNumber={2}
      currentPageNumber={1}
      totalPages={10}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is current page', () => {
  const wrapper = shallow(
    <PaginationLink
      pageNumber={2}
      currentPageNumber={2}
      totalPages={10}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when should be a go to first page link', () => {
  const wrapper = shallow(
    <PaginationLink
      pageNumber={1}
      currentPageNumber={8}
      totalPages={10}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when should be a go to last page link', () => {
  const wrapper = shallow(
    <PaginationLink
      pageNumber={10}
      currentPageNumber={2}
      totalPages={10}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle being clicked on when it is a link', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(
    <PaginationLink
      pageNumber={2}
      currentPageNumber={1}
      totalPages={10}
      onClick={handleClick}
    />
  )

  wrapper.find('button').simulate('click')

  expect(handleClick).toHaveBeenCalledWith(2)
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const wrapper = shallow(
      <PaginationLink
        pageNumber={2}
        currentPageNumber={1}
        totalPages={10}
        onClick={_.noop}
      />
    )

    const result = wrapper
      .instance()
      .shouldComponentUpdate({ currentPageNumber: 1 })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <PaginationLink
        pageNumber={2}
        currentPageNumber={1}
        totalPages={10}
        onClick={_.noop}
      />
    )

    const result = wrapper
      .instance()
      .shouldComponentUpdate({ currentPageNumber: 2 })

    expect(result).toEqual(true)
  })
})
