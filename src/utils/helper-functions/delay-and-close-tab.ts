export default async function delayAndCloseTab(timeInMilliseconds = 3000) {
    setTimeout(() => {
        window.close()
    }, timeInMilliseconds)
}
