import { NotFoundError } from "../Errors.js"
import RankingModel from "../Models/RankingModel.js"
import Streamer from "../Models/StreamerModel.js"

export const getRanking = async (req, res, next) =>{
	try {
		const channelname = req.params.channelname
		const { offset, limit } = req.query
		const channel = await Streamer.getStreamerByName(channelname)
		if(!channel) throw new NotFoundError("Streamer not found")
		const ranking = await RankingModel.getStreamerRanking(channel, offset, limit)
		return res.status(200).json(ranking)
	} catch (err) {
		next(err)
	}
}