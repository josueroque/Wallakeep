import React, { useState, useCallback, createContext } from 'react';
export const formContext = createContext();
export const { Provider: FormProvider, Consumer: FormConsumer } = formContext;

export function withFormContext(WrappedComponent) {
  return function(props) {
    return (
      <FormConsumer>
        {value => <WrappedComponent {...props} {...value} />}
      </FormConsumer>
    );
  };
}

export default function Form({
  initialValues = {},
  onSubmit = () => {},
  children,
  ...props
}) {
  const [value, setValue] = useState(initialValues);

  const handleChange = useCallback(change => {
    setValue(prevValue => ({
      ...prevValue,
      ...change,
    }));
  }, []);

  // const handleChange = change => {
  //   setValue(prevValue => ({...prevValue,...change}));
  // }

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      console.log(value);
      onSubmit(value);
    },
    [ onSubmit, value],
  );

  return (
    <form {...props} onSubmit={handleSubmit}>
      <FormProvider value={{ value, handleChange }}>{children}</FormProvider>
    </form>
  );
}
