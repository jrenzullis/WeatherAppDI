# Weather App - Ionic & Angular

## Descripcion
Aplicacion del tiempo desarrollada con Ionic y Angular, utilizando OpenWeather API.
Diseno basado en Atomic Design y soporte multi-idioma.

## Caracteristicas
- Busqueda de tiempo por ciudad.
- Geolocalizacion automatica ("Usar mi ubicacion").
- Tiempo actual con temperatura, humedad, viento y presion.
- Predicciones:
  - Horaria para el dia actual.
  - Diaria para los proximos 4 dias.
- Diseno moderno (Glassmorphism).

## Instalacion para el Desarrollador

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar la aplicacion:
   ```bash
   ionic serve
   ```

## Estructura del Proyecto (Atomic Design)
- **Atoms**: Componentes basicos (iconos, botones).
- **Molecules**: Componentes compuestos (barra de busqueda, tarjetas de tiempo).
- **Organisms**: Secciones complejas (lista de predicciones, tiempo actual).
- **Pages**: Pagina principal (Home).

## Notas
- Los commits se han realizado gradualmente en español.
- Se utiliza la API de OpenWeatherMap.
- Idiomas soportados: Español (ES) e Ingles (EN).
