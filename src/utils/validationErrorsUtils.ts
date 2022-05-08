export function getErrorsWithFirstMessages(errors: {}) {
    const result = {};
    if (!errors) return result;

    Object.keys(errors).forEach(key => {
        if (Array.isArray(errors[key as keyof typeof errors])) {
            result[key as keyof typeof errors] = errors[key as keyof typeof errors][0];
        } else {
            result[key as keyof typeof errors] = errors[key as keyof typeof errors];
        }
    });
    return result;
}