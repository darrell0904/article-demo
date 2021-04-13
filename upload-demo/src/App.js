import { useState } from 'react';
import './App.css';

const CHUNK_SIZE = 2 * 1024 * 1024; //2m
const THREADS = 3; //最大并发数

// 创建文件切片
const createFileChunk = (file, size = CHUNK_SIZE) => {
  const fileChunkList = [];
  var count = 0;
  while (count < file.size) {
    fileChunkList.push({
      file: file.slice(count, count + size)
    });
    count += size;
  }
  return fileChunkList;
};

function App() {
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPersent, setUploadPersent] = useState(0);

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (!files) return;

    const file = files[0];

    file.token = 1570615258206;

    console.log('---file---', file);

    setUploadFile(file);
  };

  const xhrSend = (url, formData, callback) => {
    const xhr = new XMLHttpRequest();   //创建对象

    xhr.open('POST', url, true);
  
    xhr.onreadystatechange = function () {
      console.log('state change', xhr.readyState);
      if (xhr.readyState == 4 && xhr.responseText.length > 10) {
        console.log(xhr.responseText);
        callback && callback();
      }
    }
  
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        var completedPercent = (event.loaded / event.total * 100).toFixed(2);
        setUploadPersent(completedPercent);
      }
    });
  
    xhr.send(formData);
  };

  // 发送分片
  const sendRequest = (chunks) => {
    let finished = 0;
    const total = chunks.length;

    return new Promise((resolve, reject) => {
      const handler = () => {
        if (chunks.length > 0) {
          // 出栈
          const formInfo = chunks.shift();

          console.log('---formInfo---', formInfo);

          const formData = new FormData();
          formData.append('token', formInfo.token);
          formData.append('f1', formInfo.file);
          formData.append('index', formInfo.index); // 文件名使用切片的下标

          xhrSend('http://localhost:3000/fileChunk', formData, () => {
            finished++;
            handler();
          });
        }

        if (finished >= total) {
          resolve('done');
        }
      };

      // 控制并发
      for (let i = 0; i < THREADS; i++) {
        handler();
      }
    });
  }

  const sendMergeQuest = (chunkLength) => {
    const formD = new FormData();

    console.log('-----chunks----', chunkLength);

    formD.append('type', 'merge');
    formD.append('token', uploadFile.token);
    formD.append('chunkCount', chunkLength);
    formD.append('filename', uploadFile.name);

    xhrSend('http://localhost:3000/fileChunk/merge', formD);
  };

  // 点击上传
  const upload = async () => {
    console.log('---e----', uploadFile);

    let chunks = createFileChunk(uploadFile);

    chunks = chunks.map((item, index) => {
      return {
        file: item.file,
        index,
        token: uploadFile.token
      }
    });

    const chunkLength = chunks.length;

    const ret = await sendRequest(chunks);

    console.log('---ret----', ret);

    // 合并请求
    if (ret === 'done') {
      sendMergeQuest(chunkLength);
    }
  };

  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />

        <div id="totalBar" className="totalBar">
            <div id="totalBarColor" className="totalBarColor" style={{ width: `${uploadPersent}%` }}></div>
         </div>

      </div>

      <div className="action">
        <button type="button" onClick={upload}>上 传</button>
      </div>
    </div>
  );
}

export default App;
