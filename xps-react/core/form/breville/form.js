import React, { useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function Form({ defaultValues, children, onSubmit, formName, callback }) {
  const methods = useForm({ defaultValues, mode: 'onChange', shouldUnregister: true });

  const { isValid, isDirty } = methods ? methods.formState : {}

  useEffect(() => {
    if (callback) {
      callback(isValid, isDirty);
    }
  }, [isValid, isDirty]);

  return (
    <FormProvider {...methods}>
      <form name={formName} onSubmit={methods.handleSubmit(onSubmit)}>
        {Array.isArray(children)
          ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  key: child.props.name
                }
              })
              : child;
          })
          : children}
      </form>
    </FormProvider>
  );
}

export function getWatch() {
  const methods =  useFormContext();
  const watch = methods ? methods.watch : () => { };
  return watch;
}
