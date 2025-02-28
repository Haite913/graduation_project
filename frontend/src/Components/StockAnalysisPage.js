import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '@fontsource/roboto/700.css';
import { useState,useEffect  } from 'react';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel'; // 导入 FormControlLabel
import Grid from '@mui/material/Grid';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// 新增导入Slider组件
import Slider from '@mui/material/Slider';

//股票分析页面
function StockAnalysisPage() {
    const [showIndicator, setShowIndicator] = useState(false);
    const [files, setFiles] = useState([]); // 假设您已经定义了这个状态来存储文件名
    // 新增状态管理数据范围
    const [dataRange, setDataRange] = useState([0, 100]);
    const [maxDataLength, setMaxDataLength] = useState(100);
    const stockData = [
      { code: 'SH:000300', name: '沪深300' },
      { code: 'SH:600519', name: '贵州茅台' },
      { code: 'SH:688256', name: '寒武纪' },
      { code: 'SZ:002371', name: '北方华创' },
      { code: 'SH:688692', name: '武汉达梦' },
      { code: 'SZ:002594', name: '比亚迪' },
      { code: 'SH:688617', name: '惠泰医疗' },
      { code: 'SH:688608', name: '恒玄科技' },
      { code: 'SH:688111', name: '金山办公' },
      { code: 'SZ:300033', name: '同花顺' },
      { code: 'SH:688279', name: '峰岹科技' },
      { code: 'SZ:300750', name: '宁德时代' },
      { code: 'SH:601318', name: '中国平安' },
      { code: 'SH:600036', name: '招商银行' },
      { code: 'SH:601012', name: '隆基绿能' },
      { code: 'SZ:000858', name: '五粮液' },
      { code: 'SH:600104', name: '上汽集团' },
      { code: 'SH:688629', name: '华丰科技' },
      { code: 'SZ:301165', name: '锐捷网络' },
      { code: 'SZ:301202', name: '朗威股份' },
      { code: 'SZ:300214', name: '日科化学' },
      { code: 'SZ:300068', name: '南都电源' },
      { code: 'SZ:301510', name: '固高科技' },
      { code: 'SZ:300817', name: '双飞集团' },
      { code: 'SZ:300442', name: '润泽科技' },
      { code: 'SH:601888', name: '中国中免' },
      { code: 'SH:600048', name: '保利发展' },
      { code: 'SH:688016', name: '心脉医疗' },
      { code: 'SH:688012', name: '中微公司' },
      { code: 'SH:688002', name: '睿创微纳' },
      { code: 'SH:688003', name: '天准科技' },
      { code: 'SH:688008', name: '澜起科技' },
      { code: 'SH:688010', name: '博瑞医药' },
      { code: 'SH:688011', name: '新光光电' },
      { code: 'SH:688013', name: '天臣医疗' },
      { code: 'SH:688015', name: '道通科技' },
      { code: 'SH:688020', name: '方邦股份' },
      { code: 'SH:688021', name: '奥福环保' },
      { code: 'SH:688022', name: '瀚川智能' },
      { code: 'SH:688023', name: '安恒信息' },
      { code: 'SH:688024', name: '杭可科技' },
      { code: 'SH:688025', name: '杰普特' },
      { code: 'SH:688026', name: '洁特生物' },
      { code: 'SH:688027', name: '国盾量子' },
      { code: 'SH:688028', name: '沃尔德' },
      { code: 'SH:688029', name: '南微医学' },
      { code: 'SH:688030', name: '山石网科' },
      { code: 'SH:688032', name: '海尔生物' },
      { code: 'SH:688033', name: '航天宏图' },
      { code: 'SH:688035', name: '威胜信息' },
      { code: 'SH:688038', name: '清溢光电' },
      { code: 'SH:688039', name: '传音控股' },
      { code: 'SH:688040', name: '金科环境' },
      { code: 'SH:688041', name: '安路科技' },
      { code: 'SH:688043', name: '华兴源创' },
      { code: 'SH:688045', name: '当虹科技' },
      { code: 'SH:688046', name: '晶丰明源' },
      { code: 'SH:688047', name: '龙腾光电' },
      { code: 'SH:688048', name: '长阳科技' },
      { code: 'SH:688052', name: '容百科技' },
      { code: 'SH:688053', name: '思特威' },
      { code: 'SH:688055', name: '德林海' },
      { code: 'SH:688056', name: '芯原股份' },
      { code: 'SH:600865', name: '百大集团' },
      { code: 'SH:601933', name: '永辉超市' },
      { code: 'SZ:300547', name: '川环科技' },

    ];

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
  const [selectedFile1, setSelectedFile1] = useState(files[0]);
  const [selectedValue1, setSelectedValue1] = useState('');
  const [inputValue, setinputValue] = useState([]); // 买入点时间
  const [risk, setRisk] = useState([10]); // 风险
  const [closePrices, setClosePrices] = useState([]); // 收盘价数据
  const [stockTimes, setStockTimes] = useState([]);    // 时间数据
  const [backtestResult, setBacktestResult] = useState({
    totalReturn: 0,          // 总收益
    annualizedReturn: 0,     // 年化收益率
    winRate: 0,              // 胜率
    transactions: [],        // 交易记录
    equityCurve: []          // 净值曲线
  });

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
  // 处理 Select 值的变化
    const handleRiskChange = (event) => {
      setRisk(event.target.value);
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

    // 新增滑动条变化处理
     const handleSliderChange = (event, newValue) => {
       setDataRange(newValue);
     };

        // 生成切片后的数据
     const getSlicedData = (dataArray) => {
       return dataArray.slice(dataRange[0], dataRange[1] + 1);
     };


    const handleGetDATA = async () => {
    try {
        // 获取价格数据
        const priceUrl = `http://localhost:5000/getStockPrice?selectedFile=${selectedFile1}`;
        const priceResponse = await fetch(priceUrl);
        const priceData = await priceResponse.json();

        // 你原来的逻辑...
        setShowIndicator(true);  // 显示指标选择

        // 确保数据有效
        if (!priceData.closePrices || !priceData.times) {
          throw new Error('价格数据格式错误');
        }

        // 更新状态
        setClosePrices(priceData.closePrices);
        setStockTimes(priceData.times);

        // 其他逻辑...
      } catch (error) {
        console.error('价格数据获取失败:', error);
        alert('价格数据加载失败，请检查文件格式');
      }

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

          // 数据获取完成后更新最大长度
        const dataLength = macdData.TIME.length;
        setMaxDataLength(dataLength);
        setDataRange([Math.max(0, dataLength - 100), dataLength - 1]);

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

      } catch (error) {
        console.error('请求失败:', error);
      }
    };
   const handleBacktest = () => {
      //判断是否有输入以及是否有收盘价
      if (!inputValue || !closePrices.length) return;
      //初始资金
      const initialCapital = parseFloat(inputValue);
      let cash = initialCapital;
      //持有股票数量
      let shares = 0;
      //总交易次数
      let totalTrades = 0;
      //盈利的次数
      let profitableTrades = 0;
      //净值曲线
      const equityCurve = [initialCapital];
      //交易记录
      const transactions = [];

      // 风险控制配置
      const positionSizeMap = {10: 0.3, 30: 0.5, 50: 0.7};
      //记录当前的仓位比例
      const positionSize = positionSizeMap[risk] || 0.5;

      // 创建时间索引映射
      //将时间与收盘价索引创造映射
      const timeIndexMap = new Map();
      stockTimes.forEach((time, index) => {
        timeIndexMap.set(time, index);
      });

      // 处理所有交易点
      [...buyPoints, ...sellPoints]
        .sort((a, b) => new Date(a.time) - new Date(b.time))
        .forEach(point => {
          const index = timeIndexMap.get(point.time);
          if (index === undefined || index >= closePrices.length) return;

          const price = closePrices[index];
          //买入逻辑
          if (point.type === '买入' && cash > 0) {
            //计算买入金额
            const investment = cash * positionSize;
            //计算买入的股票数量
            const sharesBought = investment / price;
            //更新持股数量
            shares += sharesBought;
            //更新可用现金
            cash -= investment;
            //总交易次数
            totalTrades++;

            transactions.push({
              date: point.time,
              type: '买入',
              price,
              amount: investment
            });

            // 检查是否胜利
            const currentValue = cash + (shares * price);
            if (currentValue > initialCapital) {
              profitableTrades++;
            }
          } else if (point.type === '卖出' && shares > 0) {
            //获得最近一次买入价格
            const initialPrice = transactions[transactions.length - 1]?.price || price;
            //计算盈亏百分比
            const profitPercentage = ((price - initialPrice) / initialPrice) * 100;

            // 第1批：盈利5%时卖出1/3，止损3%
            if (profitPercentage >= 5 || profitPercentage <= -3) {
              const sharesToSell = shares / 3;
              const value = sharesToSell * price;
              cash += value;
              shares -= sharesToSell;

              transactions.push({
                date: point.time,
                type: '卖出',
                price,
                amount: value
              });

              totalTrades++;

              // 检查是否胜利
              const currentValue = cash + (shares * price);
              if (currentValue > initialCapital) {
                profitableTrades++;
              }
            }

            // 第2批：盈利10%时卖出1/3，止损5%
            if (profitPercentage >= 10 || profitPercentage <= -5) {
              const sharesToSell = shares / 3;
              const value = sharesToSell * price;
              cash += value;
              shares -= sharesToSell;

              transactions.push({
                date: point.time,
                type: '卖出',
                price,
                amount: value
              });

              totalTrades++;

              // 检查是否胜利
              const currentValue = cash + (shares * price);
              if (currentValue > initialCapital) {
                profitableTrades++;
              }
            }

            // 第3批：跟踪止盈（如跌破10日均线卖出），止损8%
            if (profitPercentage <= -8) {
              const value = shares * price;
              cash += value;
              shares = 0;

              transactions.push({
                date: point.time,
                type: '卖出',
                price,
                amount: value
              });

              totalTrades++;

              // 检查是否胜利
              const currentValue = cash + (shares * price);
              if (currentValue > initialCapital) {
                profitableTrades++;
              }
            }
          }

          // 更新净值
          equityCurve.push(cash + (shares * price));
        });

      // 计算收益率
      const totalReturn = cash + (shares * closePrices[closePrices.length - 1]) - initialCapital;
      const durationYears = (new Date(stockTimes[stockTimes.length - 1]) - new Date(stockTimes[0])) / (1000 * 3600 * 24 * 365);
      const annualizedReturn = durationYears > 0 ? (Math.pow((totalReturn + initialCapital) / initialCapital, 1 / durationYears) - 1) * 100 : 0;

      // 计算胜率
      const winRate = totalTrades >= 0 ? ((profitableTrades / totalTrades) * 100).toFixed(2) : 0;

      setBacktestResult({
        totalReturn,
        annualizedReturn: annualizedReturn.toFixed(2),
        winRate,
        transactions,
        equityCurve
      });
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
            <FormLabel id="demo-row-radio-buttons-group-label" style={{ padding:"20px 0px"}}>股票</FormLabel>
      <FormControl fullWidth>
      <InputLabel id="stock-select-label">选择股票文件</InputLabel>
      <Select
        labelId="stock-select-label"
        value={selectedFile1}
        label="选择股票文件"
        onChange={handleFileChange1}
        renderValue={(value) => {
          const stock = stockData.find(s => `${s.code.replace(':', '')}.csv` === value);
          return stock ? `${stock.name} (${stock.code})` : value;
        }}
      >
        {files.map((file) => {
          // 从文件名中提取股票代码（假设文件名格式为 SH600519.csv）
          const codeFromFile = file.split('.')[0];
          // 匹配股票数据
          const stock = stockData.find(s => s.code.replace(':', '') === codeFromFile);

          return (
            <MenuItem key={file} value={file}>
              {stock ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>{stock.name}</span>
                  <span style={{ color: '#666' }}>{stock.code}</span>
                </div>
              ) : (
                file // 如果没有匹配的股票数据，直接显示文件名
              )}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>

    </FormControl>
     <Button
       variant="contained"
       endIcon={<SendIcon />}
       onClick={handleGetDATA}
       sx={{ mt: 4 }}
     >
       获取指标图像
     </Button>
    <h2>指标图像</h2>
     {/* 条件渲染指标选择 */}
     {showIndicator && (
       <>
         <FormLabel id="demo-row-radio-buttons-group-label" style={{ padding: "10px 0px 10px 0px" }}>
           指标
         </FormLabel>
         <RadioGroup
           row
           aria-labelledby="demo-row-radio-buttons-group-label"
           name="row-radio-buttons-group"
           onChange={handleRadioChange1}
           value={selectedValue1}
         >
           <FormControlLabel value="MACD" control={<Radio />} label="MACD" />
           <FormControlLabel value="KDJ" control={<Radio />} label="KDJ" />
           <FormControlLabel value="RSI" control={<Radio />} label="RSI" />
           <FormControlLabel value="CCI" control={<Radio />} label="CCI" />
         </RadioGroup>
       </>
     )}

    {selectedValue1 && (
  <Box sx={{ width: '100%', mt: 0 }}>
    <Typography gutterBottom>数据范围选择</Typography>
    <Slider
      value={dataRange}
      onChange={handleSliderChange}
      valueLabelDisplay="auto"
      min={0}
      max={maxDataLength - 1}
      valueLabelFormat={(value) => {
        const dateArray = selectedValue1 === 'MACD' ? MACDS1.TIME :
                        selectedValue1 === 'KDJ' ? KDJS1.TIME :
                        selectedValue1 === 'RSI' ? RSIS1.TIME : CCIS1.TIME;
        return dateArray?.[value] || value;
      }}
      sx={{
        maxWidth: '90%',
        margin: '0 auto',
        '& .MuiSlider-thumb': {
          backgroundColor: '#1976d2',
        },
        '& .MuiSlider-track': {
          backgroundColor: '#1976d2',
        }
      }}
    />
  </Box>
)}

    {selectedValue1 === 'MACD' && (
      <Box>
        <LineChart
          height={400}
          series={[
            {
              data: getSlicedData(MACDS1.DEA),
              label: 'DEA',
              color: 'blue',
              showMark: false
            },
            {
              data: getSlicedData(MACDS1.DIF),
              label: 'DIF',
              color: 'orange',
              showMark: false
            },
          ]}
          xAxis={[{
            scaleType: 'point',
            data: getSlicedData(MACDS1.TIME),
            tickLabelStyle: {
              angle: 45,
              textAnchor: 'start',
              fontSize: 12
            }
          }]}
          margin={{ left: 70, right: 30, top: 30, bottom: 100 }}
        />
        <BarChart
          height={400}
          series={[
            {
              data: getSlicedData(MACDS1.MACD),
              label: 'MACD',
              color: 'green',
              highlightScope: { highlighted: 'series' }
            }
          ]}
          xAxis={[{
            scaleType: 'band',
            data: getSlicedData(MACDS1.TIME),
            tickLabelStyle: {
              angle: 45,
              textAnchor: 'start',
              fontSize: 12
            }
          }]}
          margin={{ left: 70, right: 30, top: 30, bottom: 100 }}
        />
      </Box>
    )}

    {selectedValue1 === 'KDJ' && (
      <Box>
        <LineChart
          height={400}
          series={[
            {
              data: getSlicedData(KDJS1.K),
              label: 'K',
              color: '#f6ae42',
              showMark: false
            },
            {
              data: getSlicedData(KDJS1.D),
              label: 'D',
              color: '#4788c4',
              showMark: false
            },
            {
              data: getSlicedData(KDJS1.J),
              label: 'J',
              color: '#d25cb3',
              showMark: false
            }
          ]}
          xAxis={[{
            scaleType: 'point',
            data: getSlicedData(KDJS1.TIME),
            tickLabelStyle: {
              angle: 45,
              textAnchor: 'start',
              fontSize: 12
            }
          }]}
          margin={{ left: 70, right: 30, top: 30, bottom: 100 }}
        />
      </Box>
    )}

    {selectedValue1 === 'RSI' && (
      <Box>
        <LineChart
          height={400}
          series={[
            {
              data: getSlicedData(RSIS1.RSI),
              label: 'RSI',
              color: '#f6ae42',
              showMark: false,
              curve: 'natural'
            }
          ]}
          xAxis={[{
            scaleType: 'point',
            data: getSlicedData(RSIS1.TIME),
            tickLabelStyle: {
              angle: 45,
              textAnchor: 'start',
              fontSize: 12
            }
          }]}
          yAxis={[{ min: 0, max: 100 }]}
          margin={{ left: 70, right: 30, top: 30, bottom: 100 }}
        />
      </Box>
    )}

    {selectedValue1 === 'CCI' && (
      <Box>
        <LineChart
          height={400}
          series={[
            {
              data: getSlicedData(CCIS1.CCI),
              label: 'CCI',
              color: 'blue',
              showMark: false,
              curve: 'natural'
            }
          ]}
          xAxis={[{
            scaleType: 'point',
            data: getSlicedData(CCIS1.TIME),
            tickLabelStyle: {
              angle: 45,
              textAnchor: 'start',
              fontSize: 12
            }
          }]}
          margin={{ left: 70, right: 30, top: 30, bottom: 100 }}
        />
      </Box>
    )}
    <h2>买卖操作</h2>
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

    <h2>策略回测</h2>
        <div>
        <div >
            投入金额:
        </div>
         <TextField
            label="输入理财金额"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
            sx={{ mt: 1 }}
          />
        </div>
         <div>
            能承担的风险:
        </div>
             <Select
               labelId="label"
               id="risk"
               value={risk} // 绑定 value 到状态
               onChange={handleRiskChange} // 绑定 onChange 事件
               label="能承担的风险"
               sx={{ mt: 1 }}
             >
               <MenuItem value="10">低</MenuItem>
               <MenuItem value="30">中</MenuItem>
               <MenuItem value="50">高</MenuItem>
             </Select>
             <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBacktest}
            sx={{ mb: 2 }}
          >
            开始回测
          </Button>

          {backtestResult.equityCurve.length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>回测结果</Typography>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary">总收益</Typography>
                      <Typography variant="h4" style={{ color: backtestResult.totalReturn >= 0 ? 'green' : 'red' }}>
                        {backtestResult.totalReturn.toFixed(2)}元
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary">年化收益率</Typography>
                      <Typography variant="h4" style={{ color: backtestResult.annualizedReturn >= 0 ? 'green' : 'red' }}>
                        {backtestResult.annualizedReturn}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary">胜率</Typography>
                      <Typography variant="h4">
                        {backtestResult.winRate}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>净值曲线</Typography>
              <LineChart
                height={300}
                series={[{
                  data: backtestResult.equityCurve,
                  label: '账户净值',
                  color: '#1976d2'
                }]}
                xAxis={[{
                  scaleType: 'point',
                  data: Array.from({length: backtestResult.equityCurve.length}, (_, i) => `节点${i+1}`)
                }]}
                sx={{ mb: 4 }}
              />

              <Typography variant="h6" gutterBottom>交易记录</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>时间</TableCell>
                      <TableCell>类型</TableCell>
                      <TableCell>价格（元）</TableCell>
                      <TableCell>金额（元）</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {backtestResult.transactions.map((tran, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{tran.date}</TableCell>
                        <TableCell style={{ color: tran.type === '买入' ? 'green' : 'red', fontWeight: 'bold' }}>
                          {tran.type}
                        </TableCell>
                        <TableCell>{tran.price.toFixed(2)}</TableCell>
                        <TableCell>{tran.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
    </box>
  </Grid>
  </Grid>

  );
}

export default StockAnalysisPage;
