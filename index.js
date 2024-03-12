const axios = require('axios');
const fs = require('fs');

// B站用户的UID
const uid = '3494358552676710';
const roomId = 32103598

async function getFollowerAndGuardCount() {
    try {
        // 发送HTTP GET请求获取用户信息
        const response = await axios.get(`https://api.bilibili.com/x/relation/stat?vmid=${uid}`);
        const followerData = response.data.data;
        const followerCount = followerData.follower;

        // 输出粉丝数
        console.log(`当前粉丝数：${followerCount}`);

        // 保存记录到文件
        const timestamp = new Date().toISOString();
        const record = {
            timestamp: timestamp,
            followerCount: followerCount,
        };
        const recordString = JSON.stringify(record) + '\n';
        fs.appendFileSync('follower_records.txt', recordString);
    } catch (error) {
        console.error('获取粉丝数和舰长数量失败：', error);
    }
}

getFollowerAndGuardCount();
