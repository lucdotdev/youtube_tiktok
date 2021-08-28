const TikTokScraper = require("tiktok-scraper");

const { sid_tt } = require("./constant");

async function getTikByUserName(number, name) {
  try {
    const posts = await TikTokScraper.user(name, {
      number: number,
      sessionList: sid_tt,
    });

    return posts;
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// User feed by user id
// Some TikTok user id's are larger then MAX_SAFE_INTEGER, you need to pass user id as a string
async function getTikByUserId(number, id) {
  try {
    const posts = await TikTokScraper.user(`${id}`, {
      number: number,
      by_user_id: true,
      sessionList: sid_tt,
    });
    return posts;
  } catch (error) {
    throw error;
  }
}

// Trending feed
async function getTikByTrending(number, name) {
  try {
    const posts = await TikTokScraper.trend(name, {
      number: number,
      sessionList: sid_tt,
    });
    return posts;
  } catch (error) {
    throw error;
  }
}

// Hashtag feed
async function getTikByHashTag(number, name) {
  try {
    const posts = await TikTokScraper.hashtag(name, {
      number: number,
      sessionList: sid_tt,
    });
    return posts;
  } catch (error) {
    throw error;
  }
}

// Get single user profile information: Number of followers and etc
// input - USERNAME
// options - not required
async function getTikProfile(name) {
  try {
    const user = await TikTokScraper.getUserProfileInfo(name, options);
    return user;
  } catch (error) {
    throw error;
  }
}

// Get single hashtag information: Number of views and etc
// input - HASHTAG NAME
// options - not required
async function getTikHashTag(name) {
  try {
    const hashtag = await TikTokScraper.getHashtagInfo(name, options);
    console.log(hashtag);
  } catch (error) {
    throw error;
  }
}

// Get single video metadata
// input - WEB_VIDEO_URL
// For example: https://www.tiktok.com/@tiktok/video/6807491984882765062
// options - not required
async function getTikVideo(url) {
  try {
    const videoMeta = await TikTokScraper.getVideoMeta(url, options);
    return videoMeta;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getTikByHashTag,
  getTikByUserId,
  getTikByUserName,
  getTikByTrending,
  getTikHashTag,
  getTikProfile,
  getTikVideo,
};
