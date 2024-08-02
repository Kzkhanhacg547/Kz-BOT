const router = require("express").Router();
const { readdirSync, readFileSync } = require('fs-extra');
const path = require('path');
try {
  
  var i, j, n = 0;
  const srcPath = path.join(__dirname, "/public/");
  const hosting = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
  for (i of hosting) {
    const { index, name } = require(srcPath + i);
    router.get(name, index);
    n++
    console.log(i);
  }


  const srcPathPost = path.join(__dirname, "/post/");
  const hostingPost = readdirSync(srcPathPost).filter((file) => file.endsWith(".js"));
  for (j of hostingPost) {
    const { index, name } = require(srcPathPost + j);
    router.post(name, index);
    n++
    console.log('post/' + j);
  }


  router.get('/altp_data', function (req, res) {
    const data = JSON.parse(readFileSync('./altp_data.json', "utf-8"));
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(data, null, 4));
  });
  
  const getDirs = readdirSync(srcPath).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirs) {
    const fileName = readdirSync(path.join(__dirname, '/public/' + dir + '/')).filter((file) => file.endsWith(".js"));
    for (j of fileName) {
      const { index, name } = require(path.join(__dirname, '/public/' + dir + '/') + j);
      router.get(name, index);
      n++
    }
  }


  const getDirsPost = readdirSync(srcPathPost).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirsPost) {
    const fileName = readdirSync(path.join(__dirname, '/post/' + dir + '/')).filter((file) => file.endsWith(".js"));
    for (j of fileName) {
      const { index, name } = require(path.join(__dirname, '/post/' + dir + '/') + j);
      router.post(name, index);
      n++
      
    }
  }
  console.log(`\x1b[38;5;220m[ LOADING ] \x1b[33m→\x1b[38;5;197m Đã load thành công ${n} file API`);
} catch (e) { console.log(e); }


module.exports = router;