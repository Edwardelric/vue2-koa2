const router = require('koa-router')()

let discover = require("../models/discover");

router.get('/', async (ctx, next) => {
  let content = "";
  // let a = await discover({"username":"ed1", "email":"88@qq.com", "pwd": "666"});
  // await a.save();
  await discover.find(function(err, doc) {
    content = doc;
	  console.log(doc);
  });
  await ctx.render('index', {
		title: "Hello Koa 2!",
		contentTxt: "this is koa2 web",
    content: content
	})
})

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
