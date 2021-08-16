import redisConnect from './redisConnect'

const getOrSetCache = (key, cb) => {
	return new Promise((resolve, reject) => {
		const redisClient = redisConnect()
		redisClient.get(key, async (error, data) => {
			if(error) return reject(error)
			if(data != null) return resolve(JSON.parse(data))
			const freshData = await cb()
			redisClient.setex(key, Number(process.env.REDIS_DEFAULT_EXPIRATION), JSON.stringify(freshData))
			resolve(freshData)
		})
	})
}
export default getOrSetCache