import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '@fontsource/roboto/700.css';
import { useState  } from 'react';

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
  { code: 'SH:688027', name: '国盾量子' },
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
  { code: 'SH:688018', name: '澜起科技' },
  { code: 'SH:688039', name: '传音控股' },
  { code: 'SH:688029', name: '南微医学' },
  { code: 'SH:688012', name: '中微公司' },
  { code: 'SH:688005', name: '容百科技' },
  { code: 'SH:688002', name: '睿创微纳' },
  { code: 'SH:688001', name: '华兴源创' },
  { code: 'SH:688003', name: '天准科技' },
  { code: 'SH:688008', name: '澜起科技' },
  { code: 'SH:688010', name: '博瑞医药' },
  { code: 'SH:688011', name: '新光光电' },
  { code: 'SH:688013', name: '天臣医疗' },
  { code: 'SH:688015', name: '道通科技' },
  { code: 'SH:688017', name: '瀚川智能' },
  { code: 'SH:688019', name: '安恒信息' },
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
  { code: 'SH:688031', name: '晶丰明源' },
  { code: 'SH:688032', name: '海尔生物' },
  { code: 'SH:688033', name: '航天宏图' },
  { code: 'SH:688035', name: '威胜信息' },
  { code: 'SH:688036', name: '传音控股' },
  { code: 'SH:688037', name: '晶丰明源' },
  { code: 'SH:688038', name: '清溢光电' },
  { code: 'SH:688039', name: '传音控股' },
  { code: 'SH:688040', name: '金科环境' },
  { code: 'SH:688041', name: '安路科技' },
  { code: 'SH:688042', name: '晶丰明源' },
  { code: 'SH:688043', name: '华兴源创' },
  { code: 'SH:688045', name: '当虹科技' },
  { code: 'SH:688046', name: '晶丰明源' },
  { code: 'SH:688047', name: '龙腾光电' },
  { code: 'SH:688048', name: '长阳科技' },
  { code: 'SH:688049', name: '芯原股份' },
  { code: 'SH:688050', name: '德林海' },
  { code: 'SH:688051', name: '芯原股份' },
  { code: 'SH:688052', name: '容百科技' },
  { code: 'SH:688053', name: '思特威' },
  { code: 'SH:688055', name: '德林海' },
  { code: 'SH:688056', name: '芯原股份' },

];

function DemoPageContent({ pathname }) {
  const [stockCode, setStockCode] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [inputValue, setInputValue] = useState('');

 const handleGetStockData = async () => {
  try {
      // 构建请求的 URL 或请求体，这里假设是 GET 请求
      const url = 'http://localhost:5000/getDayData?code='+stockCode+'&start='+startDate+'&end='+endDate;

      // 发送请求
      const response = await fetch(url);
      const data = await response.json();

      // 处理响应数据，例如打印到控制台
      console.log(data);
    } catch (error) {
      // 处理错误
      console.error('请求失败:', error);
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
           <h1>获取股票数据</h1>
           <h2>输入股票代码</h2>
           <div>
                     <Autocomplete
                       options={stockData}
                       getOptionLabel={(option) => `${option.code} - ${option.name}`}
                       inputValue={inputValue}
                       onInputChange={(event, newInputValue) => {
                         setInputValue(newInputValue);
                       }}
                       onChange={(event, newValue) => {
                         if (newValue) {
                           setStockCode(newValue.code);
                         }
                       }}
                       renderInput={(params) => (
                         <TextField
                           {...params}
                           label="股票代码"
                           value={stockCode}
                           onChange={(e) => setStockCode(e.target.value)}
                           sx={{ mb: 2 , width: '400px'}} // 添加一些间距
                         />
                       )}
                     />
            </div>
           <h2>选择股票数据时间范围</h2>
           <TextField
             label="起始日期"
             type="date"
             value={startDate}
             onChange={(e) => setStartDate(e.target.value)}
             sx={{ mb: 2 }}
           />
           <TextField
             type="date"
             label="结束日期"
             value={endDate}
             onChange={(e) => setEndDate(e.target.value)}
             sx={{ mb: 2 }}
           />
           <Button
             variant="contained"
             endIcon={<SendIcon />}
             onClick={handleGetStockData}
             sx={{ mt: 4 }}
           >
             获取股票数据
           </Button>
    </Box>
  );
}

export default DemoPageContent;