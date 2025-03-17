import * as React from 'react';
import Button from '@mui/material/Button';
import '@fontsource/roboto/700.css';
import { useState,useEffect  } from 'react';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
import CountIcon from './images/count.png';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { styled } from '@mui/material/styles';

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
      { code: '00379', name: '恒嘉融资租赁' },
      { code: '.IXIC', name: '纳斯达克综合指数' },
    ];
    const comparisonConfigs = [
    // MACD配置
    {
      label: 'MACD短线(9,19,6)',
      type: 'MACD',
      params: { fast: 9, slow: 19, signal: 6 },
      buyCondition: (DIF, DEA) => DIF > DEA,
      sellCondition: (DIF, DEA) => DIF < DEA
    },
    {
      label: 'MACD中线(12,26,9)--默认参数',
      type: 'MACD',
      params: { fast: 12, slow: 26, signal: 9 },
      buyCondition: (DIF, DEA) => DIF > DEA,
      sellCondition: (DIF, DEA) => DIF < DEA
    },
    {
      label: 'MACD长线(24,52,18)',
      type: 'MACD',
      params: { fast: 24, slow: 52, signal: 18 },
      buyCondition: (DIF, DEA) => DIF > DEA,
      sellCondition: (DIF, DEA) => DIF < DEA
    },

    // RSI配置
    {
      label: 'RSI短线(6天)',
      type: 'RSI',
      params: { period: 6 },
      buyCondition: (RSI) => RSI < 30,
      sellCondition: (RSI) => RSI > 70
    },
    {
      label: 'RSI中线(12天)--默认参数',
      type: 'RSI',
      params: { period: 12 },
      buyCondition: (RSI) => RSI < 30,
      sellCondition: (RSI) => RSI > 70
    },
    {
      label: 'RSI长线(24天)',
      type: 'RSI',
      params: { period: 24 },
      buyCondition: (RSI) => RSI < 30,
      sellCondition: (RSI) => RSI > 70
    },

    // CCI配置
    {
      label: 'CCI短线(14天)--默认参数',
      type: 'CCI',
      params: { period: 14 },
      buyCondition: (CCI) => CCI > 100,
      sellCondition: (CCI) => CCI < -100
    },
    {
      label: 'CCI中线(20天)',
      type: 'CCI',
      params: { period: 20 },
      buyCondition: (CCI) => CCI > 100,
      sellCondition: (CCI) => CCI < -100
    },
    {
      label: 'CCI长线(30天)',
      type: 'CCI',
      params: { period: 30 },
      buyCondition: (CCI) => CCI > 100,
      sellCondition: (CCI) => CCI < -100
    },

    // KDJ配置
    {
      label: 'KDJ短线(6天)',
      type: 'KDJ',
      params: { period: 6 },
      buyCondition: (K, D) => K > D,
      sellCondition: (K, D) => K < D
    },
    {
      label: 'KDJ中线(9天)--默认参数',
      type: 'KDJ',
      params: { period: 9 },
      buyCondition: (K, D) => K > D,
      sellCondition: (K, D) => K < D
    },
    {
      label: 'KDJ长线(14天)',
      type: 'KDJ',
      params: { period: 14 },
      buyCondition: (K, D) => K > D,
      sellCondition: (K, D) => K < D
    }
  ];

    // 新增样式组件用于对比布局
    const ComparisonContainer = styled('div')({
      display: 'flex',
      gap: '2rem',
      marginTop: '2rem'
    });

    const StrategyColumn = styled('div')({
      flex: 1,
      padding: '1rem',
      border: '1px solid #e0e0e0',
      borderRadius: '8px'
    });

