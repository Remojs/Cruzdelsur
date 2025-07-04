Estructura del New Home:

La pagina cuenta con 6 secciones bien marcadas:

1. Contacto
2. Recruitment
3. Training
4. Charters
5. Safety
6. Learning

Ademas de sesiones y componentes comunes netamente informativos o simples, por lo que la estructura tendria la carpeta de **/Features** donde estarian todas las carpetas de las diferentes secciones, **/Pages** donde irian componentes o secciones no reutilizables pero sin logica o con algun servicio simple, la carpeta de **/Shared** con los componentes reutilizables como navbar, modales, cards, footer, etc., la carpeta de **/Utils** con helpers, constantes y la carpeta de **/Services** con los servicios de la app.

En cuanto a lo multimedia estaria dividido en 2 grupos, la carpeta de **/Public**, que posee iconos de ventana y archivos mas troncales de el core de la app y por otro lado la carpeta de **/Assets** con los iconos, imagenes y demas detalles de la intefaz de la app.


```markdown
public/                 ← Assets estáticos servidos directamente (favicon, og:image...)
├── favicon.ico
├── robots.txt
└── logo192.png

src/
├── app/                # Layout general, rutas, configuración global
│   └── App.tsx
│   └── routes.tsx
│
├── features/
│   ├── home/
│   │   ├── HomePage.tsx
│   │   └── components/ ← específicos del home
│   ├── charters/
│   │   ├── ChartersPage.tsx
│   │   └── components/
│   ├── learning/
│   │   ├── LearningPage.tsx
│   │   └── components/
│   ├── recruitment/
│   │   ├── RecruitmentPage.tsx
│   │   └── components/
│   ├── trainings/
│   │   ├── TrainingsPage.tsx
│   │   └── components/
│   ├── safety/
│   │   ├── SafetyPage.tsx
│   │   └── components/
|
├── pages/
│   ├── Webinar/
|   ├── Contact/
│
├── assets/             ← Recursos globales de la app
│   ├── icons/          ← SVGs reutilizables (globales)
│   ├── images/         ← Logos, banners, backgrounds comunes
│
├── shared/             # Componentes reutilizables (Navbar, Footer, Card, Modal)
├── ui/                 # Estilos globales, temas, tokens
├── utils/              # Helpers, constantes, formateadores, etc.
└── services/           # Llamadas a APIs, lógica externa (si no es específica de un feature)
```

