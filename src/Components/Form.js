import React, { useState, useCallback, createContext } from 'react';

// Creamos un contexto para el formulario
export const formContext = createContext();
export const { Provider: FormProvider, Consumer: FormConsumer } = formContext;

// Hoc para conectar cualquier componente con el contexto del formulario
// Se puede conectar tambien con useContext(formContext)
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
  validate = () => null,
  onSubmit = () => {},
  onError = () => {},
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
