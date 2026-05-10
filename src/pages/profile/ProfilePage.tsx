// src/pages/profile/ProfilePage.tsx
import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonIcon,
  IonAvatar, IonButtons, IonList, IonListHeader, IonText, IonBackButton,
} from '@ionic/react';
import { personOutline, cameraOutline, saveOutline, closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [apellido, setApellido] = useState(user?.apellido || '');
  const [email, setEmail] = useState(user?.email || '');
  const [telefono, setTelefono] = useState(user?.telefono || '');
  const [nombreUsuario, setNombreUsuario] = useState(user?.nombreUsuario || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // FIX: actualizar localStorage para que el Dashboard muestre el nombre nuevo inmediatamente
    const updatedUser = { ...user, nombre, apellido, email, telefono, nombreUsuario };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* icon="" elimina la flecha del IonBackButton */}
            <IonBackButton defaultHref="/dashboard" text="Volver" icon="" />
          </IonButtons>
          <IonTitle>Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profile-content">
        <IonList>
          <IonListHeader><IonLabel><strong>Cuenta</strong></IonLabel></IonListHeader>

          <div className="profile-avatar-container">
            <IonAvatar className="profile-avatar">
              <IonIcon icon={personOutline} size="large" />
            </IonAvatar>
            <IonButton fill="outline" size="small">
              <IonIcon slot="start" icon={cameraOutline} />
              Cambiar Foto
            </IonButton>
          </div>

          <div className="profile-section-title">Información de Perfil</div>

          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={nombre} onIonChange={(e) => setNombre(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Apellidos</IonLabel>
            <IonInput value={apellido} onIonChange={(e) => setApellido(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Correo electrónico</IonLabel>
            <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Teléfono</IonLabel>
            <IonInput type="tel" value={telefono} onIonChange={(e) => setTelefono(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Nombre de tu perfil</IonLabel>
            <IonInput value={nombreUsuario} onIonChange={(e) => setNombreUsuario(e.detail.value!)} />
          </IonItem>

          {saved && (
            <IonText color="success">
              <p className="ion-padding-start">✓ Cambios guardados correctamente</p>
            </IonText>
          )}

          <div className="profile-actions">
            <IonButton expand="block" onClick={handleSave}>
              <IonIcon slot="start" icon={saveOutline} />
              Guardar Cambios
            </IonButton>
            <IonButton expand="block" fill="outline" color="medium" onClick={() => history.push('/dashboard')}>
              <IonIcon slot="start" icon={closeOutline} />
              Cancelar
            </IonButton>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
