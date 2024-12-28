import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import '@fontsource/roboto/700.css';
import StockAnalysisPage from './Components/DemoPageContent'
import DemoPageContent from './Components/StockAnalysisPage'
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

function DashboardLayoutBasic({ window }) {
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;
  const { pathname } = router;

  let pageContent;
  switch (pathname) {
    case '/integrations':
      pageContent = <DemoPageContent pathname={pathname} />;
      break;
    default:
      pageContent = <StockAnalysisPage />;
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

export default DashboardLayoutBasic;