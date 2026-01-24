# Weather App - Ionic & Angular

## Descripcion
Aplicacion del tiempo desarrollada con Ionic y Angular, utilizando OpenWeather API.
Diseno basado en Atomic Design y soporte multi-idioma (Español/Ingles).
Incluye versiones para Web y Android.

## Caracteristicas
- **Busqueda**: Por ciudad o coordenadas.
- **Geolocalizacion**: Obtiene el tiempo de tu ubicacion actual.
- **Prediccion**:
  - Tiempo actual (Temp, Viento, Humedad, UV, Presion).
  - Prediccion horaria para el dia de hoy.
  - Prediccion diaria para los proximos 4 dias.
- **Multi-idioma**: Español (Predeterminado) e Ingles.
- **Plataformas**: Web y Android.

## Requisitos
- Node.js
- Ionic CLI (`npm install -g @ionic/cli`)
- Android Studio (para compilar la version Android)

## Instalacion y Ejecucion

### Web
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en navegador:
   ```bash
   ionic serve
   ```

### Android
1. Asegurate de tener las dependencias instaladas.
2. Sincronizar el proyecto con Capacitor:
   ```bash
   ionic build
   npx cap sync android
   ```
3. Abrir en Android Studio:
   ```bash
   npx cap open android
   ```
4. Ejecutar desde Android Studio en un emulador o dispositivo fisico.

## Estructura (Atomic Design)
`src/app/components`
- **Atoms**: Elementos indivisibles (iconos, textos).
- **Molecules**: Grupos de atomos (search-bar, weather-card).
- **Organisms**: Grupos complejos (current-weather, forecast-list).
- **Pages**: Vistas principales (Home).

## Notas
- Historial de commits en español.
- Diseño "Glassmorphism" oscuro.
