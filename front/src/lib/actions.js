const URL = "http://localhost:3000/api"

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