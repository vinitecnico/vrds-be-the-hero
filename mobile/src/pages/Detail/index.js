import React from 'react'
import { View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'

import style from './styles'

export default function Detail() {
    const navigation = useNavigation()
    const route = useRoute()

    const incident = route.params.incident
    const menssage = `Olá ${incident.name}, estou entrando em contato para ajudar no caso: ${incident.title} com o valor de ${incident.value}`

    const navigateToBack = () => {
        navigation.goBack()
    }

    const sendMail = () => {
        MailComposer.composeAsync({
            subject: `Herói do caso: teste`,
            recipients: ['vinitecnico@gmail.com'],
            body: menssage
        })
    }

    const sendWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=5511967533662&text=${menssage}`)
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <TouchableOpacity style={style.detailsButton} onPress={navigateToBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={style.incident}>
                <Text style={[style.incidentProperty, { marginTop: 0 }]}>Ong:</Text>
                <Text style={style.incidentValue}>{incident.name}</Text>

                <Text style={style.incidentProperty}>Caso</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>Valor</Text>
                <Text style={style.incidentValue}>{incident.value}</Text>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={style.heroDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
