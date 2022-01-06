export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


export const dateFormatter = (dateStr: string) => new Date(dateStr).toLocaleString()