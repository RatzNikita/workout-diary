export function getTime() {
    const today = new Date();
    return `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`
}