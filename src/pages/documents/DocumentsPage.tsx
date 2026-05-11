// src/pages/documents/DocumentsPage.tsx
import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon, IonBadge, IonButton,
  IonButtons, IonSearchbar, IonFab, IonFabButton,
  IonGrid, IonRow, IonCol, IonBackButton,
} from '@ionic/react';
import { documentOutline, downloadOutline, addOutline, folderOpenOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Documento } from '../../types';

// FIX: cada documento tiene categoría para poder filtrar por carpeta
interface DocumentoConCategoria extends Documento {
  categoria: 'Resoluciones' | 'Formularios' | 'Informes';
}

const TODOS_LOS_DOCUMENTOS: DocumentoConCategoria[] = [
  { id: '1', nombre: 'Resolución N°1234-2024', tipo: 'PDF', fecha: '2024-03-01', estado: 'aprobado', categoria: 'Resoluciones' },
  { id: '2', nombre: 'Resolución N°1100-2023', tipo: 'PDF', fecha: '2023-11-10', estado: 'aprobado', categoria: 'Resoluciones' },
  { id: '3', nombre: 'Formulario de Solicitud', tipo: 'DOCX', fecha: '2024-02-15', estado: 'pendiente', categoria: 'Formularios' },
  { id: '4', nombre: 'Formulario de Permiso Obras', tipo: 'DOCX', fecha: '2024-01-20', estado: 'aprobado', categoria: 'Formularios' },
  { id: '5', nombre: 'Informe Técnico Q1', tipo: 'PDF', fecha: '2024-04-05', estado: 'aprobado', categoria: 'Informes' },
  { id: '6', nombre: 'Informe Ambiental 2023', tipo: 'PDF', fecha: '2023-12-01', estado: 'rechazado', categoria: 'Informes' },
];

const CARPETAS = ['Todos', 'Resoluciones', 'Formularios', 'Informes'] as const;
type Carpeta = typeof CARPETAS[number];

const DocumentsPage: React.FC = () => {
  const history = useHistory();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 'admin';

  const [query, setQuery] = useState('');
  // FIX: estado de carpeta seleccionada para filtrar documentos
  const [carpetaActiva, setCarpetaActiva] = useState<Carpeta>('Todos');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Filtrar por carpeta Y por búsqueda de texto
  const documentosFiltrados = TODOS_LOS_DOCUMENTOS.filter((d) => {
    const matchCategoria = carpetaActiva === 'Todos' || d.categoria === carpetaActiva;
    const matchQuery = d.nombre.toLowerCase().includes(query.toLowerCase());
    return matchCategoria && matchQuery;
  });

  const getEstadoColor = (estado: Documento['estado']) =>
    ({ aprobado: 'success', pendiente: 'warning', rechazado: 'danger' }[estado]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" text="Volver" />
          </IonButtons>
          <IonTitle>Repositorio y Gestión de Documentos</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" color="danger" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
              Cerrar Sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSearchbar
          value={query}
          onIonChange={(e) => setQuery(e.detail.value!)}
          placeholder="Buscar documento..."
        />

        <IonGrid>
          <IonRow>
            {/* Columna de carpetas — FIX: onClick actualiza carpetaActiva */}
            <IonCol size="12" sizeMd="3">
              <IonList>
                {CARPETAS.map((cat) => (
                  <IonItem
                    key={cat}
                    button
                    detail
                    onClick={() => setCarpetaActiva(cat)}
                    color={carpetaActiva === cat ? 'light' : undefined}
                    style={{
                      fontWeight: carpetaActiva === cat ? 'bold' : 'normal',
                      borderLeft: carpetaActiva === cat ? '3px solid var(--ion-color-primary)' : '3px solid transparent',
                    }}
                  >
                    <IonIcon slot="start" icon={folderOpenOutline} color="warning" />
                    <IonLabel>{cat}</IonLabel>
                    {/* Contador de documentos por carpeta */}
                    <IonBadge color="medium" slot="end">
                      {cat === 'Todos'
                        ? TODOS_LOS_DOCUMENTOS.length
                        : TODOS_LOS_DOCUMENTOS.filter((d) => d.categoria === cat).length}
                    </IonBadge>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>

            {/* Columna de documentos filtrados */}
            <IonCol size="12" sizeMd="9">
              {isAdmin && (
                <div className="doc-admin-actions">
                  <IonButton size="small" fill="outline">
                    <IonIcon slot="start" icon={addOutline} />Subir Archivo
                  </IonButton>
                  <IonButton size="small" fill="outline">
                    <IonIcon slot="start" icon={addOutline} />Nueva Carpeta
                  </IonButton>
                </div>
              )}

              {documentosFiltrados.length === 0 ? (
                <IonItem lines="none">
                  <IonLabel color="medium" className="ion-text-center">
                    <p>No hay documentos en esta carpeta.</p>
                  </IonLabel>
                </IonItem>
              ) : (
                <IonList>
                  {documentosFiltrados.map((doc) => (
                    <IonItem key={doc.id} button>
                      <IonIcon slot="start" icon={documentOutline} color="primary" />
                      <IonLabel>
                        <h2>{doc.nombre}</h2>
                        <p>{doc.tipo} · {doc.fecha}</p>
                      </IonLabel>
                      <IonBadge color={getEstadoColor(doc.estado)} slot="end">
                        {doc.estado}
                      </IonBadge>
                      <IonButton fill="clear" slot="end">
                        <IonIcon icon={downloadOutline} />
                      </IonButton>
                    </IonItem>
                  ))}
                </IonList>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>

        {isAdmin && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton color="primary"><IonIcon icon={addOutline} /></IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DocumentsPage;
