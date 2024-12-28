import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import TextField from '@mui/material/TextField';
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

/*
    设置网页菜单结构
    kind:'header'设置菜单头;kind:'divider'设置分割线
    segment设置路由段
*/
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: '主菜单',
  },
  {
    segment: 'dashboard',
    title: '股票数据',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: '副菜单',
  },
  {
    segment: 'integrations',
    title: '股票分析',
    icon: <LayersIcon />,
  },
];


//定义一个主题对象
const demoTheme = createTheme({
  //用于选择颜色
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  //表示两个颜色都可用
  colorSchemes: { light: true, dark: true },
  //自适应屏幕大小
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

//股票数据页面
function DemoPageContent({ pathname }: { pathname: string }) {
    // 定义状态来存储股票代码、起始时间和结束时间
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


//股票分析页面
function StockAnalysisPage() {
  const [files, setFiles] = useState([]); // 假设您已经定义了这个状态来存储文件名
  const [MACDS, setMACDS] = useState({
    DIF: [null],  // 或者 [null]
    DEA: [null],  // 或者 [null]
    MACD: [null], // 或者 [null]
    TIME: [null], // 或者 [null]
    });
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(files[0]);
  const [selectedValue, setSelectedValue] = useState('');

  // 处理 RadioGroup 变化的函数
  const handleRadioChange = (event) => {
    // 更新状态变量为选中的值
    setSelectedValue(event.target.value);
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

    const handleFileChange = (event) => {
        const newSelectedFile = event.target.value; // 获取新选中的文件
        setSelectedFile(newSelectedFile); // 更新选中的文件
    };

    const handleGetMACD = async () => {
      try {
        const url = 'http://localhost:5000/getData'+selectedValue+'?selectedFile='+selectedFile;
        const response = await fetch(url);
        const rawData = await response.text(); // 获取响应文本而不是直接解析为 JSON

        setOpen(true);

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
        setMACDS(data);
      } catch (error) {
        console.error('请求失败:', error);
      }
    };

  useEffect(() => {
    handleGetCsvFiles();
  }, []); // 空依赖数组表示仅在组件挂载时执行


  return (
  <Grid container spacing={2}>
  <Grid size={50} style={{ width:"50%",padding:"10px 20px"}}>
    <box style={{ padding:"10px 20px",display:"flex",flexDirection:"column"}}>
    <FormControl>
      <h1>选择第1支股票</h1>
            <FormLabel id="demo-row-radio-buttons-group-label">股票</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={selectedFile} // 假设默认选择第一个文件
        name="radio-buttons-group"
        onClick={handleFileChange}
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
        onChange={handleRadioChange} // 设置 onChange 事件处理函数
        value={selectedValue}  // 设置 RadioGroup 的 value 为状态变量
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
             onClick={handleGetMACD}
             sx={{ mt: 4 }}
           >
    获取指标图像
    </Button>
    <LineChart
    height={400}
    open={open}
    series={[
         { data: MACDS.DEA, label: 'DEA',color:'orange' },
         { data: MACDS.DIF, label: 'DIF' },
         { data: MACDS.MACD, label: 'MACD'},
    ]}
    xAxis={[{ scaleType: 'point', data: MACDS.TIME }]}
    />
    </box>
  </Grid>
 <Grid size={6} style={{ width:"50%",padding:"10px 20px"}}>
    <box style={{ padding:"10px 20px",display:"flex",flexDirection:"column"}}>
    <FormControl>
      <h1>选择第2支股票</h1>
            <FormLabel id="demo-row-radio-buttons-group-label">股票</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={files[0]} // 假设默认选择第一个文件
        name="radio-buttons-group"
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
             onClick={handleGetMACD}
             sx={{ mt: 4 }}
           >
    获取指标图像
    </Button>
    </box>
  </Grid>
  </Grid>

  );
}

interface DemoProps {
  //设置一个可选属性
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  //从 props 对象中解构出 window 属性
  const { window } = props;
  //设置路由的根路径是 /dashboard。
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;
  //从 router 对象中解构出当前的路由路径 pathname。
  const { pathname } = router; // 获取当前的路由路径

  // 根据路由路径决定渲染哪个页面内容
  let pageContent;
  switch (pathname) {
    case '/integrations':
      pageContent = <StockAnalysisPage />;
      break;
    default:
      pageContent = <DemoPageContent pathname={pathname} />;
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {pageContent}
      </DashboardLayout>
    </AppProvider>
  );
}