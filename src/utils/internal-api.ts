export const getConfig = () => {
    return fetch("./config.json")
        .then((response) => response.json())
        .then(data => data)
    }
