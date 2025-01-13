import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '@fontsource/roboto/700.css';
import { useState,useEffect  } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel'; // 导入 FormControlLabel
import Grid from '@mui/material/Grid';
import { LineChart } from '@mui/x-charts/LineChart';

//股票分析页面
function StockAnalysisPage() {
  const [files, setFiles] = useState([]); // 假设您已经定义了这个状态来存储文件名
  const [MACDS1, setMACDS1] = useState({
    DIF: [null],  // 或者 [null]
    DEA: [null],  // 或者 [null]
    MACD: [null], // 或者 [null]
    TIME: [null], // 或者 [null]
    });
  const [MACDS2, setMACDS2] = useState({
    DIF: [null],  // 或者 [null]
    DEA: [null],  // 或者 [null]
    MACD: [null], // 或者 [null]
    TIME: [null], // 或者 [null]
  });
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedFile1, setSelectedFile1] = useState(files[0]);
  const [selectedFile2, setSelectedFile2] = useState(files[0]);
  const [selectedValue1, setSelectedValue1] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');

  // 处理 RadioGroup 变化的函数
  const handleRadioChange1 = (event) => {
    // 更新状态变量为选中的值
    setSelectedValue1(event.target.value);
  };
  const handleRadioChange2 = (event) => {
    // 更新状态变量为选中的值
    setSelectedValue2(event.target.value);
  };
  const handleGetCsvFiles = async () => {
  try {
      // 构建请求的 URL 或请求体，这里假设是 GET 请求
      const url = 'http://localhost:5000/getCsvFile';

      // 发送请求
      const response = await fetch(url);
      const data = await response.json();

      // 处理响应数据，例如打印到控制台
      console.log(data);
      setFiles(data.csv_files);
    } catch (error) {
      // 处理错误
      console.error('请求失败:', error);
    }
  };

    const handleFileChange1 = (event) => {
        const newSelectedFile1 = event.target.value; // 获取新选中的文件
        setSelectedFile1(newSelectedFile1); // 更新选中的文件
    };

    const handleFileChange2 = (event) => {
        const newSelectedFile2 = event.target.value; // 获取新选中的文件
        setSelectedFile2(newSelectedFile2); // 更新选中的文件
    };

    const handleGetMACD1 = async () => {
      try {
        const url = 'http://localhost:5000/getData'+selectedValue1+'?selectedFile='+selectedFile1;
        const response = await fetch(url);
        const rawData = await response.text(); // 获取响应文本而不是直接解析为 JSON

        setOpen1(true);

        // 尝试解析 JSON，处理 NaN 值
        let data;
        try {
          data = JSON.parse(rawData);
        } catch (error) {
          // 如果解析失败，尝试替换 NaN 为 null 后再次解析
          const fixedData = rawData.replace(/NaN/g, 'null');
          data = JSON.parse(fixedData);
        }

        console.log(data);
        setMACDS1(data);
      } catch (error) {
        console.error('请求失败:', error);
      }
    };
       const handleGetMACD2 = async () => {
      try {
        const url = 'http://localhost:5000/getData'+selectedValue2+'?selectedFile='+selectedFile2;
        const response = await fetch(url);
        const rawData = await response.text(); // 获取响应文本而不是直接解析为 JSON

        setOpen2(true);

        // 尝试解析 JSON，处理 NaN 值
        let data;
        try {
          data = JSON.parse(rawData);
        } catch (error) {
          // 如果解析失败，尝试替换 NaN 为 null 后再次解析
          const fixedData = rawData.replace(/NaN/g, 'null');
          data = JSON.parse(fixedData);
        }

        console.log(data);
        setMACDS2(data);
      } catch (error) {
        console.error('请求失败:', error);
      }
    };

  useEffect(() => {
    handleGetCsvFiles();
  }, []); // 空依赖数组表示仅在组件挂载时执行


  return (
  <Grid container spacing={1}>
  <Grid size={100} style={{ width:"100%",padding:"10px 20px"}}>
    <box style={{ padding:"10px 20px",display:"flex",flexDirection:"column"}}>
    <FormControl>
      <h1>选择第1支股票</h1>
            <FormLabel id="demo-row-radio-buttons-group-label">股票</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={selectedFile1} // 假设默认选择第一个文件
        name="radio-buttons-group"
        onClick={handleFileChange1}
      >
        {files.map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            control={<Radio />}
            label={item}
          />
        ))}
      </RadioGroup>
      <FormLabel id="demo-row-radio-buttons-group-label">指标</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleRadioChange1} // 设置 onChange 事件处理函数
        value={selectedValue1}  // 设置 RadioGroup 的 value 为状态变量
      >
        <FormControlLabel value="MACD" control={<Radio />} label="MACD" />
        <FormControlLabel value="KDJ" control={<Radio />} label="KDJ" />
        <FormControlLabel value="RSI" control={<Radio />} label="RSI" />
        <FormControlLabel value="CCI" control={<Radio />} label="CCI" />
      </RadioGroup>
    </FormControl>
    <Button
             variant="contained"
             endIcon={<SendIcon />}
             onClick={handleGetMACD1}
             sx={{ mt: 4 }}
           >
    获取指标图像
    </Button>
    <LineChart
    height={400}
    open={open1}
    series={[
         { data: MACDS1.DEA, label: 'DEA',color:'blue' },
         { data: MACDS1.DIF, label: 'DIF',color:'orange' },
         { data: MACDS1.MACD, label: 'MACD'},
    ]}
    xAxis={[{ scaleType: 'point', data: MACDS1.TIME }]}
    />
    </box>
  </Grid>
  </Grid>

  );
}

export default StockAnalysisPage;
