import * as React from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { useState,useEffect  } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel'; // 导入 FormControlLabel
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import CountIcon from './images/count.png';
import '@fontsource/roboto/700.css';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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


// 配置需要对比的指标参数
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
      },
      {
        label: 'BIAS短线(6天)--默认参数',
        type: 'BIAS',
        params: { period: 6 },
        buyCondition: (BIAS) => BIAS < -6,  // 负乖离过大视为超卖
        sellCondition: (BIAS) => BIAS > 6    // 正乖离过大视为超买
      },
      {
        label: 'BIAS中线(12天)',
        type: 'BIAS',
        params: { period: 12 },
        buyCondition: (BIAS) => BIAS < -8,   // 中长期参数可适当放宽阈值
        sellCondition: (BIAS) => BIAS > 8
      },
      {
        label: 'BIAS长线(24天)',
        type: 'BIAS',
        params: { period: 24 },
        buyCondition: (BIAS) => BIAS < -10,  // 长期参数进一步放宽
        sellCondition: (BIAS) => BIAS > 10
      }
    ];

//股票分析页面
function StockAnalysisPage() {
    const [showIndicator, setShowIndicator] = useState(false);
    const [files, setFiles] = useState([]);
    // 在组件顶部添加以下状态变量
    const [comparisonResults, setComparisonResults] = useState([]);
    const [isComparing, setIsComparing] = useState(false);
    // 新增状态管理数据范围
    const [dataRange, setDataRange] = useState([0, 100]);
    const [maxDataLength, setMaxDataLength] = useState(100);
    const [risk, setRisk] = useState([10]); // 风险
    const [selectedFile1, setSelectedFile1] = useState(files[0]);
    const [selectedValue1, setSelectedValue1] = useState('');
    const [closePrices, setClosePrices] = useState([]); // 收盘价数据
    const [stockTimes, setStockTimes] = useState([]);    // 时间数据

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
    const [BIAS1,setBIAS1] = useState({
      BIAS: [null],  // 或者 [null]
      TIME: [null], // 或者 [null]
    });
    // 在组件顶部添加一个新的状态变量
    const [expandedRows, setExpandedRows] = useState({});

    // 添加处理行展开/折叠的函数
    const handleRowClick = (label) => {
      setExpandedRows(prev => ({
        ...prev,
        [label]: !prev[label]
      }));
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

    //删除股票函数
    const handleDeleteStock = async (filename) => {
      try {
        // 调用后端接口删除文件
        const response = await fetch(`http://localhost:5000/deleteCsvFile?filename=${filename}`, {
          method: 'DELETE'
        });

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


    // 修改后的handleFileChange1函数
    const handleFileChange1 = (value) => {  // 直接接收value参数
        const newSelectedFile1 = value;     // 不再需要event.target.value

              // 重置所有指标相关状态
        setMACDS1({ DIF: [null], DEA: [null], MACD: [null], TIME: [null] });
        setKDJS1({ K: [null], D: [null], J: [null], TIME: [null] });
        setRSIS1({ RSI: [null], TIME: [null] });
        setCCIS1({ CCI: [null], TIME: [null] });
        setBIAS1({ BIAS: [null], TIME: [null] });

        // 新增以下状态重置
        setShowIndicator(false);          // 隐藏指标选择
        setComparisonResults([]);         // 清空对比结果
        setClosePrices([]);               // 清空价格数据
        setStockTimes([]);                // 清空时间数据
        setDataRange([0, 100]);           // 重置数据范围
        setMaxDataLength(100);            // 重置最大数据长度

        setSelectedFile1(newSelectedFile1);
    };

    // 处理 RadioGroup 变化的函数
    const handleRadioChange1 = (event) => {
      // 更新状态变量为选中的值
      setSelectedValue1(event.target.value);
    };


    // 新增滑动条变化处理
    const handleSliderChange = (event, newValue) => {
           setDataRange(newValue);
         };

     // 生成切片后的数据
     const getSlicedData = (dataArray) => {
       return dataArray.slice(dataRange[0], dataRange[1] + 1);
     };

     //获取股票数据
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

        // 获取 CCI 数据
        let biasUrl = `http://localhost:5000/getDataBIAS?selectedFile=${selectedFile1}&period=6`;
        let biasResponse = await fetch(biasUrl);
        let biasRawData = await biasResponse.text();
        let biasData = JSON.parse(biasRawData.replace(/NaN/g, 'null'));
        setBIAS1(biasData);

          // 数据获取完成后更新最大长度
        const dataLength = macdData.TIME.length;
        setMaxDataLength(dataLength);
        setDataRange([Math.max(0, dataLength - 100), dataLength - 1]);

        setSelectedValue1("MACD");


      } catch (error) {
        console.error('请求失败:', error);
      }
    };

     //回测函数
     const runBacktest = async (buyPoints, sellPoints, closePrices, stockTimes, initialCapital, riskLevel) => {
        console.log('Initial Capital:', initialCapital);
        console.log('Buy Points:', buyPoints);
        console.log('Sell Points:', sellPoints);
        console.log('Close Prices:', closePrices);
        console.log('Stock Times:', stockTimes);
        // 在runBacktest函数中添加
        const equityCurve = [];
        const equityDates = [];

        // 检查数据有效性
        if (buyPoints.length === 0 && sellPoints.length === 0) {
          console.warn('没有交易点，无法进行回测');
          return {
            totalReturn: 0,
            annualizedReturn: 0,
            winRate: 0,
          };
        }

        let cash = initialCapital;
        let shares = 0;
        let totalTrades = 0;
        let profitableTrades = 0;
        const transactions = [];

        // 风险控制配置
        const positionSizeMap = { 10: 0.3, 30: 0.5, 50: 0.7 };
        const positionSize = positionSizeMap[riskLevel] || 0.5; // 默认仓位比例为 50%

        // 创建时间索引映射
        const timeIndexMap = new Map();
        stockTimes.forEach((time, index) => {
          timeIndexMap.set(time, index);
        });

        // 处理所有交易点
        [...buyPoints, ...sellPoints]
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .forEach((point) => {
            const index = timeIndexMap.get(point.time);
            if (index === undefined || index >= closePrices.length) return;

            const price = closePrices[index];

            // 买入逻辑
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

              // 检查是否盈利
              const currentValue = cash + shares * price;
              if (currentValue > initialCapital) {
                profitableTrades++;
              }
            }

            // 卖出逻辑
            else if (point.type === '卖出' && shares > 0) {
              const initialPrice = transactions[transactions.length - 1]?.price || price;
              const profitPercentage = ((price - initialPrice) / initialPrice) * 100;

              // 分批卖出逻辑
              if (profitPercentage >= 5 || profitPercentage <= -3) {
                const sharesToSell = shares / 3;
                const value = sharesToSell * price;
                cash += value;
                shares -= sharesToSell;

                totalTrades++;

                // 检查是否盈利
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

                // 检查是否盈利
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

                // 检查是否盈利
                const currentValue = cash + shares * price;
                if (currentValue > initialCapital) {
                  profitableTrades++;
                }
              }
            }

            // 更新净值曲线
            equityCurve.push(cash + shares * price);
            equityDates.push(point.time);
          });

        // 计算总收益
        const totalReturn = cash + shares * closePrices[closePrices.length - 1] - initialCapital;

        // 计算年化收益率
        const durationYears =
          stockTimes.length > 1
            ? (new Date(stockTimes[stockTimes.length - 1]) - new Date(stockTimes[0])) /
              (1000 * 3600 * 24 * 365)
            : 0; // 如果数据不足，默认时间为 0

        const annualizedReturn =
          durationYears > 0 && initialCapital > 0
            ? (Math.pow((totalReturn + initialCapital) / initialCapital, 1 / durationYears) - 1) * 100
            : 0; // 如果时间或初始资金无效，默认年化收益率为 0

        // 计算胜率
        const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;

        console.log('Total Return:', totalReturn);
        console.log('Annualized Return:', annualizedReturn);
        console.log('Win Rate:', winRate);

        return {
        totalReturn,
        annualizedReturn,
        winRate,
        equityCurve,
        equityDates,
        transactions // 也可以返回交易记录
      };
    };

     // 首先计算各个指标的买入卖出时间点,并根据买入卖出时间点进行回测,最后选出最佳策略及参数
     const handleCompareStrategies = async () => {
      setIsComparing(true);

      const results = [];

      for (const config of comparisonConfigs) {
        try {
          // 获取指标数据
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
            case 'BIAS':
              const biasRes = await fetch(
                `http://localhost:5000/getDataBIAS?selectedFile=${selectedFile1}&period=${config.params.period}`
              );
              data = await biasRes.json();
              break;
          }

          // 生成买卖点
          const buyPoints = [];
          const sellPoints = [];
          switch (config.type) {
            case 'MACD':
              for (let i = 1; i < data.DIF.length; i++) {
                const prevDIF = data.DIF[i-1];
                const currDIF = data.DIF[i];
                const prevDEA = data.DEA[i-1];
                const currDEA = data.DEA[i];

                if (prevDIF < prevDEA && currDIF > currDEA) {
                  buyPoints.push({ time: data.TIME[i],price: closePrices[i], type: '买入' });
                }
                if (prevDIF > prevDEA && currDIF < currDEA) {
                  sellPoints.push({ time: data.TIME[i],price: closePrices[i], type: '卖出' });
                }
              }
              break;

            case 'RSI':
              data.RSI.forEach((rsi, i) => {
                if (config.buyCondition(rsi)) {
                  buyPoints.push({ time: data.TIME[i],price: closePrices[i], type: '买入' });
                }
                if (config.sellCondition(rsi)) {
                  sellPoints.push({ time: data.TIME[i],price: closePrices[i], type: '卖出' });
                }
              });
              break;

            case 'CCI':
              data.CCI.forEach((cci, i) => {
                if (config.buyCondition(cci)) {
                  buyPoints.push({ time: data.TIME[i],price: closePrices[i], type: '买入' });
                }
                if (config.sellCondition(cci)) {
                  sellPoints.push({ time: data.TIME[i],price: closePrices[i], type: '卖出' });
                }
              });
              break;

            case 'KDJ':
              for (let i = 1; i < data.K.length; i++) {
                const prevK = data.K[i-1];
                const currK = data.K[i];
                const prevD = data.D[i-1];
                const currD = data.D[i];

                if (prevK < prevD && currK >= currD) {
                  buyPoints.push({ time: data.TIME[i],price: closePrices[i], type: '买入' });
                }
                if (prevK > prevD && currK <= currD) {
                  sellPoints.push({ time: data.TIME[i],price: closePrices[i], type: '卖出' });
                }
              }
              break;
              case 'BIAS':
                data.BIAS.forEach((bias, i) => {
                  if (config.buyCondition(bias)) {
                    buyPoints.push({ time: data.TIME[i],price: closePrices[i], type: '买入' });
                  }
                  if (config.sellCondition(bias)) {
                    sellPoints.push({ time: data.TIME[i],price: closePrices[i], type: '卖出' });
                  }
                });
               break;
          }

          // 运行回测
            // 修改策略对比部分的回测调用
            const result = await runBacktest(
              buyPoints,
              sellPoints,
              closePrices,
              stockTimes,
              100000,  // 添加初始资金（示例值）
              risk       // 添加风险等级（示例值）
            );


        // 在handleCompareStrategies函数中，修改results.push部分
        results.push({
          label: config.label,
          returnRate: result.annualizedReturn,
          transactions: buyPoints.concat(sellPoints).sort((a, b) => new Date(a.time) - new Date(b.time)),
          equityCurve: result.equityCurve, // 需要在runBacktest函数中返回这个数据
          equityDates: result.equityDates  // 需要在runBacktest函数中返回这个数据
        });

        } catch (error) {
          console.error(`策略 ${config.label} 回测失败:`, error);
        }
      }

      // 找到最佳策略
      const bestResult = results.reduce((max, curr) =>
        curr.returnRate > max.returnRate ? curr : max,
        { returnRate: -Infinity }
      );

      setComparisonResults(results.map(r => ({
        ...r,
        isBest: r.label === bestResult.label
      })));
      setIsComparing(false);
    };


     // 处理 Select 值的变化
     const handleRiskChange = (event) => {
        setRisk(event.target.value);
     };

     useEffect(() => {
       handleGetCsvFiles();
     }, []); // 空依赖数组表示仅在组件挂载时执行


  return (
  <Grid container spacing={1}>
  <Grid size={100} style={{ width:"100%",padding:"10px 20px"}}>
    <box style={{ padding:"10px 20px",display:"flex",flexDirection:"column"}}>
    <FormControl>
      <h1>股票单指标分析</h1>
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
                        top: 15,
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
           <FormControlLabel value="BIAS" control={<Radio />} label="BIAS（6）" />
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
                        selectedValue1 === 'RSI' ? RSIS1.TIME :
                        selectedValue1 === 'CCI' ? CCIS1.TIME : BIAS1.TIME;
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
    {selectedValue1 === 'BIAS' && (
  <Box>
    <LineChart
      height={400}
      series={[
        {
          data: getSlicedData(BIAS1.BIAS), // 假设数据字段为BIAS
          label: 'BIAS',
          color: '#8e44ad', // 使用紫色系颜色
          showMark: false,
          curve: 'natural'
        },
        {
          data: Array(getSlicedData(BIAS1.BIAS).length).fill(6), // 超买线
          label: '超买线',
          color: '#e74c3c', // 红色
          showMark: false,
          strokeDasharray: '5 5' // 虚线样式
        },
        {
          data: Array(getSlicedData(BIAS1.BIAS).length).fill(-6), // 超卖线
          label: '超卖线',
          color: '#2ecc71', // 绿色
          showMark: false,
          strokeDasharray: '5 5' // 虚线样式
        }
      ]}
      xAxis={[{
        scaleType: 'point',
        data: getSlicedData(BIAS1.TIME),
        tickLabelStyle: {
          angle: 45,
          textAnchor: 'start',
          fontSize: 12
        }
      }]}
      yAxis={[{
        min: Math.min(...getSlicedData(BIAS1.BIAS)) - 2, // 动态调整Y轴范围
        max: Math.max(...getSlicedData(BIAS1.BIAS)) + 2
      }]}
      margin={{ left: 70, right: 30, top: 30, bottom: 100 }}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'top', horizontal: 'middle' },
          padding: 0,
        }
      }}
    />
  </Box>
)}
    <h2>指标对比</h2>
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
        <Box sx={{ mt: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCompareStrategies}
            disabled={isComparing}
          >
            {isComparing ? '计算中...' : '开始策略对比'}
          </Button>

            {comparisonResults.length > 0 && (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>策略名称</TableCell>
                      <TableCell align="right">年化收益率</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {comparisonResults.map((result, index) => (
                      <React.Fragment key={index}>
                        <TableRow
                          hover
                          onClick={() => handleRowClick(result.label)}
                          sx={{
                            backgroundColor: result.isBest ? '#e8f5e9' : 'inherit',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: '#f5f5f5' }
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {expandedRows[result.label] ? (
                                <ExpandLess sx={{ mr: 1 }} />
                              ) : (
                                <ExpandMore sx={{ mr: 1 }} />
                              )}
                              {result.label}
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            {result.returnRate.toFixed(2)}%
                            {result.isBest && ' 🏆'}
                          </TableCell>
                        </TableRow>
                        {expandedRows[result.label] && (
                          <TableRow>
                            <TableCell colSpan={2} sx={{ py: 0 }}>
                              <Collapse in={expandedRows[result.label]} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                  <Typography variant="h6" gutterBottom component="div">
                                    交易详情
                                  </Typography>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ width: '60%' }}>
                                      <Typography variant="subtitle1">买卖点:</Typography>
                                      <Table size="small">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>时间</TableCell>
                                            <TableCell>类型</TableCell>
                                            <TableCell align="right">价格</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {/* 这里需要根据策略类型显示具体的买卖点 */}
                                          {result.transactions?.map((txn, idx) => (
                                            <TableRow key={idx}>
                                              <TableCell>{txn.time}</TableCell>
                                              <TableCell>{txn.type}</TableCell>
                                              <TableCell align="right">
                                                {txn.price?.toFixed(2) || '-'}
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </Box>
                                    <Box sx={{ width: '38%' }}>
                                      <Typography variant="subtitle1">净值曲线:</Typography>
                                      <LineChart
                                        height={300}
                                        series={[
                                          {
                                            data: result.equityCurve || [],
                                            label: '净值',
                                            color: '#1976d2'
                                          }
                                        ]}
                                        xAxis={[{
                                          scaleType: 'point',
                                          data: result.equityDates || []
                                        }]}
                                      />
                                    </Box>
                                  </Box>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </Box>

    </box>
  </Grid>
  </Grid>

  );
}

export default StockAnalysisPage;
