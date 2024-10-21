import NavDashboard from '@/assets/svg/dashboard.svg'
import NavDashboardActive from '@/assets/svg/dashboardActive.svg'
import NavGrid from '@/assets/svg/grid.svg'
import NavGridActive from '@/assets/svg/gridActive.svg'
import NavSearch from '@/assets/svg/search.svg'
import NavSearchActive from '@/assets/svg/searchActive.svg'
import NavSetting from '@/assets/svg/setting.svg'
import NavSettingActive from '@/assets/svg/settingActive.svg'
import { Tabs } from 'expo-router'
import { observer } from 'mobx-react-lite'

function TabLayout () {
  return (
    <Tabs
      screenOptions={() => ({
        tabBarActiveTintColor: 'blue',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
          borderTopWidth: 0,
          backgroundColor: '#2C1440',
          paddingHorizontal: 44
        }
      })}
    >
      <Tabs.Screen
        name="homepage"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (focused ? <NavGridActive/> : <NavGrid/>)
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (focused ? <NavDashboardActive/> : <NavDashboard/>)
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (focused ? <NavSearchActive/> : <NavSearch/>)
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (focused ? <NavSettingActive/> : <NavSetting/>)
        }}
      />
      <Tabs.Screen
        name="homepagescreenEmpty"
        options={{
          headerShown: false,
          href: null
        }}
      />
    </Tabs>
  )
}

export default observer(TabLayout)
