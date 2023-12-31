const URL = import.meta.env.VITE_API_URL

export const changeToStreamer = async () => {
    try {
        return await fetch(`${URL}/streamer/upgrade`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            } 
        })
    } catch(e) {
        return null
    }
}

export const deleteAccount = async () => {
    try {
        return await fetch(`${URL}/user`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            } 
        })
    } catch(e) {
        return null
    }
}