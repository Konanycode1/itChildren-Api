export const inProduction = process.env.NODE_ENV === "Production";
export const apiURL = inProduction?'':"http://localhost:3000/"