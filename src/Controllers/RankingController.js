import { NotFoundError } from "../Errors.js"
import RankingModel from "../Models/RankingModel.js"
import Streamer from "../Models/StreamerModel.js"
import { extractCarnetsFromStreamer } from "../Services/carnet.js"

/**
 * Get the ranking of a specific streamer by channel name
 * @throws {NotFoundError} If the streamer is not found
 * @returns {Object} Returns the ranking of the streamer
 */
export const getRanking = async (req, res, next) =>{
	try {
		const channelname = req.params.channelname
		const { offset, limit } = req.query
		const channel = await Streamer.getStreamerByName(channelname)
		if(!channel) throw new NotFoundError("Streamer not found")
		const ranking = await RankingModel.getStreamerRanking(channel, offset, limit)
		return res.status(200).json({channel, ranking: await extractCarnetsFromStreamer(ranking)})
	} catch (err) {
		next(err)
	}
}