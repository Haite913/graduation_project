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
import { LineChart,LinePlot } from '@mui/x-charts/LineChart';
import { BarChart,BarPlot } from '@mui/x-charts/BarChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';

//股票分析页面
function StockAnalysisPage() {
  const [files, setFiles] = useState([]); // 假设您已经定义了这个状态来存储文件名
  const [MACDS1, setMACDS1] = useState({
    DIF: [null],  // 或者 [null]
    DEA: [null],  // 或者 [null]
    MACD: [null], // 或者 [null]
    TIME: [null], // 或者 [null]
    });
  const [KDJS1, setKDJS1] = useState({
    K: [null],  // 或者 [null]
    D: [null],  // 或者 [null]
    J: [null], // 或者 [null]
    TIME: [null], // 或者 [null]
  });
  const [RSIS1, setRSIS1] = useState({
    RSI: [null],  // 或者 [null]
    TIME: [null], // 或者 [null]
  });
  const [CCIS1, setCCIS1] = useState({
    CCI: [null],  // 或者 [null]
    TIME: [null], // 或者 [null]
  });
  const [open1, setOpen1] = useState(false);
  const [selectedFile1, setSelectedFile1] = useState(files[0]);
  const [selectedValue1, setSelectedValue1] = useState('');

  // 处理 RadioGroup 变化的函数
  const handleRadioChange1 = (event) => {
    // 更新状态变量为选中的值
    setSelectedValue1(event.target.value);
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


    const handleGetDATA = async () => {
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
        if(selectedValue1==='MACD'){
            setMACDS1(data);
        }else if(selectedValue1==='KDJ'){
            setKDJS1(data);
        }else if(selectedValue1==='RSI'){
            setRSIS1(data);
        }else if(selectedValue1==='CCI'){
            setCCIS1(data);
        }
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
      <h1>请选择股票</h1>
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
             onClick={handleGetDATA}
             sx={{ mt: 4 }}
           >
    获取指标图像
    </Button>
    {selectedValue1 === 'MACD' && (
    <box>
    <LineChart
    height={400}
    open={open1}
    series={[
         { data: MACDS1.DEA, label: 'DEA',color:'blue', showMark: false },
         { data: MACDS1.DIF, label: 'DIF',color:'orange', showMark: false },
    ]}
    xAxis={[{ scaleType: 'point', data: MACDS1.TIME }]}
    />
    <BarChart
    height={400}
    open={open1}
    series={[
         { data: MACDS1.MACD, label: 'MACD',color:"green"},
    ]}
    xAxis={[{ scaleType: 'band', data: MACDS1.TIME }]}
    />
    <ChartContainer
      height={400}
      open={open1}
      series={[
        { data: MACDS1.DEA, type: 'line', label: 'DEA'}, // This series is for the bar chart
        { data: MACDS1.DIF, type: 'line', label: 'DIF'}, // This series is for the line chart
        { data: MACDS1.MACD, type: 'bar', label: 'MACD'} // This series is for the line chart
      ]}
      xAxis={[{ scaleType: 'band', data: MACDS1.TIME }]}
    >
      <BarPlot /> {/* Will only display series with type: 'bar' */}
      <LinePlot /> {/* Will only display series with type: 'line' */}
    </ChartContainer>
    }
    </box>
    )
    }
    {selectedValue1 === 'KDJ' && (
       <box>
    <LineChart
    height={400}
    open={open1}
    series={[
         { data: KDJS1.K, label: 'K',color:'#f6ae42', showMark: false },
         { data: KDJS1.D, label: 'D',color:'#4788c4', showMark: false },
         { data: KDJS1.J, label: 'J',color:'#d25cb3', showMark: false },
    ]}
        xAxis={[{ scaleType: 'point', data: KDJS1.TIME }]}
    />
       </box>
    )
    }
    {selectedValue1 === 'RSI' && (
       <box>
    <LineChart
    height={400}
    open={open1}
    series={[
         { data: RSIS1.RSI, label: 'RSI',color:'#f6ae42', showMark: false },
    ]}
        xAxis={[{ scaleType: 'point', data: RSIS1.TIME }]}
    />
       </box>
    )
    }
    {selectedValue1 === 'CCI' && (
       <box>
    <LineChart
    height={400}
    open={open1}
    series={[
         { data: CCIS1.CCI, label: 'CCI',color:'blue', showMark: false },
    ]}
        xAxis={[{ scaleType: 'point', data: CCIS1.TIME }]}
    />
       </box>
    )
    }
    </box>
  </Grid>
  </Grid>

  );
}

export default StockAnalysisPage;
