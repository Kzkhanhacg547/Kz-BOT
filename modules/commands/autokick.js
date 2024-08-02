const reactionKick = "❤", reactionCancel = "👎", {resolve} = require("path"), {existsSync, writeFileSync} = require("fs-extra"), path = resolve(__dirname, "data", "autokick.json");
module.exports.config = {name: "autokick", version: "1.0.0", credits: "NTKhang ( fix by DEV NDK )", hasPermssion: 1, description: "Cảnh báo thành viên vi phạm từ ngữ", usages: "autokick on/off add/del list", commandCategory: "Qtv", cooldowns: 0};
module.exports.run = async ({api: _0x4de985, event: _0x4a8ebb, args: _0x1dce91}) => {
  if (!existsSync(path)) {
    try {
      writeFileSync(path, JSON.stringify({}, null, "	"));
    } catch (medelin) {
      console.log(medelin);
    }
  }
  const kyanite = require("./data/autokick.json"), walmer = await _0x4de985.getThreadInfo(_0x4a8ebb.threadID);
  !kyanite.hasOwnProperty(_0x4a8ebb.threadID) && (kyanite[_0x4a8ebb.threadID] = {data: {}}, writeFileSync(path, JSON.stringify(kyanite, null, "	")));
  const cappie = kyanite[_0x4a8ebb.threadID].data || {};
  !cappie.autoKick && (cappie.autoKick = {words: [], enables: false}, writeFileSync(path, JSON.stringify(kyanite, null, "	")));
  if (_0x1dce91[0] == "on") {
    return cappie.autoKick.enables = true, writeFileSync(path, JSON.stringify(kyanite, null, "	")), _0x4de985.sendMessage("[ MODE ] - Auto kick đã được bật", _0x4a8ebb.threadID, _0x4a8ebb.messageID);
  } else {
    if (_0x1dce91[0] == "off") {
      return cappie.autoKick.enables = false, writeFileSync(path, JSON.stringify(kyanite, null, "	")), _0x4de985.sendMessage("[ MODE ] - Auto kick đã được tắt", _0x4a8ebb.threadID, _0x4a8ebb.messageID);
    } else {
      if (_0x1dce91[0] == "add") {
        if (!_0x1dce91[1]) {
          return _0x4de985.sendMessage("[ MODE ] - Vui lòng nhập từ cần thêm vào danh sách", _0x4a8ebb.threadID, _0x4a8ebb.messageID);
        }
        const eryonna = _0x1dce91.slice(1).join(" ");
        let elishia = eryonna.split(",").map(maimoona => maimoona.trim());
        return elishia = elishia.filter(raei => !cappie.autoKick.words.includes(raei)), cappie.autoKick.words.push(...elishia), writeFileSync(path, JSON.stringify(kyanite, null, "	")), _0x4de985.sendMessage("[ MODE ] - Đã thêm " + elishia.length + " từ vào danh sách", _0x4a8ebb.threadID, _0x4a8ebb.messageID);
      } else {
        if (_0x1dce91[0] == "del") {
          const saavi = _0x1dce91.slice(1).join(" ");
          let hareer = saavi.split(",").map(shakeitha => shakeitha.trim());
          hareer = hareer.filter(gracee => cappie.autoKick.words.includes(gracee));
          for (const yatin of hareer) cappie.autoKick.words.splice(cappie.autoKick.words.indexOf(yatin), 1);
          return writeFileSync(path, JSON.stringify(kyanite, null, "	")), _0x4de985.sendMessage("[ MODE ] - Đã xóa " + hareer.length + " từ khỏi danh sách", _0x4a8ebb.threadID, _0x4a8ebb.messageID);
        } else {
          if (_0x1dce91[0] == "list") {
            let kailib = "[ MODE ] - Danh sách từ cấm:\n";
            return cappie.autoKick.words.forEach(nyangel => kailib += " - " + nyangel + "\n"), _0x4de985.sendMessage(kailib, _0x4a8ebb.threadID, _0x4a8ebb.messageID);
          } else {
            return _0x4de985.sendMessage('━━━━━ [ AUTO KICK ] ━━━━━\n\n→ autokick add + từ cần cấm\n→ autokick del + từ đã cấm (xoá)\ncó thể thêm nhiều hoặc xoá nhiều cùng lúc bằng cách thêm ","\n→ autokick list: xem danh sách từ đã cấm\n→ autokick on: bật auto kick\n→ autokick off: tắt auto kick', _0x4a8ebb.threadID, _0x4a8ebb.messageID);
          }
        }
      }
    }
  }
};
module.exports.handleEvent = async ({api: _0x15634f, event: _0x561bd3, Threads: _0x242c3b}) => {
  const {senderID: _0x2350b3, threadID: _0xf8676} = _0x561bd3, _0xa3147b = global.data.threadInfo.get(_0xf8676) || await _0x242c3b.getInfo(_0xf8676), _0x2f98cc = (_0xa3147b.adminIDs || []).find(neils => neils.id == _0x2350b3), _0x46804d = [_0x15634f.getCurrentUserID(), ...global.config.ADMINBOT, ...global.config.NDH], _0x5e762d = _0x2f98cc || _0x46804d.some(crispina => crispina == _0x2350b3);
  if (!existsSync(path)) {
    try {
      writeFileSync(path, JSON.stringify({}, null, "	"));
    } catch (samaia) {
      console.log(samaia);
    }
  }
  const adrionna = require("./data/autokick.json");
  !adrionna.hasOwnProperty(_0x561bd3.threadID) && (adrionna[_0x561bd3.threadID] = {data: {}}, writeFileSync(path, JSON.stringify(adrionna, null, "	")));
  if (_0x561bd3.body && !_0x5e762d) {
    try {
      const bahiyah = adrionna[_0x561bd3.threadID].data || {};
      if (!bahiyah.autoKick) {
        return;
      }
      if (bahiyah.autoKick.enables) {
        const jomaira = _0x561bd3.body.toLowerCase().match(new RegExp("(\\s|^)(" + bahiyah.autoKick.words.map(jaems => jaems += "+").join("|") + ")(\\s|$)", "gi"));
        if (jomaira) {
          return _0x15634f.sendMessage('[ MODE ] - Từ cấm "' + jomaira[0] + "\" đã được phát hiện, Quản trị viên hãy thả cảm xúc '" + reactionKick + "' tin nhắn này để xóa thành viên hoặc '" + reactionCancel + "' để hủy bỏ", _0x561bd3.threadID, async (hanani, aanisah) => {
            global.client.handleReaction.push({name: this.config.name, messageID: aanisah.messageID, targetID: _0x561bd3.senderID});
          }, _0x561bd3.messageID);
        }
      }
    } catch (bellah) {
      console.log(bellah);
    }
  }
};
module.exports.handleReaction = async ({api: _0x1fa2e2, event: _0x20ca82, Threads: _0x9b4d94, handleReaction: _0x47cabb, Users: _0x1dbf3d}) => {
  const {targetID: _0x21be17, messageID: _0x1800d9} = _0x47cabb, {userID: _0x2290ec, threadID: _0xe01baa} = _0x20ca82, _0x46140b = global.data.threadInfo.get(_0xe01baa) || await _0x9b4d94.getInfo(_0xe01baa), _0x3f7b4d = _0x46140b.adminIDs.some(kewon => kewon.id == _0x2290ec), _0x5816ba = [_0x1fa2e2.getCurrentUserID(), ...global.config.ADMINBOT, ...global.config.NDH], _0x15776c = _0x3f7b4d || _0x5816ba.some(nayami => nayami == _0x2290ec);
  if (!_0x15776c) {
    return;
  }
  if (_0x20ca82.reaction == reactionKick) {
    const keven = await _0x1fa2e2.getThreadInfo(_0x20ca82.threadID);
    return _0x1fa2e2.removeUserFromGroup(_0x21be17, _0x20ca82.threadID, async neima => {
      if (neima) {
        _0x1fa2e2.sendMessage("[ MODE ] - Không thể xóa thành viên này, thử thêm quyền Quản trị viên cho Bot và thả cảm xúc lại tin nhắn trên", _0x20ca82.threadID, _0x20ca82.messageID);
      } else {
        _0x1fa2e2.unsendMessage(_0x1800d9);
        const rydell = await _0x1dbf3d.getNameUser(_0x2290ec), yanxi = await _0x1dbf3d.getNameUser(_0x21be17);
        _0x1fa2e2.sendMessage("[ MODE ] - " + rydell + " đã xác nhận xóa thành viên " + yanxi, _0x20ca82.threadID);
      }
    });
  } else {
    if (_0x20ca82.reaction == reactionCancel) {
      return _0x1fa2e2.unsendMessage(_0x1800d9);
    }
  }
};