//股票分析页面
function StockAnalysisPage() {
    const [showIndicator, setShowIndicator] = useState(false);
    const [files, setFiles] = useState([]); // 假设您已经定义了这个状态来存储文件名
    const [comparisonResults, setComparisonResults] = useState([]);
    // 新增状态管理数据范围
    const [dataRange, setDataRange] = useState([0, 100]);
    const [maxDataLength, setMaxDataLength] = useState(100);
    const [isComparing, setIsComparing] = useState(false);
    const [buyPoints, setBuyPoints] = useState([]); // 买入点时间
    const [bestbuyPoints, setBestBuyPoints] = useState([]); // 买入点时间
    const [sellPoints, setSellPoints] = useState([]); // 卖出点时间
    const [bestsellPoints, setBestSellPoints] = useState([]); // 卖出点时间
    const [selectedFile1, setSelectedFile1] = useState(files[0]);
    const [selectedValue1, setSelectedValue1] = useState('');
    const [inputValue, setinputValue] = useState([]); // 投资金额
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
    const [bestBacktestResult, setBestBacktestResult] = useState({
        totalReturn: 0,
        annualizedReturn: 0,
        winRate: 0,
        transactions: [],
        equityCurve: []
    });
    // 在获取数据后计算最优参数并打印
    const bestParams = {
      MACD: null,
      RSI: null,
      CCI: null,
      KDJ: null
    };
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

    //问题：最优参数
    //计算每种股票每种参数的买入卖出点，并进行回测，选出最优参数
    const handleCompareStrategies = async (closePrices, stockTimes) => {
     setIsComparing(true);

     const results = [];

     // 新增：定义各指标类型的最佳结果存储对象
     const bestByType = {
       MACD: { returnRate: -Infinity, data: null, config: null },
       RSI: { returnRate: -Infinity, data: null, config: null },
       CCI: { returnRate: -Infinity, data: null, config: null },
       KDJ: { returnRate: -Infinity, data: null, config: null },
     };

     for (const config of comparisonConfigs) {
       try {
         let data;
         switch (config.type) {
           case 'MACD':
             const macdRes = await fetch(
               `http://localhost:5000/getDataMACD?selectedFile=${selectedFile1}&fast=${config.params.fast}&slow=${config.params.slow}&signal=${config.params.signal}`
             );
             data = await macdRes.json();
             break;
           case 'RSI':
             const rsiRes = await fetch(
               `http://localhost:5000/getDataRSI?selectedFile=${selectedFile1}&period=${config.params.period}`
             );
             data = await rsiRes.json();
             break;
           case 'CCI':
             const cciRes = await fetch(
               `http://localhost:5000/getDataCCI?selectedFile=${selectedFile1}&period=${config.params.period}`
             );
             data = await cciRes.json();
             break;
           case 'KDJ':
             const kdjRes = await fetch(
               `http://localhost:5000/getDataKDJ?selectedFile=${selectedFile1}&period=${config.params.period}`
             );
             data = await kdjRes.json();
             break;
         }

         const buyPoints = [];
         const sellPoints = [];
         switch (config.type) {
           case 'MACD':
             for (let i = 1; i < data.DIF.length; i++) {
               const prevDIF = data.DIF[i - 1];
               const currDIF = data.DIF[i];
               const prevDEA = data.DEA[i - 1];
               const currDEA = data.DEA[i];

               if (prevDIF < prevDEA && currDIF > currDEA) {
                 buyPoints.push({ time: data.TIME[i], type: '买入' });
               }
               if (prevDIF > prevDEA && currDIF < currDEA) {
                 sellPoints.push({ time: data.TIME[i], type: '卖出' });
               }
             }
             break;

           case 'RSI':
             data.RSI.forEach((rsi, i) => {
               if (config.buyCondition(rsi)) {
                 buyPoints.push({ time: data.TIME[i], type: '买入' });
               }
               if (config.sellCondition(rsi)) {
                 sellPoints.push({ time: data.TIME[i], type: '卖出' });
               }
             });
             break;

           case 'CCI':
             data.CCI.forEach((cci, i) => {
               if (config.buyCondition(cci)) {
                 buyPoints.push({ time: data.TIME[i], type: '买入' });
               }
               if (config.sellCondition(cci)) {
                 sellPoints.push({ time: data.TIME[i], type: '卖出' });
               }
             });
             break;

           case 'KDJ':
             for (let i = 1; i < data.K.length; i++) {
               const prevK = data.K[i - 1];
               const currK = data.K[i];
               const prevD = data.D[i - 1];
               const currD = data.D[i];

               if (prevK < prevD && currK >= currD) {
                 buyPoints.push({ time: data.TIME[i], type: '买入' });
               }
               if (prevK > prevD && currK <= currD) {
                 sellPoints.push({ time: data.TIME[i], type: '卖出' });
               }
             }
             break;
         }

         const result = await runBacktest(
           buyPoints,
           sellPoints,
           closePrices,
           stockTimes,
           100000,
           risk
         );

         results.push({
           type: config.type,
           config: config,
           data: data,
           returnRate: result.annualizedReturn
         });

         if (result.annualizedReturn > bestByType[config.type].returnRate) {
           bestByType[config.type] = {
             returnRate: result.annualizedReturn,
             data: data,
             config: config
           };
         }

       } catch (error) {
         console.error(`策略 ${config.label} 回测失败:`, error);
       }
     }

     const bestResult = results.reduce((max, curr) =>
       curr.returnRate > max.returnRate ? curr : max,
       { returnRate: -Infinity }
     );

     setComparisonResults(results.map(r => ({
       ...r,
       isBest: r.label === bestResult.label
     })));
     setIsComparing(false);

     // 返回结果
     return results;
    };

    // 计算最优参数的买入卖出点
    const calculateBestPoints = (bestParams) => {
    const bestBuyPoints = [];
    const bestSellPoints = [];

    // 获取各指标最优参数数据
    const macdData = bestParams.MACD?.data || {};
    const kdjData = bestParams.KDJ?.data || {};
    const rsiData = bestParams.RSI?.data || {};
    const cciData = bestParams.CCI?.data || {};

    // 确保数据存在且长度一致
    const dataLength = Math.min(
      macdData.DIF?.length || 0,
      kdjData.K?.length || 0,
      rsiData.RSI?.length || 0,
      cciData.CCI?.length || 0
    );

    for (let i = 1; i < dataLength; i++) {
      // MACD指标
      const prevDIF = macdData.DIF[i - 1];
      const currDIF = macdData.DIF[i];
      const prevDEA = macdData.DEA[i - 1];
      const currDEA = macdData.DEA[i];

      // KDJ指标
      const prevK = kdjData.K[i - 1];
      const currK = kdjData.K[i];
      const prevD = kdjData.D[i - 1];
      const currD = kdjData.D[i];

      // RSI指标
      const currRSI = rsiData.RSI[i];

      // CCI指标
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
          bestBuyPoints.push({
              time: macdData.TIME[i],
              type: '买入',
              indicators: [
                  'MACD金叉',
                  'KDJ金叉',
                  currCCI > 100 ? 'CCI突破' : 'RSI超卖'
              ]
          });
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
          bestSellPoints.push({
              time: macdData.TIME[i],
              type: '卖出',
              indicators: [
                  'MACD死叉',
                  'KDJ死叉',
                  currCCI < -100 ? 'CCI跌破' : 'RSI超买'
              ]
          });
      }
    }

  return { bestBuyPoints, bestSellPoints };
};

    // 处理 RadioGroup 变化的函数
    const handleRadioChange1 = (event) => {
      // 更新状态变量为选中的值
      setSelectedValue1(event.target.value);
    };

    //默认参数回测函数
    const runBacktest = async (buyPoints, sellPoints, closePrices, stockTimes, initialCapital, riskLevel) => {
       let cash = initialCapital;
       let shares = 0;
       let totalTrades = 0;
       let profitableTrades = 0;
       const transactions = [];

       const positionSizeMap = { 10: 0.3, 30: 0.5, 50: 0.7 };
       const positionSize = positionSizeMap[riskLevel] || 0.5;

       const timeIndexMap = new Map();
       stockTimes.forEach((time, index) => {
         timeIndexMap.set(time, index);
       });

       [...buyPoints, ...sellPoints]
         .sort((a, b) => new Date(a.time) - new Date(b.time))
         .forEach((point) => {
           const index = timeIndexMap.get(point.time);
           if (index === undefined || index >= closePrices.length) return;

           const price = closePrices[index];

           if (point.type === '买入' && cash > 0) {
             const investment = cash * positionSize;
             const sharesBought = investment / price;
             shares += sharesBought;
             cash -= investment;
             totalTrades++;

             transactions.push({
               date: point.time,
               type: '买入',
               price,
               amount: investment,
             });

             const currentValue = cash + shares * price;
             if (currentValue > initialCapital) {
               profitableTrades++;
             }
           } else if (point.type === '卖出' && shares > 0) {
             const initialPrice = transactions[transactions.length - 1]?.price || price;
             const profitPercentage = ((price - initialPrice) / initialPrice) * 100;

             if (profitPercentage >= 5 || profitPercentage <= -3) {
               const sharesToSell = shares / 3;
               const value = sharesToSell * price;
               cash += value;
               shares -= sharesToSell;
               totalTrades++;

               const currentValue = cash + shares * price;
               if (currentValue > initialCapital) {
                 profitableTrades++;
               }
             }

             if (profitPercentage >= 10 || profitPercentage <= -5) {
               const sharesToSell = shares / 3;
               const value = sharesToSell * price;
               cash += value;
               shares -= sharesToSell;
               totalTrades++;

               const currentValue = cash + shares * price;
               if (currentValue > initialCapital) {
                 profitableTrades++;
               }
             }

             if (profitPercentage <= -8) {
               const value = shares * price;
               cash += value;
               shares = 0;
               totalTrades++;

               const currentValue = cash + shares * price;
               if (currentValue > initialCapital) {
                 profitableTrades++;
               }
             }
           }
         });

       const totalReturn = cash + shares * closePrices[closePrices.length - 1] - initialCapital;

       const durationYears = (new Date(stockTimes[stockTimes.length - 1]) - new Date(stockTimes[0])) / (1000 * 3600 * 24 * 365);

       const annualizedReturn = ( durationYears > 0 && initialCapital > 0 )? (Math.pow((totalReturn + initialCapital) / initialCapital, 1 / durationYears) - 1) * 100 : 0;

       const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;

       return {
         totalReturn,
         annualizedReturn,
         winRate,
       };
     };

    //获取Csv文件
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

    // 点击更改股票时的处理逻辑
    const handleFileChange1 = (value) => {  // 直接接收value参数
        const newSelectedFile1 = value;     // 不再需要event.target.value

        // 后续保持原有重置逻辑
        setMACDS1({ DIF: [null], DEA: [null], MACD: [null], TIME: [null] });
        setRSIS1({ K: [null], D: [null], J: [null], TIME: [null] });
        setKDJS1({ RSI: [null], TIME: [null] });
        setCCIS1({ CCI: [null], TIME: [null] });
        setSelectedFile1(newSelectedFile1);
    };

    // 新增滑动条变化处理
     const handleSliderChange = (event, newValue) => {
       setDataRange(newValue);
     };

     // 生成切片后的数据
     const getSlicedData = (dataArray) => {
       return dataArray.slice(dataRange[0], dataRange[1] + 1);
     };

    //获取股票数据并计算默认参数买入卖出点,以及获取最优参数并打印到控制台
    const handleGetDATA = async () => {
      try {
        // 获取价格数据
        const priceUrl = `http://localhost:5000/getStockPrice?selectedFile=${selectedFile1}`;
        const priceResponse = await fetch(priceUrl);
        const priceData = await priceResponse.json();

        // 从响应中直接获取数据
        const closePrices = priceData.closePrices;
        const stockTimes = priceData.times;

        setShowIndicator(true); // 显示指标选择

        // 确保数据有效
        if (!priceData.closePrices || !priceData.times) {
          throw new Error('价格数据格式错误');
        }

        // 更新状态
        setClosePrices(priceData.closePrices);
        setStockTimes(priceData.times);

        // 获取 MACD 数据
        let macdUrl = `http://localhost:5000/getDataMACD?selectedFile=${selectedFile1}&fast=12&slow=26&signal=9`;
        let macdResponse = await fetch(macdUrl);
        let macdRawData = await macdResponse.text();
        let macdData = JSON.parse(macdRawData.replace(/NaN/g, 'null'));
        setMACDS1(macdData);

        // 获取 KDJ 数据
        let kdjUrl = `http://localhost:5000/getDataKDJ?selectedFile=${selectedFile1}&period=9`;
        let kdjResponse = await fetch(kdjUrl);
        let kdjRawData = await kdjResponse.text();
        let kdjData = JSON.parse(kdjRawData.replace(/NaN/g, 'null'));
        setKDJS1(kdjData);

        // 获取 RSI 数据
        let rsiUrl = `http://localhost:5000/getDataRSI?selectedFile=${selectedFile1}&period=12`;
        let rsiResponse = await fetch(rsiUrl);
        let rsiRawData = await rsiResponse.text();
        let rsiData = JSON.parse(rsiRawData.replace(/NaN/g, 'null'));
        setRSIS1(rsiData);

        // 获取 CCI 数据
        let cciUrl = `http://localhost:5000/getDataCCI?selectedFile=${selectedFile1}&period=14`;
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

        setSelectedValue1("MACD");

        setBuyPoints(buyPoints1);
        setSellPoints(sellPoints1);

        // 新增：在获取数据后计算最优参数并打印
        // 处理对比结果的代码
        const comparisonResults = await handleCompareStrategies(closePrices, stockTimes);

        const bestParams = comparisonResults.reduce((acc, result) => {
          if (!acc[result.type] || result.returnRate > acc[result.type].returnRate) {
            acc[result.type] = {
              params: result.config.params,
              data: result.data,
              returnRate: result.returnRate
            };
          }
          return acc;
        }, {});

        // 打印到控制台
        Object.entries(bestParams).forEach(([type, data]) => {
          console.log(`最优${type}参数:`, data.params);
          console.log(`${type}年化收益率:`, data.returnRate.toFixed(2));
          console.log(`${type}数据:`, data.data);
        });

        // 计算最优参数买卖点
        const { bestBuyPoints, bestSellPoints } = calculateBestPoints(bestParams);
         // 设置状态
        setBestBuyPoints(bestBuyPoints);
        setBestSellPoints(bestSellPoints);

        // 去重处理
        const uniquePoints = [...bestBuyPoints, ...bestSellPoints]
          .filter((v, i, a) => a.findIndex(t => t.time === v.time && t.type === v.type) === i)
          .sort((a, b) => new Date(a.time) - new Date(b.time));

        setBestBuyPoints(uniquePoints.filter(p => p.type === '买入'));
        setBestSellPoints(uniquePoints.filter(p => p.type === '卖出'));

      } catch (error) {
        console.error('请求失败:', error);
      }
    };

    //删除股票文件
    const handleDeleteStock = async (filename) => {
      try {
        // 调用后端接口删除文件
        const response = await fetch(`http://localhost:5000/deleteCsvFile?filename=${filename}`, {method: 'DELETE'})

        if (response.ok) {
          // 更新前端文件列表
          setFiles(prev => prev.filter(file => file !== filename));
          // 如果删除的是当前选中文件，清空选中状态
          if (selectedFile1 === filename) {
            setSelectedFile1('');
          }
          alert('删除成功');
        } else {
          alert('删除失败');
        }
      } catch (error) {
        console.error('删除失败:', error);
        alert('删除失败');
      }
    };
    //根据最优买入卖出点计算收益
    const handleBestBacktest = async () => {
      if (!inputValue || !closePrices.length) return;

      const timeIndexMap = new Map();
      stockTimes.forEach((time, index) => {
        timeIndexMap.set(time, index);
      });

      const initialCapital = parseFloat(inputValue);
      let cash = initialCapital;
      let shares = 0;
      let totalTrades = 0;
      let profitableTrades = 0;
      const equityCurve = [{ value: initialCapital, date: "初始资金" }];
      const transactions = [];
      const positionSizeMap = { 10: 0.3, 30: 0.5, 50: 0.7 };
      const positionSize = positionSizeMap[risk] || 0.5;
      const transactionCost = 5;
      const slippage = 0.001;
      let buyBatches = [];

      // 使用最优参数的买卖点
      [...bestbuyPoints, ...bestsellPoints]
        .sort((a, b) => new Date(a.time) - new Date(b.time))
        .forEach((point) => {
          const index = timeIndexMap.get(point.time);
          if (index === undefined || index >= closePrices.length) return;

          // 获取当前价格（考虑滑点）
          const price = closePrices[index];
          const executedPrice =
            point.type === "买入" ? price * (1 + slippage) : price * (1 - slippage);

          // 买入逻辑
          if (point.type === "买入" && cash > 0) {
            // 计算最大可投资金额
            const maxInvest = (cash + shares * executedPrice) * positionSize;
            const requiredCash = maxInvest + transactionCost;

            // 检查资金是否足够
            if (cash >= requiredCash) {
              const sharesBought = maxInvest / executedPrice;
              cash -= requiredCash; // 扣除本金+手续费
              shares += sharesBought;

              // 记录买入批次
              buyBatches.push({
                shares: sharesBought,
                costBasis: maxInvest + transactionCost, // 记录成本
              });

              // 记录交易
              transactions.push({
                date: point.time,
                type: "买入",
                price: executedPrice,
                amount: maxInvest,
              });

              // 更新净值曲线
              equityCurve.push({
                value: cash + shares * executedPrice,
                date: point.time,
              });
            }
          }

          // 卖出逻辑
          else if (point.type === "卖出" && shares > 0) {
            // 按持仓比例卖出（例如30%）
            const sellRatio = 0.3;
            const positionValue = shares * executedPrice;
            const targetValue = positionValue * sellRatio;

            // 检查卖出金额是否足够支付手续费
            if (targetValue > transactionCost) {
              const sharesToSell = (targetValue - transactionCost) / executedPrice;
              let sharesSold = 0;
              let costBasis = 0;

              // 遍历买入批次计算成本（先进先出）
              while (sharesSold < sharesToSell && buyBatches.length > 0) {
                const batch = buyBatches[0];
                const sellAmount = Math.min(batch.shares, sharesToSell - sharesSold);

                // 按比例计算成本
                costBasis += (sellAmount / batch.shares) * batch.costBasis;
                sharesSold += sellAmount;

                // 更新批次
                if (batch.shares === sellAmount) {
                  buyBatches.shift();
                } else {
                  batch.shares -= sellAmount;
                  batch.costBasis -= (sellAmount / batch.shares) * batch.costBasis;
                }
              }

              // 计算实际卖出金额
              const sellValue = sharesSold * executedPrice - transactionCost;
              const isWin = sellValue > costBasis;

              // 更新统计
              if (isWin) profitableTrades++;
              totalTrades++;
              cash += sellValue;
              shares -= sharesSold;

              // 记录交易
              transactions.push({
                date: point.time,
                type: "卖出",
                price: executedPrice,
                amount: sellValue,
              });

              // 更新净值曲线
              equityCurve.push({
                value: cash + shares * executedPrice,
                date: point.time,
              });
            }
          }
        });

    // 处理所有交易点后强制平仓
      if (shares > 0) {
        const finalPrice = closePrices[closePrices.length - 1];
        const finalTransactionCost = transactionCost;

        // 确保最终卖出金额足够支付手续费
        if (shares * finalPrice > finalTransactionCost) {
          const sellValue = shares * finalPrice - finalTransactionCost;
          cash += sellValue;

          // 记录交易
          transactions.push({
            date: stockTimes[stockTimes.length - 1],
            type: "卖出",
            price: finalPrice,
            amount: sellValue,
          });

          // 更新净值曲线
          equityCurve.push({
            value: cash,
            date: stockTimes[stockTimes.length - 1],
          });
          shares = 0;
        }
      }

      // 计算总收益
      const totalReturn = cash - initialCapital;

    const durationYears = (new Date(stockTimes[stockTimes.length - 1]) - new Date(stockTimes[0])) / (1000 * 3600 * 24 * 365);
    const annualizedReturn = durationYears > 0 ? ((Math.pow((totalReturn + initialCapital) / initialCapital, 1 / durationYears) - 1) * 100).toFixed(2) : 0;

      // 计算胜率
      const winRate = totalTrades > 0 ? ((profitableTrades / totalTrades) * 100).toFixed(2) : 0;


      setBestBacktestResult({
        totalReturn,
        annualizedReturn,
        winRate,
        transactions,
        equityCurve: equityCurve.map((item, index) => ({
          ...item,
          label: index === 0 ? "初始资金" : item.date,
        })),
      });
    };
    //根据默认买入卖出点计算收益
    const handleBacktest = async () => {
      // 检查输入是否有效
      if (!inputValue || !closePrices.length) return;

      // 定义时间索引映射
      const timeIndexMap = new Map();
      stockTimes.forEach((time, index) => {
        timeIndexMap.set(time, index);
      });

      // 初始化变量
      const initialCapital = parseFloat(inputValue); // 初始资金
      let cash = initialCapital; // 当前现金
      let shares = 0; // 当前持仓股数
      let totalTrades = 0; // 总交易次数
      let profitableTrades = 0; // 盈利交易次数
      const equityCurve = [{ value: initialCapital, date: "初始资金" }]; // 净值曲线
      const transactions = []; // 交易记录
      const positionSizeMap = { 10: 0.3, 30: 0.5, 50: 0.7 }; // 风险等级对应的仓位比例
      const positionSize = positionSizeMap[risk] || 0.5; // 当前仓位比例

      // 交易成本常量
      const transactionCost = 5; // 每笔交易成本5元
      const slippage = 0.001; // 滑点比例（0.1%）

      // 记录买入批次队列（先进先出）
      let buyBatches = [];

      // 处理所有交易点（按时间排序）
      [...buyPoints, ...sellPoints]
        .sort((a, b) => new Date(a.time) - new Date(b.time))
        .forEach((point) => {
          const index = timeIndexMap.get(point.time);
          if (index === undefined || index >= closePrices.length) return;

          // 获取当前价格（考虑滑点）
          const price = closePrices[index];
          const executedPrice =
            point.type === "买入" ? price * (1 + slippage) : price * (1 - slippage);

          // 买入逻辑
          if (point.type === "买入" && cash > 0) {
            // 计算最大可投资金额
            const maxInvest = (cash + shares * executedPrice) * positionSize;
            const requiredCash = maxInvest + transactionCost;

            // 检查资金是否足够
            if (cash >= requiredCash) {
              const sharesBought = maxInvest / executedPrice;
              cash -= requiredCash; // 扣除本金+手续费
              shares += sharesBought;

              // 记录买入批次
              buyBatches.push({
                shares: sharesBought,
                costBasis: maxInvest + transactionCost, // 记录成本
              });

              // 记录交易
              transactions.push({
                date: point.time,
                type: "买入",
                price: executedPrice,
                amount: maxInvest,
              });

              // 更新净值曲线
              equityCurve.push({
                value: cash + shares * executedPrice,
                date: point.time,
              });
            }
          }

          // 卖出逻辑
          else if (point.type === "卖出" && shares > 0) {
            // 按持仓比例卖出（例如30%）
            const sellRatio = 0.3;
            const positionValue = shares * executedPrice;
            const targetValue = positionValue * sellRatio;

            // 检查卖出金额是否足够支付手续费
            if (targetValue > transactionCost) {
              const sharesToSell = (targetValue - transactionCost) / executedPrice;
              let sharesSold = 0;
              let costBasis = 0;

              // 遍历买入批次计算成本（先进先出）
              while (sharesSold < sharesToSell && buyBatches.length > 0) {
                const batch = buyBatches[0];
                const sellAmount = Math.min(batch.shares, sharesToSell - sharesSold);

                // 按比例计算成本
                costBasis += (sellAmount / batch.shares) * batch.costBasis;
                sharesSold += sellAmount;

                // 更新批次
                if (batch.shares === sellAmount) {
                  buyBatches.shift();
                } else {
                  batch.shares -= sellAmount;
                  batch.costBasis -= (sellAmount / batch.shares) * batch.costBasis;
                }
              }

              // 计算实际卖出金额
              const sellValue = sharesSold * executedPrice - transactionCost;
              const isWin = sellValue > costBasis;

              // 更新统计
              if (isWin) profitableTrades++;
              totalTrades++;
              cash += sellValue;
              shares -= sharesSold;

              // 记录交易
              transactions.push({
                date: point.time,
                type: "卖出",
                price: executedPrice,
                amount: sellValue,
              });

              // 更新净值曲线
              equityCurve.push({
                value: cash + shares * executedPrice,
                date: point.time,
              });
            }
          }
        });

      // 处理所有交易点后强制平仓
      if (shares > 0) {
        const finalPrice = closePrices[closePrices.length - 1];
        const finalTransactionCost = transactionCost;

        // 确保最终卖出金额足够支付手续费
        if (shares * finalPrice > finalTransactionCost) {
          const sellValue = shares * finalPrice - finalTransactionCost;
          cash += sellValue;

          // 记录交易
          transactions.push({
            date: stockTimes[stockTimes.length - 1],
            type: "卖出",
            price: finalPrice,
            amount: sellValue,
          });

          // 更新净值曲线
          equityCurve.push({
            value: cash,
            date: stockTimes[stockTimes.length - 1],
          });
          shares = 0;
        }
      }

      // 计算总收益
      const totalReturn = cash - initialCapital;

      const durationYears = (new Date(stockTimes[stockTimes.length - 1]) - new Date(stockTimes[0])) / (1000 * 3600 * 24 * 365);
      const annualizedReturn = durationYears > 0 ? ((Math.pow((totalReturn + initialCapital) / initialCapital, 1 / durationYears) - 1) * 100).toFixed(2) : 0;

      // 计算胜率
      const winRate = totalTrades > 0 ? ((profitableTrades / totalTrades) * 100).toFixed(2) : 0;

      // 设置回测结果
      setBacktestResult({
        totalReturn,
        annualizedReturn,
        winRate,
        transactions,
        equityCurve: equityCurve.map((item, index) => ({
          ...item,
          label: index === 0 ? "初始资金" : item.date,
        })),
      });
    };

    // 前端股票代码处理函数（需与Python版process_stock_code逻辑一致）
    const processStockCode = (code) => {
      // 港股处理 HK:00379 → 00379
      if (code.startsWith("HK:")) return code.slice(3);

      // 美股处理 NASDAQ:.IXIC → NASDAQ.IXIC
      if (code.startsWith("NASDAQ:") || code.startsWith("NYSE:") || code.startsWith("AMEX:")) {
        return code.replace(':', '.'); // 将冒号替换为点
      }

      // 沪深处理（移除所有冒号）SH::600000 → SH600000
      return code.replace(/:/g, "");
    };

    useEffect(() => {
      handleGetCsvFiles();
    }, []); // 空依赖数组表示仅在组件挂载时执行


  return (
  <Grid container spacing={1}>
  <Grid size={100} style={{ width:"100%",padding:"10px 20px"}}>
    <box style={{ padding:"10px 20px",display:"flex",flexDirection:"column"}}>
    <FormControl>
      <h1>股票多指标分析</h1>
       <h2>自选股列表</h2>
        <FormControl fullWidth>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              maxHeight: 400,
              overflow: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              backgroundColor: '#fafafa'
            }}
          >
            <RadioGroup
              aria-label="stock-select"
              value={selectedFile1}
              onChange={(e) => handleFileChange1(e.target.value)}
            >
              {files.map((file) => {
                const codeFromFile = file.split('.')[0];
                const processedStockCodes = stockData.map(s => ({
                  ...s,
                  processedCode: processStockCode(s.code)
                }));
                const stock = processedStockCodes.find(s => s.processedCode === codeFromFile);

                return (
                  <Paper
                      key={file}
                      elevation={0}
                      sx={{
                        mb: 1,
                        p: 1.5,
                        borderRadius: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: '#f5f5f5'
                        },
                        backgroundColor: selectedFile1 === file ? '#e3f2fd' : 'transparent',
                        border: '1px solid',
                        borderColor: selectedFile1 === file ? '#2196f3' : 'transparent',
                        position: 'relative' // 新增定位
                      }}
                    >
                      <Box sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        display: 'flex',
                        gap: 1
                      }}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStock(file);
                          }}
                          sx={{
                            minWidth: 60,
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                          }}
                        >
                          删除
                        </Button>
                      </Box>
                    <FormControlLabel
                      value={file}
                      control={<Radio color="primary" />}
                      label={
                        stock ? (
                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center'
                          }}>
                            <Typography variant="subtitle1">{stock.name}</Typography>
                          </Box>
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'text.disabled',
                              fontStyle: 'italic'
                            }}
                          >
                            {file}
                          </Typography>
                        )
                      }
                      sx={{
                        width: '100%',
                        m: 0,
                        '& .MuiFormControlLabel-label': {
                          width: '100%'
                        }
                      }}
                    />
                  </Paper>
                );
              })}
            </RadioGroup>
          </Paper>
        </FormControl>

    </FormControl>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // 水平居中
        mt: 4, // 上边距
      }}
    >
      <Button
        variant="contained"
        size="small" // 设置按钮为小尺寸
        endIcon={<img src={CountIcon} alt="date" style={{ width: '24px', height: '24px' }} />}
        onClick={handleGetDATA}
        sx={{
          width: '200px', // 自定义宽度
          height: '40px', // 自定义高度
          fontSize: '0.875rem', // 调整字体大小
        }}
      >
        计算股票指标
      </Button>
    </Box>
    <h2>指标图像</h2>
     {/* 条件渲染指标选择 */}
     {showIndicator && (
       <>
         <RadioGroup
           row
           aria-labelledby="demo-row-radio-buttons-group-label"
           name="row-radio-buttons-group"
           onChange={handleRadioChange1}
           value={selectedValue1}
           sx={{ width: '100%', ml: '3%' }}
         >
           <FormControlLabel value="MACD" control={<Radio />} label="MACD（12,26,9）" />
           <FormControlLabel value="KDJ" control={<Radio />} label="KDJ（9）" />
           <FormControlLabel value="RSI" control={<Radio />} label="RSI（12）" />
           <FormControlLabel value="CCI" control={<Radio />} label="CCI（14）" />
         </RadioGroup>
       </>
     )}

    {selectedValue1 && (
  <Box sx={{ width: '100%', ml: '3%' }}>
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


    <h2>根据多指标共振买卖操作</h2>
         {/* 添加表格显示买入卖出点 */}
         <Grid container spacing={3} sx={{ mt: 1 }}>
         {/* 默认参数交易记录 */}
           <Grid item xs={6}>
             <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
               <TrendingUpIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
               默认参数交易记录
             </Typography>
           <TableContainer
           component={Paper}
           sx={{
             mt: 4,
             borderRadius: 2,
             boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
             overflow: 'hidden'
           }}
         >
           <Table aria-label="交易点表格">
             <TableHead>
               <TableRow sx={{
                 backgroundColor: (theme) => theme.palette.primary.main,
                 '& th': {
                   color: '#fff',
                   fontSize: '0.95rem',
                   fontWeight: 500
                 }
               }}>
                 <TableCell align="center" sx={{ width: '15%' }}>序号</TableCell>
                 <TableCell align="center" sx={{ width: '35%' }}>交易时间</TableCell>
                 <TableCell align="center" sx={{ width: '30%' }}>操作类型</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {[...buyPoints, ...sellPoints]
                 .sort((a, b) => new Date(a.time) - new Date(b.time))
                 .map((point, index) => (
                   <TableRow
                     key={index}
                     hover
                     sx={{
                       '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' },
                       '&:last-child td': { border: 0 }
                     }}
                   >
                     <TableCell align="center" sx={{ color: 'text.secondary' }}>
                       {index + 1}
                     </TableCell>
                     <TableCell align="center" sx={{ fontWeight: 500 }}>
                       {point.time}
                     </TableCell>
                     <TableCell align="center">
                       <Box
                         sx={{
                           display: 'inline-flex',
                           alignItems: 'center',
                           px: 1.5,
                           py: 0.5,
                           borderRadius: 1,
                           backgroundColor: point.type === '买入' ?
                             'rgba(76, 175, 80, 0.1)' :
                             'rgba(244, 67, 54, 0.1)',
                           color: point.type === '买入' ?
                             (theme) => theme.palette.success.main :
                             (theme) => theme.palette.error.main
                         }}
                       >
                         {point.type === '买入' ? (
                           <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                         ) : (
                           <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                         )}
                         <Typography variant="body2" fontWeight="500">
                           {point.type}
                         </Typography>
                       </Box>
                     </TableCell>
                   </TableRow>
                 ))}
             </TableBody>
           </Table>
         </TableContainer>
        </Grid>

      {/* 最优参数交易记录 */}
      <Grid item xs={6}>
        <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
          <TrendingUpIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          最优参数交易记录
        </Typography>
              <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}
    >
      <Table aria-label="交易点表格">
        <TableHead>
          <TableRow sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            '& th': {
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 500
            }
          }}>
            <TableCell align="center" sx={{ width: '15%' }}>序号</TableCell>
            <TableCell align="center" sx={{ width: '35%' }}>交易时间</TableCell>
            <TableCell align="center" sx={{ width: '30%' }}>操作类型</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {[...bestbuyPoints, ...bestsellPoints]
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .map((point, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  '&:nth-of-type(even)': { backgroundColor: '#f8f9fa' },
                  '&:last-child td': { border: 0 }
                }}
              >
                <TableCell align="center" sx={{ color: 'text.secondary' }}>
                  {index + 1}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  {point.time}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: point.type === '买入' ?
                        'rgba(76, 175, 80, 0.1)' :
                        'rgba(244, 67, 54, 0.1)',
                      color: point.type === '买入' ?
                        (theme) => theme.palette.success.main :
                        (theme) => theme.palette.error.main
                    }}
                  >
                    {point.type === '买入' ? (
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    ) : (
                      <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                    )}
                    <Typography variant="body2" fontWeight="500">
                      {point.type}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Grid>
    </Grid>

    <h2>策略回测对比</h2>
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
            onClick={() => {
              handleBacktest();
              handleBestBacktest();
            }}
            sx={{ mb: 2 }}
          >
            开始回测
          </Button>
      <ComparisonContainer>
        <StrategyColumn>
          <Typography variant="h6" gutterBottom>
            默认参数策略
            <TrendingUpIcon color="primary" sx={{ ml: 1 }} />
          </Typography>
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
                   series={[
                     {
                       data: backtestResult.equityCurve.map((item) => item.value),
                       label: '账户净值',
                       color: '#1976d2',
                       showMark: ({ index }) =>
                         index === 0 || index === backtestResult.equityCurve.length - 1, // 只显示初始和最终点
                     },
                   ]}
                   xAxis={[
                     {
                       scaleType: 'point',
                       data: backtestResult.equityCurve.map((item) => item.label),
                       tickLabelStyle: {
                         angle: 45,
                         textAnchor: 'start',
                         fontSize: 12,
                       },
                     },
                   ]}
                   sx={{
                     mb: 4,
                     '& .MuiChartsAxis-tickLabel': {
                       maxWidth: 100,
                       whiteSpace: 'nowrap',
                       overflow: 'hidden',
                       textOverflow: 'ellipsis',
                     },
                   }}
                   tooltip={{ trigger: 'item' }} // 启用工具提示
                   slotProps={{
                     tooltip: {
                       // 自定义工具提示内容
                       formatter: (value, context) => {
                         const dataPoint = backtestResult.equityCurve[context.dataIndex];
                         return `日期: ${dataPoint.date}\n净值: ${value.toFixed(2)}`;
                       },
                     },
                   }}
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

        </StrategyColumn>

        <StrategyColumn>
          <Typography variant="h6" gutterBottom>
            最优参数策略
            <TrendingUpIcon color="success" sx={{ ml: 1 }} />
          </Typography>
           {bestBacktestResult.equityCurve.length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>回测结果</Typography>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary">总收益</Typography>
                      <Typography variant="h4" style={{ color: bestBacktestResult.totalReturn >= 0 ? 'green' : 'red' }}>
                        {bestBacktestResult.totalReturn.toFixed(2)}元
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary">年化收益率</Typography>
                      <Typography variant="h4" style={{ color: bestBacktestResult.annualizedReturn >= 0 ? 'green' : 'red' }}>
                        {bestBacktestResult.annualizedReturn}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary">胜率</Typography>
                      <Typography variant="h4">
                        {bestBacktestResult.winRate}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>净值曲线</Typography>
              <LineChart
                  height={300}
                   series={[
                     {
                       data: bestBacktestResult.equityCurve.map((item) => item.value),
                       label: '账户净值',
                       color: '#1976d2',
                       showMark: ({ index }) =>
                         index === 0 || index === bestBacktestResult.equityCurve.length - 1, // 只显示初始和最终点
                     },
                   ]}
                   xAxis={[
                     {
                       scaleType: 'point',
                       data: bestBacktestResult.equityCurve.map((item) => item.label),
                       tickLabelStyle: {
                         angle: 45,
                         textAnchor: 'start',
                         fontSize: 12,
                       },
                     },
                   ]}
                   sx={{
                     mb: 4,
                     '& .MuiChartsAxis-tickLabel': {
                       maxWidth: 100,
                       whiteSpace: 'nowrap',
                       overflow: 'hidden',
                       textOverflow: 'ellipsis',
                     },
                   }}
                   tooltip={{ trigger: 'item' }} // 启用工具提示
                   slotProps={{
                     tooltip: {
                       // 自定义工具提示内容
                       formatter: (value, context) => {
                         const dataPoint = bestBacktestResult.equityCurve[context.dataIndex];
                         return `日期: ${dataPoint.date}\n净值: ${value.toFixed(2)}`;
                       },
                     },
                   }}
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
                    {bestBacktestResult.transactions.map((tran, index) => (
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

        </StrategyColumn>
      </ComparisonContainer>
        </Box>
    </box>
  </Grid>
  </Grid>

  );
}

export default StockAnalysisPage;