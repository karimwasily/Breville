import React from "react";
// import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { addPropertyControls, ControlType } from "framer"


export default function Form({ defaultValues, children, onSubmit, formName }) {
  // const methods = useForm({ defaultValues, mode: 'onChange' });

  return (
    <>
    Form
    </>
    // <FormProvider {...methods}>
    //   <form name={formName} onSubmit={methods.handleSubmit(onSubmit)}>
    //     {Array.isArray(children)
    //       ? children.map((child) => {
    //         return child.props.name
    //           ? React.createElement(child.type, {
    //             ...{
    //               ...child.props,
    //               key: child.props.name
    //             }
    //           })
    //           : child;
    //       })
    //       : children}
    //   </form>
    // </FormProvider>
  );
}

// export function getWatch() {
//   const methods =  useFormContext();
//   const watch = methods ? methods.watch : () => { };
//   return watch;
// }

Form.defaultProps = {
  // text: "Tap",
}

addPropertyControls(Form, {
  // text: {
  //     title: "Text",
  //     type: ControlType.String,
  // },
})