import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import '@fontsource/roboto/700.css';
import SingleIcon from './Components/images/single.png';
import MultiIcon from './Components/images/multi.png';
import SimpleIcon from './Components/images/simple.png';
import DataIcon from './Components/images/data.png';
import DemoPageContent from './Components/DemoPageContent'
import SingleIndicatorPage from './Components/SingleIndicatorPage'
import MultiIndicatorPage from './Components/MultiIndicatorPage'
import SimpleDealPage from './Components/SimpleDealPage'
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
    icon: <img src={DataIcon} alt="date" style={{ width: '24px', height: '24px' }} />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: '副菜单',
  },
  {
    segment: 'single',
    title: '单指标分析',
    icon: <img src={SingleIcon} alt="date" style={{ width: '24px', height: '24px' }} />
  },
  {
    segment: 'multi',
    title: '多指标分析',
    icon: <img src={MultiIcon} alt="date" style={{ width: '24px', height: '24px' }} />
  },
  {
    segment: 'simple',
    title: '长期持股分析',
    icon: <img src={SimpleIcon} alt="date" style={{ width: '24px', height: '24px' }} />
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
    case '/single':
      pageContent = <SingleIndicatorPage pathname={pathname} />;
      break;
    case '/multi':
      pageContent = <MultiIndicatorPage pathname={pathname} />;
      break;
    case '/simple':
      pageContent = <SimpleDealPage pathname={pathname} />;
      break;
    default:
      pageContent = <DemoPageContent />;
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
          title: '股票量化系统',
          homeUrl: 'http://localhost:3000/',
      }}
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