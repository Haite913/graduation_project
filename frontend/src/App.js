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
import { useState } from 'react';

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

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
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

// 在文件顶部定义新页面组件
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
      <Typography variant="body1">这里是股票分析的内容。</Typography>
    </Box>
  );
}

function DemoPageContent({ pathname }: { pathname: string }) {
  const [folderPath, setFolderPath] = useState('');

  const handleFolderSelect = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // 获取第一个文件的路径（在某些浏览器中可能无法获取完整路径）
      const folder = files[0].webkitRelativePath.split('/')[0];
      setFolderPath(folder);
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
           <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DateRangePicker']}>
               <DateRangePicker localeText={{ start: '起始日期', end: '结束日期' }} />
             </DemoContainer>
           </LocalizationProvider>
        <div>
      <input
        type="file"
        webkitdirectory
        directory
        id="folderPicker"
        style={{ display: 'none' }} // 隐藏 input
        onChange={handleFolderSelect}
      />
      <Button variant="contained" component="label" htmlFor="folderPicker">
        选择文件夹
      </Button>
      <TextField
        label="选择数据保存地址"
        value={folderPath}
        InputProps={{
          readOnly: true,
        }}
        style={{ marginTop: '10px', width: '300px' }}
      />
      </div>
        <Button variant="contained" endIcon={<SendIcon />}>
            获取股票数据
        </Button>

    </Box>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;
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