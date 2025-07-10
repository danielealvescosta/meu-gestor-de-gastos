import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NovoGasto from './screens/NovoGasto';
import Historico from './screens/Historico';
import Resumo from './screens/Resumo';
import Perfil from './screens/Perfil';

const Tab = createBottomTabNavigator();

export default function App() {
  const [gastos, setGastos] = useState([]);

  const adicionarGasto = (gasto) => {
    setGastos([...gastos, gasto]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Resumo">
          {() => <Resumo gastos={gastos} />}
        </Tab.Screen>
        <Tab.Screen name="Novo Gasto">
          {() => <NovoGasto adicionar={adicionarGasto} />}
        </Tab.Screen>
        <Tab.Screen name="Histórico">
          {() => <Historico gastos={gastos} />}
        </Tab.Screen>
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
