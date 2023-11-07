import { Router } from "express"
import Streamer from "../../Models/StreamerModel.js"
import RankingModel from "../../Models/RankingModel.js"
const router = Router()
router.get("/:channelname", async (req, res, next) => {
    try {
    const channelname = req.params.channelname
    const { offset, limit } = req.query
    const channel = await Streamer.getStreamerByName(channelname)
    console.log(channel)
    if(!channel) return res.status(404).send("No existe ese canal")
    const ranking = await RankingModel.getStreamerRanking(channel, offset, limit)
    return res.status(200).json(ranking)
    } catch (err) {
        next(err)
    }
}
)

export default router