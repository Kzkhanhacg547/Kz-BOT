const fs = require('fs').promises;
const path = require('path');
const util = require('util');

const unlink = util.promisify(fs.unlink);

module.exports = {
config: {
  name: 'api',
  commandCategory: 'Tiện ích',
  hasPermission: 2,
  credits: 'Kz Khánhh',
  usages: 'api <đường_dẫn_thư_mục> | api create <tên_file_cần_tạo> | api del <tên_file_cần_xóa>',
  description: 'Hệ thống',
  cooldowns: 0
},

  run: async (o) => {
    let send = (msg) => o.api.sendMessage(msg, o.event.threadID, o.event.messageID),
      msgArray = [];

    // Kiểm tra nếu không có đối số được cung cấp
    if (o.args.length === 0) {
      return send("⚠️ Vui lòng nhập đường dẫn thư mục để kiểm soát file .json");
    }

    const folderPath = path.join(__dirname, 'Kz-API', o.args[0]);

    // Kiểm tra nếu thư mục không tồn tại
    try {
      await fs.access(folderPath);
    } catch (error) {
      return send("⚠️ Thư mục không tồn tại");
    }

    // Kiểm tra các tác vụ được yêu cầu
    if (o.args[1] === 'create' && o.args[2]) {
      const fileName = `${o.args[2]}.json`;
      const filePath = path.join(folderPath, fileName);

      // Kiểm tra xem file đã tồn tại hay chưa
      try {
        await fs.access(filePath);
        return send(`⚠️ File ${fileName} đã tồn tại`);
      } catch (error) {
        // Tạo file mới
        await fs.writeFile(filePath, '[]');
        return send(`✅ File ${fileName} đã được tạo`);
      }
    } else if (o.args[1] === 'del' && o.args[2]) {
      const fileName = `${o.args[2]}.json`;
      const filePath = path.join(folderPath, fileName);

      // Kiểm tra xem file có tồn tại để xóa hay không
      try {
        await fs.access(filePath);
        await unlink(filePath);
        return send(`✅ File ${fileName} đã được xóa`);
      } catch (error) {
        return send(`⚠️ File ${fileName} không tồn tại`);
      }
    } else if (o.args[1] === 'add' && o.args[2]) {
        const fileName = `${o.args[2]}.json`;
        const filePath = path.join(folderPath, fileName);

        // Kiểm tra xem file có tồn tại hay không
        try {
            await fs.access(filePath);
            // Đọc nội dung từ file
            let data = await fs.readFile(filePath, 'utf-8');

            // Cố gắng chuyển đổi nội dung thành mảng
            let jsonData;
            try {
                jsonData = JSON.parse(data);
            } catch (parseError) {
                // Nếu có lỗi khi parse JSON, tạo một mảng mới
                jsonData = [];
            }

            // Thêm mới vào mảng nếu có thêm dữ liệu
            if (o.args.length > 3) {
                const linesToAdd = o.args.slice(3).join(' ').split('|').map(line => line.trim());
                jsonData = jsonData.concat(linesToAdd);
            }

            // Ghi nội dung mới vào file, giữ nguyên định dạng JSON
            await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
            return send(`✅ Đã thêm nội dung vào file ${fileName}`);
        } catch (error) {
            // Nếu file không tồn tại, tạo một file mới với nội dung là một mảng JSON
            const linesToAdd = o.args.length > 3 ? o.args.slice(3).join(' ').split('|').map(line => line.trim()) : [];
            const jsonData = linesToAdd.length > 0 ? linesToAdd : [];
            await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
            return send(`✅ Đã tạo mới và thêm nội dung vào file ${fileName}`);
        }
    } else if (o.args[1] === 'remove' && o.args[2]) {
      const fileName = `${o.args[2]}.json`;
      const filePath = path.join(folderPath, fileName);

      // Kiểm tra xem file có tồn tại hay không
      try {
        await fs.access(filePath, fs.constants.F_OK);

        // Đọc nội dung từ file
        let data = await fs.readFile(filePath, 'utf-8');

        // Lựa chọn dòng cần xóa
        const linesToRemove = o.args.slice(3).map(Number);

        // Kiểm tra xem dữ liệu cần xóa có tồn tại trong file hay không
        const totalLines = data.split('\n').length;
        for (const lineToRemove of linesToRemove) {
          if (lineToRemove < 1 || lineToRemove > totalLines) {
            return send(`⚠️ Dòng "${lineToRemove}" không tồn tại trong file ${fileName}`);
          }
        }

        // Xóa dòng khỏi nội dung
        const newData = data
          .split('\n')
          .filter((_, index) => !linesToRemove.includes(index + 1))
          .join('\n');

        // Ghi nội dung mới vào file
        await fs.writeFile(filePath, newData);
        return send(`✅ Đã xóa dòng khỏi file ${fileName}`);
      } catch (error) {
        return send(`⚠️ Đã xảy ra lỗi khi xóa dòng khỏi file ${fileName}: ${error.message}`);
      }
     } else if (o.args[1] === 'views' && o.args[2] && o.args[3] && o.args[4]) {
          const fileName = `${o.args[2]}.json`;
          const filePath = path.join(folderPath, fileName);

          // Kiểm tra xem file có tồn tại hay không
          try {
              await fs.access(filePath, fs.constants.F_OK);

              // Đọc nội dung từ file
              let data = await fs.readFile(filePath, 'utf-8');

              // Lấy các dòng từ x đến y
              const startLine = parseInt(o.args[3]);
              const endLine = parseInt(o.args[4]);
              const selectedLines = data.split('\n').slice(startLine - 1, endLine);

              // Kiểm tra nếu số dòng lớn hơn 12, giới hạn lại
              if (selectedLines.length > 12) {
                  return send('⚠️ Quá nhiều dòng để hiển thị, giới hạn là 12 dòng');
              }

              // Gửi nội dung đã chọn
              return send(`✅ Nội dung từ dòng ${startLine} đến dòng ${endLine} trong file ${fileName}:\n${selectedLines.join('\n')}`);
          } catch (error) {
              return send(`⚠️ Đã xảy ra lỗi khi xem nội dung của file ${fileName}: ${error.message}`);
          }
      } else if (o.args[1] === 'view' && o.args[2]) {
        const fileName = `${o.args[2]}.json`;
        const filePath = path.join(folderPath, fileName);

        // Kiểm tra xem file có tồn tại hay không
        try {
            await fs.access(filePath, fs.constants.F_OK);

            // Đọc nội dung từ file
            let data = await fs.readFile(filePath, 'utf-8');

            // Đếm số dấu phẩy để xác định số dòng tạm thời
            const temporaryTotalLines = data.split(',').length;

            return send(`✅ File ${fileName} có tạm thời ${temporaryTotalLines} dòng.`);
        } catch (error) {
            return send(`⚠️ Đã xảy ra lỗi khi xem thông tin về file ${fileName}: ${error.message}`);
        }
    } else {
          send('⚠️ Yêu cầu không hợp lệ.');
        }
      }
    };