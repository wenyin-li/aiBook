const SteamRequest = (data) => {
	return new Promise((resolve, reject) => {
		const response = uni.request({
			url: 'https://api.firedigit.cn/usersNovel/generateNovelStream',
			method: "POST",
			data: {
				"toolId": 2,
						"setting": "重生",
						"author": "张三",
						"leader": "张楚生",
						"blurb": "被冤枉，本以为要孤独终老，却出了车祸，一朝重生，俆明薇回到八零年代。这一世她要看清了身边所有对自己好的人，养父养母，弟弟，还有那个喜欢了她一辈子的男人。她会好好过这一世，好好爱那个男人，也让弟弟有出人头地的机会"
			},
			header: {
				"Accept": "text/event-stream",
				"Content-Type": "application/json;charset=UTF-8;",
				"Connection": "keep-alive",
				"token": uni.getStorageSync('token'),
				"Accept": "text/event-stream",
				// "forKey": "Accept"
			},
			
			responseType: "text",
			enableChunked: true,
			
			success: (res) => {
				resolve(res)
			},
			fail: (res) => {
				reject(res)
			},
			
		})
		resolve(response)
	})
}