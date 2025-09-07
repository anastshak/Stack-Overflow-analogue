import React from 'react';
import { Control, Controller, ControllerRenderProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { Form } from 'antd';

interface ControlledFormItemProps<T extends FieldValues> {
  label?: string;
  error?: FieldError;
  name: Path<T>;
  control: Control<T>;
  render: (field: ControllerRenderProps<T, Path<T>>) => React.ReactElement;
}

export const ControlledFormItem = <T extends FieldValues>({
  label,
  error,
  name,
  control,
  render,
}: ControlledFormItemProps<T>) => {
  return (
    <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error?.message}>
      <Controller name={name} control={control} render={({ field }) => render(field)} />
    </Form.Item>
  );
};
