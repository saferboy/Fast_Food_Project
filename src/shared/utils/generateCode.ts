export const differenceBetweenDates = (start: Date, end: Date) => {
    return (end.getTime() - start.getTime())
}

export const getTimeOut = (time: Date, timeOutSeconds: number) => {
    const timeMills = differenceBetweenDates(time, new Date())
    return Math.round(timeOutSeconds - timeMills / 1000)
}

export const generateCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}