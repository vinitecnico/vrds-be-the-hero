import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import style from './styles'

export default function Incidents() {
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [totalItens, setTotalItens] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const loadIncidents = async () => {
        // if (loading) return

        if (loading || (totalItens > 0 && incidents.length === totalItens)) return

        setLoading(true)

        const response = await api.get('incident', {
            params: { page, pear_page: 2 }
        })

        setIncidents([...incidents, ...response.data])
        setTotalItens(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [incidents])

    const navigateToDetail = (incident) => {
        navigation.navigate('Detail', { incident })
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>Total de <Text style={style.headerTextBold}>{totalItens}</Text> casos</Text>
            </View>

            <Text style={style.title}>
                Bem-vindo!
            </Text>
            <Text style={style.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            <FlatList
                style={style.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>Ong:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>Caso</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

                        <Text style={style.incidentProperty}>Valor</Text>
                        <Text style={style.incidentValue}>{incident.value}</Text>

                        <TouchableOpacity style={style.detailsButton} onPress={() => { navigateToDetail(incident) }}>
                            <Text style={style.detailsButtonText}>Ver detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )} />
        </View>
    )
}
