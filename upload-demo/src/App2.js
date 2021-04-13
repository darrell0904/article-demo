import { useState } from 'react';
import './App.css';

const CHUNK_SIZE = 2 * 1024 * 1024; //2m
const THREADS = 3; //最大并发数

// 单个文件的状态
const fileStatus = {
  wait: 'wait',
  uploading: 'uploading',
  success: 'success',
  error: 'error',
  secondPass: 'secondPass',
  pause: 'pause',
  resume: 'resume'
};

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

const xhrSend = (formData, {
  onProgress,
  onComplete,
  callback
}) => {
  const xhr = new XMLHttpRequest();   //创建对象
  xhr.open('POST', 'http://localhost:3000/', true);

  xhr.onreadystatechange = function () {
    console.log('state change', xhr.readyState);
    if (xhr.readyState == 4 && xhr.responseText.length>10) {
      console.log('xhr.responseText');
      console.log(xhr.responseText);
      callback && callback();
    }
  }

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      var completedPercent = (event.loaded / event.total * 100).toFixed(2);
      // progressSpan.style.width = completedPercent + '%';
      // progressSpan.innerHTML = completedPercent + '%';
      // if (completedPercent > 90) {//进度条变色
      //     progressSpan.classList.add('green');
      // }
    }
  });

  xhr.send(formData);
};

function App() {
  const [uploadFile, setUploadFile] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (!files) return;

    const file = files[0];


    file.status = fileStatus.wait;
    file.fileHash = 1570615258206;
    file.chunkList = [];
    file.uploadProgress = 0;

    setUploadFile(file);
  };

  const sendRequest = (chunks) => {
    const fileHash = 1570615258206; //模拟 hash
    const chunkCount = chunks.length;
    let sendChunkCount = 0;

    return new Promise((resolve, reject) => {
      const handler = () => {
        // if (chunks.length > 0) {
        //   var fd = new FormData();   //构造FormData对象
        //   fd.append('hash', fileHash);
        //   fd.append('file', chunks[i]);
        //   fd.append('fileName', i);
        // }
      };

      for (let i = 0; i < THREADS; i++) {
        handler();
      }
    });
  };

  // 点击上传
  const upload = (e) => {
    console.log('---e----', uploadFile);

    const chunks = createFileChunk(uploadFile);

    uploadFile.chunkList = chunks.map(({file}, index) => ({
      fileHash: uploadFile.fileHash,
      fileName: uploadFile.name,
      index,
      hash: uploadFile.fileHash + '-' + index,
      chunk: file,
      size: file.size,
    }));

    const requestDataList = chunks
          .map(({ fileHash, chunk, fileName, index }) => {
            const formData = new FormData();
            formData.append('hash', fileHash);
            formData.append('file', chunk);
            formData.append('fileName', index); // 文件名使用切片的下标

            return { formData, index, fileName };
          });

    console.log('---chunks---', chunks);


  };

  const pause = (e) => {
    console.log('---暂停了');
  };

  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />

        <div id="totalBar" className="totalBar">
            <div id="totalBarColor" className="totalBarColor"></div>
         </div>

      </div>

      <div className="action">
        <button type="button" onClick={upload}>上 传</button>
        <button type="button" onClick={pause}>暂 停</button>
      </div>
    </div>
  );
}

export default App;
