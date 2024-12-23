import './css/App.css'
import Fight from './components/Fight'
import Setup from './components/Setup'
import { Tabs, TabsList, TabsContent, TabsTrigger } from './components/ui/tabs'

function App() {

  return (
    <div className='flex justify-center'>
      <Tabs defaultValue="fight" className="grow max-w-[800px]">
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
  )
}

export default App
