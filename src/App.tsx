import './css/App.css'
import Fight from './components/Fight'
import Setup from './components/Setup'
import { Tabs, TabsList, TabsContent, TabsTrigger } from './components/ui/tabs'

function App() {

  return (
    <div className='h-full w-full bg-gray-200'>
      <div className='flex justify-center h-full'>
        <Tabs defaultValue="fight" className="grow max-w-[800px] bg-white">
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value="fight">Fight</TabsTrigger>
            <TabsTrigger value="setup">Setup</TabsTrigger>
          </TabsList>
          <TabsContent value="fight">
            <Fight />
          </TabsContent>
          <TabsContent value="setup">
            <Setup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
