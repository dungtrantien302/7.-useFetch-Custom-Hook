import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState()

    useEffect(() => {
        setData(undefined);
        setIsLoading(true);
        setIsError(false);
        const controller = new AbortController()
        fetch(url, { signal: controller.signal })
            .then(res => {
                if (res.status === 200) {
                    return res = res.json()
                } else {
                    return Promise.reject(res)
                }
            })
            .then(data => {
                setData(data)
            })
            .catch(error => {
                if (error.name === "AbortError")
                    return
                setIsError(true)
            })
            .finally(() => {
                if (controller.signal.aborted)
                    return
                setIsLoading(false)
            })
        return () => {
            controller.abort()
        }
    }, [url])

    return { data, isLoading, isError }
}