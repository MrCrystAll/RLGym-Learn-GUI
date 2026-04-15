export const validationMessages = {
  required: "The value is required",
  min: (min: number) => `The value should be ${min} or above`,
  max: (max: number) => `The value should be ${max} or below`,
};

export const createRules = ({ required, min, max }: {required: boolean, min?: number | undefined, max?: number | undefined}) => ({
    ...(required && {
        required: validationMessages.required,
    }),
    ...(min !== undefined && {
        min: {
        value: min,
        message: validationMessages.min(min),
        },
    }),
    ...(max !== undefined && {
        max: {
        value: max,
        message: validationMessages.max(max),
        },
    }),
});