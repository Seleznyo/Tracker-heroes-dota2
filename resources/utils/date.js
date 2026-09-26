export function formatMonth(month) {
    let date = new Date(month * 1000);
    return date.toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric'
    })
}

