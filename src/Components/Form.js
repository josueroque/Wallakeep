import React, {createContext, useState, useCallback  } from 'react';
export const formContext = createContext();
export const { Provider: FormProvider, Consumer: FormConsumer } = formContext;


export default function Form({
  initialValues = {},
  onSubmit = () => {},
  children,
  ...props
}) {
  const [value, setValue] = useState(initialValues);

  const handleChange = useCallback(change => {
    setValue(previousValue => ({
      ...previousValue,
      ...change,
    }));
  }, []);

  const actionSubmit = useCallback(
    event => {
      event.preventDefault();
      onSubmit(value);
    },
    [ onSubmit, value],
  );

  return (
    <form {...props} onSubmit={actionSubmit}>
      <FormProvider value={{ value, handleChange }}>{children}</FormProvider>
    </form>
  );
}


export function withFormContext(WrappedComponent) {
  return function(props) {
    return (
      <FormConsumer>
        {value => <WrappedComponent {...props} {...value} />}
      </FormConsumer>
    );
  };
}

