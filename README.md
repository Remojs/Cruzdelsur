# Cruz del Sur - Sitio Web Corporativo

## Visión General

Cruz del Sur es una empresa dedicada al sector de la aviación en Latinoamérica, ofreciendo servicios de alta calidad en diversas áreas como vuelos charter, reclutamiento de personal especializado, capacitación, y consultoría en seguridad aeronáutica. Este proyecto es el sitio web corporativo diseñado para presentar de manera profesional y atractiva todos los servicios que la empresa ofrece.

## Objetivo del Proyecto

El sitio web está diseñado para:

- Presentar a Cruz del Sur como un líder en el sector de aviación en Latinoamérica
- Proporcionar información detallada sobre sus servicios especializados
- Facilitar la solicitud de cotizaciones para vuelos charter mediante un formulario intuitivo
- Establecer un canal de comunicación directo con potenciales clientes y partners
- Reflejar la filosofía de la empresa basada en la excelencia operativa, conocimiento local y compromiso genuino

## Principales Funcionalidades

- **Home:** Presentación general de la empresa con animaciones elegantes y secciones informativas sobre quiénes son y qué ofrecen.
- **Charters:** Solicitud de cotizaciones para vuelos privados con un formulario detallado para capturar las necesidades específicas del cliente.
- **Recruitment:** Servicios de reclutamiento especializado para la industria aeronáutica.
- **Training:** Programas de capacitación para profesionales del sector.
- **Safety:** Consultoría en seguridad aeronáutica y operacional.
- **Learning:** Recursos educativos y programas de aprendizaje.

## Tecnologías Utilizadas

- **Frontend:** React.js con JavaScript/JSX
- **Estilos:** CSS Modules para encapsulamiento de estilos por componente
- **Animaciones:** Framer Motion para animaciones fluidas y profesionales
- **Diseño Responsivo:** Adaptado para dispositivos móviles, tablets y desktops

## Estructura del Proyecto

El sitio está organizado siguiendo una arquitectura basada en características (feature-based), con componentes compartidos y una clara separación de responsabilidades:

## Componentes Destacados

### ScrollSection y ReverseScrollSection
Componentes animados que utilizan Framer Motion para crear efectos de animación al hacer scroll. Muestran información sobre la empresa con un diseño elegante que incluye imágenes, logos y texto descriptivo.

### SectionCard y SectionCardGroup
Conjunto de tarjetas interactivas que presentan los diferentes servicios de Cruz del Sur, permitiendo a los usuarios navegar a las secciones correspondientes.

### Stats
Componente informativo que muestra los valores corporativos que definen a Cruz del Sur, destacando su filosofía de trabajo y enfoque de negocio.

### Formulario de Charters
Formulario detallado para solicitar cotizaciones de vuelos charter, recogiendo información esencial como origen, destino, fecha, número de pasajeros y preferencias específicas.

## Diseño Visual

El sitio sigue una estética profesional y moderna con:
- Fondos animados que aportan dinamismo sin distraer del contenido
- Paleta de colores corporativos consistente en toda la aplicación
- Tipografía clara y legible (Quicksand como fuente principal)
- Efectos de hover y transiciones suaves para mejorar la experiencia de usuario
- Diseño responsivo adaptado a diferentes dispositivos

## Cómo Ejecutar el Proyecto

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Iniciar el servidor de desarrollo: `npm run dev`
4. Abrir en el navegador: `http://localhost:5173`

## Construcción y Despliegue

Para generar una versión de producción:
```bash
npm run build
```

Los archivos generados estarán en la carpeta `/dist` listos para ser desplegados en cualquier servicio de hosting estático.

---

Desarrollado por Remojs © 2025 Cruz del Sur


```markdown
public/                 ← Assets estáticos servidos directamente (favicon, og:image...)
├── favicon.ico
└── logo192.png

src/
├── app/                # Layout general, rutas, configuración global
│   └── App.jsx         # Componente principal que establece la estructura base
│   └── routes.jsx      # Configuración de rutas con React Router
│
├── features/
│   ├── home/           # Página principal con animaciones y secciones informativas
│   │   ├── home.jsx    # Componente principal de la página de inicio
│   │   └── home.module.css # Estilos específicos para la página de inicio
│   ├── charters/       # Formulario de solicitud de vuelos charter
│   │   ├── charters.jsx # Formulario detallado para cotización de vuelos privados
│   │   └── charters.module.css
│   ├── learning/       # Sección de recursos educativos
│   │   ├── learning.jsx
│   │   └── learning.module.css
│   ├── recruitment/    # Servicios de reclutamiento especializado
│   │   ├── recruitment.jsx
│   │   └── recruitment.module.css
│   ├── trainings/      # Programas de capacitación profesional
│   │   ├── trainings.jsx
│   │   └── trainings.module.css
│   ├── safety/         # Consultoría en seguridad aeronáutica
│   │   ├── safety.jsx
│   │   └── safety.module.css
|
├── pages/              # Páginas independientes sin lógica compleja
│   ├── webinar/        # Página para registro/visualización de webinars
│   │   ├── webinar.jsx
│   │   └── webinar.module.css
|   ├── contact/        # Formulario de contacto general
│
├── assets/             # Recursos globales de la app
│   ├── backgrounds/    # Fondos animados y estáticos para secciones
│   ├── banners/        # Imágenes destacadas para secciones principales
│   ├── icons/          # SVGs reutilizables (globales)
│   ├── images/         # Imágenes de contenido para distintas secciones
│   ├── logos/          # Variantes del logotipo de Cruz del Sur
│
├── shared/             # Componentes reutilizables 
│   ├── Contact/        # Formulario de contacto reutilizable
│   ├── Footer/         # Pie de página con información de contacto
│   ├── Navbar/         # Navegación principal
│   ├── ReverseScrollSection/ # Sección con efecto de scroll y layout invertido
│   ├── ScrollSection/  # Sección con efecto de scroll y animaciones
│   ├── SectionCard/    # Tarjetas para mostrar servicios
│   ├── SectionCardGroup/ # Grupo de tarjetas de servicios
│   ├── Stats/          # Componente para mostrar valores corporativos
│   ├── TextSection/    # Secciones de texto con imagen (normal y reversa)
│
├── ui/                 # Estilos globales, temas, tokens
│   ├── global.css      # Estilos base y variables CSS
│
├── utils/              # Helpers, constantes, formateadores, etc.
│   ├── scrollAnimation.js # Utilidades para animaciones de scroll
│
└── services/           # Llamadas a APIs, lógica externa
```

