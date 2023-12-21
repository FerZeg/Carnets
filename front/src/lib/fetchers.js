const URL = import.meta.env.API_URL

export const fetchCarnets = async () => {
    try {
        const response = await fetch(`${URL}/carnet`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        if(response.ok) {
            const data = await response.json()
            return data
        }
    } catch(e) {
        return null
    }
}
export const fetchUserData = async () => {
    try {
        if(!localStorage.getItem("jwt")) return null
        const response = await fetch(`${URL}/auth/data`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
        })
        if(response.ok) {
        const data = await response.json()
        return data
        }
    } catch(e) {
        return null
    }
}
export const fetchStreamers = async () => {
    try {
        const response = await fetch(`${URL}/streamer`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if(response.ok) {
            const data = await response.json()
            return data
        }
    } catch(e) {
        return null
    }
}

export const fetchCarnet = async (channelname) => {
    try {
        const response = await fetch(`${URL}/carnet/${channelname}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            } 
        })
        if(response.ok) {
            const data = await response.json()
            return data
        }
        if(response.status === 400) return false
        if(response.status === 404) return null
    } catch(e) {
        return null
    }
}

export const createCarnet = async (channelname) => {
    const response = await fetch(`${URL}/carnet/${channelname}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
    return response

}

export const fetchRanking = async (channelname) => {
    try {
        const response = await fetch(`${URL}/ranking/${channelname}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        if(response.ok) {
            const data = await response.json()
            return data
        }
    } catch(e) {
        return null
    }
}

export const fetchStreamer = async (channelname) => {
    try {
        const response = await fetch(`${URL}/streamer/${channelname}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        if(response.ok) {
            const data = await response.json()
            return data
        }
    } catch(e) {
        return null
    }
}
