import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { GameParams } from '../../@types/navigation';

import { Entypo } from '@expo/vector-icons'
import { Background } from '../../components/Background';

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([])

    const navigation = useNavigation()
    const route = useRoute()
    const game = route.params as GameParams

    function handleGoBack(){
        navigation.goBack()
    }

    useEffect(() => {
        fetch(`http://192.168.2.102:3333/games/${game.id}/ads`)
        .then(res => res.json())
        .then(data => setDuos(data))
    }, [])
  return (
    <Background>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Entypo 
                        name="chevron-thin-left"
                        color={THEME.COLORS.CAPTION_300}
                        size={20}
                    />
                </TouchableOpacity>

                <Image
                    source={logoImg}
                    style={styles.logo}
                />

                <View style={styles.right} />
            </View>

            <Image
                source={{ uri: game.bannerUrl}}
                style={styles.cover}
                resizeMode="cover"
            />

            <Heading 
                title={game.title}
                subtitle="Conecte-se e comece a jogar!"
                
            />

            <FlatList 
                data={duos}
                keyExtractor={item => item.id}
                horizontal
                renderItem={({item}) => (
                    <DuoCard 
                        data={item}
                        onConnect={()=>{}}    
                    />
                )}
                style={styles.containerList}
                contentContainerStyle={[ duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyListText}>
                        Não há anúncios publicados ainda.
                    </Text>
                )}
            />
        </SafeAreaView>
    </Background>
  );
}