import StreamerModel from "../Models/StreamerModel.js"
import { getRedemptions } from "../Services/twitchapi.js"

export async function updatePoints() {
	const streamers = await StreamerModel.getStreamersWithRewards()
	for(const streamer of streamers) {
		for(const rewardKey in streamer.rewards) {
			const reward = streamer.rewards[rewardKey]
			getRedemptions(streamer, reward)
		}
	}
}
