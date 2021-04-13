const multiparty = require('multiparty');
const http = require('http');
const path = require('path');
const fse = require('fs-extra');
const server = http.createServer();

const extractExt = (filename) => {
  return filename.slice(filename.lastIndexOf('.'), filename.length); // 提取后缀名
}

const rendAjax = (res, obj) => {
  res.end(JSON.stringify(obj));
};

const UPLOAD_DIR = path.resolve(__dirname, '..', 'target'); // 大文件存储目录

const pipeStream = (path, writeStream) =>
  new Promise((resolve) => {
    const readStream = fse.createReadStream(path);
    readStream.on('end', () => {
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });

// 合并切片
/**
 *
 * @param {*} filePath 文件目录
 * @param {*} fileHash md5值
 * @param {*} size 切片的个数
 */
 const mergeFileChunk = async (filePath, fileHash, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
  const chunkPaths = await fse.readdir(chunkDir);
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1]);
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    )
  );
  fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

  if (req.method === 'OPTIONS') {
    res.status = 200;
    res.end();
    return;
  }

  if (req.url.indexOf('/fileChunk/presence') !== -1) {
    await controller.handleVerifyUpload(req, res);
    return;
  }

  if (req.url === '/fileChunk/merge') {
    const multipart = new multiparty.Form();

    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status = 500;
        res.end('process file chunk failed');
        return;
      }

      const [md5] = fields.token;
      const [fileName] = fields.filename;

      const ext = extractExt(fileName);

      const filePath = path.resolve(UPLOAD_DIR, `${md5}${ext}`);

      await mergeFileChunk(filePath, md5, 2 * 1024 * 1024);

      return rendAjax(res, {
        code: 2000,
        message: '合并成功'
      });
    })

    return;
  }

  if (req.url === '/fileChunk') {
    const multipart = new multiparty.Form();

    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status = 500;
        res.end('process file chunk failed');
        return;
      }

      const [chunk] = files.f1;
      const [hash] = fields.token;
      const [filename] = fields.index;

      const ext = extractExt(fields.index);

      const filePath = path.resolve(UPLOAD_DIR, `${hash}`);
      const chunkDir = path.resolve(UPLOAD_DIR, hash);

      // 文件存在直接返回
      if (fse.existsSync(`${filePath}${ext}`)) {
        return rendAjax(res, {
          code: 2001,
          message: '文件已存在'
        });
      }

      // 切片目录不存在，创建切片目录
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir);
      }

      try {
        await fse.move(chunk.path, path.resolve(chunkDir, filename));
      } catch (error) {
        console.log('handleFileChunk -> error', error);
      }
      rendAjax(res, {
        code: 200,
        message: '切片上传成功'
      });
      return;
    });
  }

  if (req.url === '/') {
    res.end('Welcome');
  }
});

server.listen(3000, () => console.log('正在监听 3000 端口'));
