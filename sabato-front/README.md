# Frontend: Biblioteca Cortázar

## Descripción del Proyecto

**La Gran Ocasión** es una plataforma web desarrollada para la Biblioteca Julio Cortazar de la Escuela Nacional 'Ernesto Sábato',con el objetivo de fomentar la lectura, la crítica literaria y la participación comunitaria entre alumnos y docentes. Este repositorio contiene la aplicación cliente construida bajo una arquitectura **Mobile First (RNF1)** para garantizar la accesibilidad y usabilidad.

* **Desarrollado por:** Alumnos del Instituto de Formación Docente y Tecnica N°166
* **Materia:** Práctica Docente (Prof. Lucas Salvatori).

##  Características Principales (RF)

* **Autenticación Institucional:** Inicio de sesión seguro (RF1).
* **Catálogo Interactivo:** Búsqueda y filtrado avanzado de libros (RF4, RF5).
* **Comunidad y Opiniones:** Valoración de libros y participación en foros (RF10, RF11).
* **Gamificación:** Sistema de insignias y reconocimiento a lectores destacados (RF15, RF13).
* **Panel Docente:** Acceso a funciones de moderación y creación de foros de debate (RF3, RF8, RF16).

##  Stack Tecnológico

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework** | **React.js** | Librería principal para construir la interfaz. |
| **Tooling** | **Vite** | Empaquetador y servidor de desarrollo rápido. |
| **UI/Estilos** | **Material-UI (MUI)** | Componentes de diseño para una interfaz intuitiva (RNF2). |
| **Llamadas API**|  Fetch | Gestión de la comunicación con el Backend. |

##  Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo:

### 1. Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/).

### 2. Clonar el repositorio
```bash
git clone  [https://github.com/TurcoDev/sababook-front.git] 
cd sababook-front
```
### 3. Instalacion de dependencias
npm install
### 4. Configurar Variables de Entorno
*Crea un archivo .env en la raíz del proyecto para definir la conexión con la API:
### URL base de la API del Backend (Express)
VITE_API_URL="http://localhost:3000/api/v1" 

### 5. Iniciar la Aplicación

*npm run dev
*La aplicación estará disponible en http://localhost:5173.
## Estructura del Proyecto (RNF9)
El proyecto sigue una estructura modular para garantizar la Mantenibilidad (RNF9):
*src/components: Componentes reutilizables de UI (ej. TarjetaLibro, Header).
*src/pages: Vistas principales de la aplicación (ej. /Home, /BookDetails).
*src/services: Módulos para las llamadas a la API (separa la lógica de datos de la UI).
*src/themes: Configuración de estilos y temas de MUI.