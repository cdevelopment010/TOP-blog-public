const GA_ID = 'G-CTM498KLKH'

type AnalyticsWindow = Window & {
    dataLayer: IArguments[]
    gtag: (...args: unknown[]) => void
}

let analyticsLoaded = false

export const enableAnalytics = () => {
    if (analyticsLoaded) {
        return
    }

    analyticsLoaded = true

    const analyticsWindow = window as unknown as AnalyticsWindow

    analyticsWindow.dataLayer = analyticsWindow.dataLayer || []

    analyticsWindow.gtag = function (..._args: unknown[]) {
        analyticsWindow.dataLayer.push(arguments)
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`

    script.onload = () => {
        analyticsWindow.gtag('js', new Date())
        analyticsWindow.gtag('config', GA_ID)
    }

    document.head.appendChild(script)
}