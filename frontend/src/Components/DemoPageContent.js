import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '@fontsource/roboto/700.css';
import { useState  } from 'react';

function DemoPageContent({ pathname }) {
  const [stockCode, setStockCode] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

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
                 <TextField
                    label="股票代码"
                    value={stockCode}
                    onChange={(e) => setStockCode(e.target.value)}
                    sx={{ mb: 2 }} // 添加一些间距
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