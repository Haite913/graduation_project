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
import { BarChart } from '@mui/x-charts/BarChart';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

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

  const [buyPoints, setBuyPoints] = useState([]); // 买入点时间
  const [sellPoints, setSellPoints] = useState([]); // 卖出点时间
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
        setMACDS1({
         DIF: [null],  // 或者 [null]
         DEA: [null],  // 或者 [null]
         MACD: [null], // 或者 [null]
         TIME: [null], // 或者 [null]
         });
        setRSIS1({
          K: [null],  // 或者 [null]
          D: [null],  // 或者 [null]
          J: [null], // 或者 [null]
          TIME: [null], // 或者 [null]
        });
        setKDJS1({
          RSI: [null],  // 或者 [null]
          TIME: [null], // 或者 [null]
        });
        setCCIS1({
          CCI: [null],  // 或者 [null]
          TIME: [null], // 或者 [null]
        });
        setSelectedFile1(newSelectedFile1); // 更新选中的文件
    };


    const handleGetDATA = async () => {
      try {
        // 获取 MACD 数据
        let macdUrl = `http://localhost:5000/getDataMACD?selectedFile=${selectedFile1}`;
        let macdResponse = await fetch(macdUrl);
        let macdRawData = await macdResponse.text();
        let macdData = JSON.parse(macdRawData.replace(/NaN/g, 'null'));
        setMACDS1(macdData);

        // 获取 KDJ 数据
        let kdjUrl = `http://localhost:5000/getDataKDJ?selectedFile=${selectedFile1}`;
        let kdjResponse = await fetch(kdjUrl);
        let kdjRawData = await kdjResponse.text();
        let kdjData = JSON.parse(kdjRawData.replace(/NaN/g, 'null'));
        setKDJS1(kdjData);

        // 获取 RSI 数据
        let rsiUrl = `http://localhost:5000/getDataRSI?selectedFile=${selectedFile1}`;
        let rsiResponse = await fetch(rsiUrl);
        let rsiRawData = await rsiResponse.text();
        let rsiData = JSON.parse(rsiRawData.replace(/NaN/g, 'null'));
        setRSIS1(rsiData);


        // 获取 CCI 数据
        let cciUrl = `http://localhost:5000/getDataCCI?selectedFile=${selectedFile1}`;
        let cciResponse = await fetch(cciUrl);
        let cciRawData = await cciResponse.text();
        let cciData = JSON.parse(cciRawData.replace(/NaN/g, 'null'));
        setCCIS1(cciData);

        // 计算买入和卖出点
        const buyPoints1 = [];
        const sellPoints1 = [];
        for (let i = 1; i < macdData.DIF.length; i++) {
            const prevDIF = macdData.DIF[i - 1];
            const currDIF = macdData.DIF[i];
            const prevDEA = macdData.DEA[i - 1];
            const currDEA = macdData.DEA[i];

            // 获取KDJ前值和当前值
            const prevK = kdjData.K[i - 1];
            const currK = kdjData.K[i];
            const prevD = kdjData.D[i - 1];
            const currD = kdjData.D[i];

            // 获取当前时刻的RSI、CCI值
            const currRSI = rsiData.RSI[i];
            const currCCI = cciData.CCI[i];

            // 买入条件（三个必须同时满足）
            if (
                // MACD金叉：DIF上穿DEA
                prevDIF < prevDEA && currDIF > currDEA &&
                // KDJ金叉：K线上穿D线
                prevK < prevD && currK >= currD &&
                // CCI或RSI满足其一
                (currCCI > 100 || currRSI < 30)
            ) {
                buyPoints1.push({ time: macdData.TIME[i], type: '买入' });
            }

            // 卖出条件（三个必须同时满足）
            else if (
                // MACD死叉：DIF下穿DEA
                prevDIF > prevDEA && currDIF < currDEA &&
                // KDJ死叉：K线下穿D线
                prevK > prevD && currK <= currD &&
                // CCI或RSI满足其一
                (currCCI < -100 || currRSI > 70)
            ) {
                sellPoints1.push({ time: macdData.TIME[i], type: '卖出' });
            }
        }

        setBuyPoints(buyPoints1);
        setSellPoints(sellPoints1);
        console.log(buyPoints);
        console.log(sellPoints);

        setOpen1(true);
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
    {/* 添加表格显示买入卖出点 */}
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>时间</TableCell>
            <TableCell align="right">操作类型</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 合并 buyPoints 和 sellPoints，并按时间排序 */}
          {buyPoints.concat(sellPoints)
            .sort((a, b) => new Date(a.time) - new Date(b.time)) // 按时间排序
            .map((point, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {point.time}
              </TableCell>
              <TableCell align="right">{point.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </box>
  </Grid>
  </Grid>

  );
}

export default StockAnalysisPage;
