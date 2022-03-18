import './css/App.css'
import Fight from './components/Fight'
import TabView, { TabViewItem } from './components/TabView'
import { useState } from 'react'
import Setup from './components/Setup'

function App() {

  const [selectedTab, setSelectedTab] = useState("fight")

  const tabViewItems: TabViewItem[] = [{
    name: "Fight",
    id: "fight",
    view: <Fight />,
    onTabButtonPress: () => {
      setSelectedTab("fight")
    }
  }, {
    name: "Setup",
    id: "setup",
    view: <Setup />,
    onTabButtonPress: () => {
      setSelectedTab("setup")
    }
  }]

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 min-h-full flex flex-col overscroll-none p-safe'>
      <TabView selectedId={selectedTab} tabViewItems={tabViewItems} />
    </div>
  )
}

export default App
