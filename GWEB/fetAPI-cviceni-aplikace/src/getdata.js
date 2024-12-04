const fetchData = async (url, options) => {
    try {
        const response = await fetch(url, options)
        const json = await response.json()
        const result = await json.features

        return result

    }
    catch (error) {
        console.log(error)
    }
}