import React from "react";
import { ComponentProps } from "react";
import { Form, FormControlProps, InputGroup } from "react-bootstrap";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputFieldProps {
    register: UseFormRegisterReturn;
    label?: string;
    error?: FieldError;
    inputGroupElement?: React.ReactNode
}
export default function FormInputField({register, label, error, inputGroupElement, ...props}: FormInputFieldProps & FormControlProps & ComponentProps<"input">){
    return(
        <div>
          <Form.Group className="mb-3" controlId={register.name +"-input"}>
            { label && <Form.Label>{label}</Form.Label>}
            <InputGroup hasValidation>
            <Form.Control 
            {...register}
            {...props}
            isInvalid={!!error}
            placeholder={"Enter "+label} 
            aria-describedby={
              inputGroupElement && React.isValidElement<{ id: string }>(inputGroupElement)
                ? inputGroupElement.props.id
                : undefined
            }
            

            /> 
            {inputGroupElement}
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </div>
    );

}