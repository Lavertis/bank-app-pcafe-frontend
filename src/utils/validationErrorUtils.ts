export function getErrorsWithFirstMessages(errors: {}) {
    const result = {};
    if (!errors) return result;

    Object.keys(errors).forEach(key => {
        const keyFirstLower = key.charAt(0).toLowerCase() + key.slice(1);
        if (Array.isArray(errors[key as keyof typeof errors])) {
            result[keyFirstLower as keyof typeof errors] = errors[key as keyof typeof errors][0];
        } else {
            result[keyFirstLower as keyof typeof errors] = errors[key as keyof typeof errors];
        }
    });
    return result;
}