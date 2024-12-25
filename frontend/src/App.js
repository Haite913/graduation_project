import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
import { useState } from 'react';



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
      <Typography variant="h1">股票分析页面</Typography>
    </Box>
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