import React, { useCallback } from 'react';
import { withFormContext } from './Form';

function Input({
        component: Component = 'input',
        handleChange: formHandleChange, 
        value: formValue,
         ...props
  })
   {
     
  const  name = props.name;
 
  const valueKey = useCallback(
    ({ checked, value }) => ( value)
  
  );

  const handleChange = useCallback(
    ({ target }) => {
      formHandleChange({ [name]: valueKey(target) });
    },
    [formHandleChange, valueKey, name],
  );

  const inputProps = {
    onChange: handleChange,
    valueKey: formValue[name],
  };

  return <Component {...props} {...inputProps} />;
}


export default withFormContext(Input);