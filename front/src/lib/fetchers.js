export const fetchCarnets = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/carnet`, {
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
    return null
}
export const fetchUserData = async () => {
    try {
    if(!localStorage.getItem("jwt")) return null
    const response = await fetch(`http://localhost:3000/api/auth/data`, {
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
    return null
}
export const fetchStreamers = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/streamer`, {
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
    return null
}

export const fetchCarnet = async (channelname) => {
    try {
        const response = await fetch(`http://localhost:3000/api/carnet/${channelname}`, {
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
        return false
    }
    return false
}

export const createCarnet = async (channelname) => {
}
