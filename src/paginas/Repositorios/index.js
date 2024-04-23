import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity,TextInput } from 'react-native';
import estilos from './estilos';
import { pegarRepositorioDoUsuario } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';
import { PegarRepositoriosDoUsuarioPeloNome } from '../../servicos/requisicoes/repositorios';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const estaNaTela = useIsFocused();
    const [nomeRepo, setNomeRepo] = useState('');

    useEffect(() => {
        get();
      }, [estaNaTela]);
    
      async function get() {
        const result = await pegarRepositorioDoUsuario(route.params.id);
        setRepo(result);
      }


      async function BuscaRepo() {
        const resultado = await PegarRepositoriosDoUsuarioPeloNome(route.params.id,nomeRepo);
         
        setNomeRepo('')
        setRepo(resultado)
        
 
    
     }

    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio',{id: route.params.id})}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

                <FlatList
                data={repo}
                style={{width: '100%'}}
                keyExtractor={repo => repo.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={estilos.repositorio} onPress={() => navigation.navigate('InfoRepositorio', {item})}>
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>{item.data}</Text>
                    </TouchableOpacity>
                )}
                />
                <TextInput
                    placeholder="Busque por um repositorio"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeRepo}
                    onChangeText={setNomeRepo}
                />

                <TouchableOpacity style={estilos.botao} onPress={BuscaRepo}>
                    <Text style={estilos.textoBotao}>
                        Buscar
                    </Text>
                </TouchableOpacity>
        </View>
    );
}
