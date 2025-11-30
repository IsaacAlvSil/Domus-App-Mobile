import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NoticeDetailScreen = ({ route, navigation }) => {
  // Si vienes de la lista usas route.params.notice, aquí pondré datos dummy para que visualices el diseño
  const notice = route.params?.notice || {
      title: "Actualización de Políticas de Privacidad",
      date: "15 de Marzo, 2024 • 10:30 AM",
      category: "Políticas",
      priority: "Alta",
      content: "Estimados usuarios,\n\nLes informamos que hemos actualizado nuestras políticas de privacidad para mejorar la transparencia... \n\nPrincipales actualizaciones:\n• Mayor control sobre sus datos.\n• Nuevas opciones de cookies."
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backText}>Volver a Lista</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.iconContainer}>
            <Ionicons name="document-text-outline" size={40} color="#2e64e5" />
        </View>
        <Text style={styles.title}>{notice.title}</Text>
        <Text style={styles.date}>{notice.date}</Text>
        <View style={styles.tag}><Text style={styles.tagText}>Importante</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.body}>{notice.content}</Text>
        <Text style={styles.footer}>Atentamente, Equipo de Administración</Text>
      </View>

      <Text style={styles.sectionTitle}>Información Adicional</Text>
      <View style={styles.infoRow}>
        <View>
            <Text style={styles.label}>Categoría</Text>
            <Text style={styles.value}>{notice.category}</Text>
        </View>
        <View>
            <Text style={styles.label}>Prioridad</Text>
            <Text style={styles.value}>• {notice.priority}</Text>
        </View>
        <View>
            <Text style={styles.label}>Publicado por</Text>
            <Text style={styles.value}>Admin Principal</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}><Ionicons name="share-social-outline" size={20} color="#333"/><Text style={styles.actionText}>Compartir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}><Ionicons name="bookmark-outline" size={20} color="#333"/><Text style={styles.actionText}>Guardar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}><Ionicons name="print-outline" size={20} color="#333"/><Text style={styles.actionText}>Imprimir</Text></TouchableOpacity>
      </View>
      <View style={{height: 30}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  backText: { marginLeft: 5, fontSize: 16, color: '#333' },
  header: { alignItems: 'center', marginBottom: 20 },
  iconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#eef2ff', justifyContent:'center', alignItems:'center', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  date: { color: '#666', marginBottom: 10 },
  tag: { backgroundColor: '#ffeeba', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  tagText: { color: '#856404', fontWeight: 'bold', fontSize: 12 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 25 },
  body: { fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 },
  footer: { fontStyle: 'italic', color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 25 },
  label: { fontSize: 12, color: '#888', marginBottom: 2 },
  value: { fontWeight: '600', fontSize: 14 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { flex: 1, alignItems: 'center', padding: 15, backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 5 },
  actionText: { marginTop: 5, fontSize: 12 }
});

export default NoticeDetailScreen;