const URL = "http://localhost:3000/api"

export const changeToStreamer = async () => {
    try {
        const response = await fetch(`${URL}/streamer/upgrade`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            } 
        })
        return response.ok
    } catch(e) {
        return null
    }
}