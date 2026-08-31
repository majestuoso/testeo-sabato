#  Backend API: Biblioteca Cortázar

**La Gran Ocasión** es una plataforma web desarrollada para la Biblioteca Julio Cortázar de la Escuela Nacional 'Ernesto Sábato', con el objetivo de fomentar la lectura, la crítica literaria y la participación comunitaria entre alumnos y docentes. Este repositorio contiene el servicio backend responsable de la lógica de negocio, persistencia de datos, seguridad (RF17) y control de acceso basado en roles (RF3).

* **Desarrollado por:** Alumnos del Instituto de Formación Docente y Técnica N°166
* **Materia:** Práctica Profesionalizante (Prof. Lucas Salvatori).
* **Arquitectura:** Modelo Vista Controlador (MVC) (RNF9).
* **Objetivo de Rendimiento:** Asegurar un tiempo de respuesta rápido (RNF3).

---

##  Stack Tecnológico

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Lenguaje** | **TypeScript** | Desarrollo tipado, robusto y mantenible. |
| **Framework** | **Express.js** (Node.js) | Creación de la API RESTful. |
| **ORM** | **Prisma** | Modelado, migraciones y consultas a la base de datos. |
| **Base de Datos**| **PostgreSQL / Supabase** | Persistencia de datos relacional y alta confiabilidad (RNF7). |
| **Seguridad** | **JWT (JSON Web Tokens)** | Autenticación y gestión de sesiones. |

---

##  Instalación y Ejecución Local

### 1. Prerrequisitos
* [Node.js](https://nodejs.org/) (v18 o superior)
* Instancia de **PostgreSQL** local o un proyecto activo en [Supabase](https://supabase.com/).

### 2. Clonar el repositorio
```bash
git clone [https://github.com/TurcoDev/sababook-back.git](https://github.com/TurcoDev/sababook-back.git)
cd sababook-back


## 📄 Licencia

Copyright (c) 2026 All rights reserved. [ISFDyT N°166]

Este software y su documentación asociada son propiedad exclusiva de **Sabato**. Se prohíbe estrictamente la copia, reproducción, redistribución, modificación, venta o ingeniería inversa sin autorización previa por escrito del titular de los derechos de autor.

Para consultar el texto legal completo, revisa el archivo [`LICENSE.md`](./LICENSE.md).