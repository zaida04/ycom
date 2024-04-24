export const IsProd = process.env.NODE_ENV === 'production';
export const IsDev = !IsProd;

export const dbUrl = process.env.DB_URL!;
export const wsApiUrl = process.env.WS_API_URL!;
export const wsPublicUrl = process.env.WS_PUBLIC_URL!;
export const apiUrl = process.env.API_URL!;