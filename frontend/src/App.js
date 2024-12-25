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
import InputAdornment from '@mui/material/InputAdornment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '@fontsource/roboto/700.css';

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

//股票代码输入框
function InputStockCode(){
    return(
    <div>
        <TextField
          label="输入股票代码"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">代码</InputAdornment>,
            },
          }}
        />
    </div>
    );
}
//选择股票数据时间范围
function DateSelect(){
    return(
    <div>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DateRangePicker']}>
               <DateRangePicker localeText={{ start: '起始日期', end: '结束日期' }} />
             </DemoContainer>
           </LocalizationProvider>
    </div>
    );
}


//股票数据页面
function DemoPageContent({ pathname }: { pathname: string }) {
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
           <InputStockCode />
           <h2>选择股票数据时间范围</h2>
           <DateSelect />
        <Button variant="contained" endIcon={<SendIcon />} sx={{ mt: 4}}>
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