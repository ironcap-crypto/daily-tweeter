const Twitter = require("twitter");

(async () => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  const fetch = require("node-fetch");
  const cgRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=taodao"
  );
  const json = await cgRes.json();
  const price = json[0].current_price;

  const res = client.post(
    "statuses/update",
    {
      status: `Tweeting till $TAO crosses $500 - @taodao_finance\n1 $TAO = ${price} $USD\nsource: @coingecko`,
    },
    function (error, tweet, response) {
      if (!error) {
        console.log(tweet);
      }
    }
  );
})();
