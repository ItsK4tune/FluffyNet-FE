import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";

import { Button } from './components/element/button'
import { Input } from './components/element/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
        <TabsContent value="tab1">Body of Tab 1</TabsContent>
        <TabsContent value="tab2">Body of Tab 2</TabsContent>
    </Tabs>
    <Input/>
    <Button/>
  </StrictMode>,
)
