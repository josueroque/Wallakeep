import React from 'react';
import { shallow } from 'enzyme';
import Detail from './Detail';

describe.skip('Detail', () => {
  const defaultProps = {
       location: {
        pathname: "/detail/5db1de95f108b11d002b9e03",
        state: { adId: "5db1de95f108b11d002b9e03"} 
   }
};
  
  const render = props => shallow(<Detail {...defaultProps} {...props} />);
  let wrapper;

  beforeEach(() => {
    wrapper = render();
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

//console.log(defaultProps);
  it.skip('should render the product detail', () => {
    expect(wrapper.find('.state').props().items).toHaveLength(0);
  });

});
