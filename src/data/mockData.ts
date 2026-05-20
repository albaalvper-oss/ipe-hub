export const currentUser = {
  id: '1',
  name: 'Alex García',
  username: '@alexgarcia',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexStudent',
  ciclo: 'Grado Medio — Atención a Personas en Situación de Dependencia',
  centro: 'Centro Formación Profesional',
  xp: 3240,
  nivel: 12,
  xpSiguienteNivel: 4000,
  racha: 7,
  insignias: 14,
  completados: 8,
  enCurso: 3,
}

export const teacherProfile = {
  id: 'teacher1',
  name: 'Alba Álvarez',
  username: '@alba.alvarez',
  avatar: '/avatar-profe.jpg',
  subject: 'Profesora · Grado Medio TAPSD',
  centro: 'Centro Formación Profesional',
  alumnos: 28,
  cursosActivos: 2,
  misionesCreadas: 7,
}

export const misAlumnos = [
  { id: '1', nombre: 'Alex García', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexStudent', curso: 'IPE I', progreso: 65, xp: 3240, activo: true },
  { id: '2', nombre: 'María Torres', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MariaStudent', curso: 'IPE II', progreso: 80, xp: 4100, activo: true },
  { id: '3', nombre: 'Carlos Ruiz', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=CarlosStudent', curso: 'IPE I', progreso: 30, xp: 1200, activo: false },
  { id: '4', nombre: 'Laura Sanz', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=LauraStudent', curso: 'IPE II', progreso: 90, xp: 5200, activo: true },
  { id: '5', nombre: 'Diego Moreno', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=DiegoStudent', curso: 'IPE I', progreso: 45, xp: 1800, activo: true },
  { id: '6', nombre: 'Sofía Pérez', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=SofiaStudent', curso: 'IPE II', progreso: 55, xp: 2700, activo: false },
]

export const stories = [
  { id: '1', user: 'Profe Alba', avatar: '/avatar-profe.jpg', visto: false },
  { id: '2', user: 'Carlos Dev', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos', visto: false },
  { id: '3', user: 'IPE Hub', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=IPE', visto: false },
  { id: '4', user: 'María FP', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maria', visto: true },
  { id: '5', user: 'TechTips', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Tech', visto: true },
  { id: '6', user: 'Lucia Code', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lucia', visto: true },
]

export const feedPosts = [
  {
    id: '1',
    tipo: 'tip',
    titulo: '5 claves para una buena comunicación con personas mayores',
    descripcion: 'Escucha activa, paciencia, contacto visual y lenguaje sencillo. Habilidades que marcan la diferencia en tu día a día como auxiliar.',
    autor: 'María Torres',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MariaStudent',
    categoria: 'Atención a personas',
    categoriaColor: 'bg-blue-100 text-blue-700',
    likes: 142, comentarios: 23, guardados: 67,
    tiempo: '2h', xp: 15, liked: false, guardado: false,
    emoji: '🤝', gradiente: 'from-blue-500 to-indigo-600',
  },
  {
    id: '2',
    tipo: 'reto',
    titulo: 'Reto semanal: CV en 24h',
    descripcion: 'Actualiza tu CV con las habilidades que has aprendido esta semana. Compártelo con el grupo y recibe feedback.',
    autor: 'IPE Hub',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=IPE',
    categoria: 'Empleabilidad',
    categoriaColor: 'bg-emerald-100 text-emerald-700',
    likes: 89, comentarios: 31, guardados: 44,
    tiempo: '5h', xp: 50, liked: true, guardado: true,
    emoji: '🎯', gradiente: 'from-emerald-500 to-teal-600',
  },
  {
    id: '3',
    tipo: 'recurso',
    titulo: 'Guía práctica: técnicas de movilización segura',
    descripcion: 'Aprende a realizar traslados y cambios posturales sin riesgo para la persona atendida ni para ti. Ergonomía aplicada al sector.',
    autor: 'Profe Alba',
    avatar: '/avatar-profe.jpg',
    categoria: 'Técnicas de atención',
    categoriaColor: 'bg-purple-100 text-purple-700',
    likes: 203, comentarios: 45, guardados: 128,
    tiempo: '1d', xp: 20, liked: false, guardado: false,
    emoji: '💪', gradiente: 'from-purple-500 to-pink-600',
  },
]

export const resultadosIPE1 = [
  { id: 'ipe1-ra1', hecho: true,  texto: 'Distingue las características del sector productivo y define los puestos de trabajo relacionándolos con las competencias profesionales expresadas en el título.' },
  { id: 'ipe1-ra2', hecho: true,  texto: 'Adquiere las competencias necesarias para el desempeño de las funciones de nivel básico en Prevención de Riesgos Laborales.' },
  { id: 'ipe1-ra3', hecho: false, texto: 'Analiza sus condiciones laborales como persona trabajadora por cuenta ajena identificándolas en los principales tipos de cambios y vicisitudes relevantes que se pueden presentar en la relación laboral.' },
  { id: 'ipe1-ra4', hecho: false, texto: 'Analiza y evalúa su potencial profesional y sus intereses para guiarse en el proceso de autoorientación y elabora una hoja de ruta para la inserción profesional.' },
  { id: 'ipe1-ra5', hecho: false, texto: 'Aplica las estrategias para el aprendizaje autónomo reconociendo su valor profesionalizador, diseñando y optimizando su propio entorno de aprendizaje haciendo uso de las tecnologías digitales.' },
]

export const resultadosIPE2 = [
  { id: 'ipe2-ra1', hecho: true,  texto: 'Planifica y pone en marcha estrategias en los diferentes procesos selectivos de empleo que le permiten mejorar sus posibilidades de inserción laboral.' },
  { id: 'ipe2-ra2', hecho: true,  texto: 'Aplica estrategias relacionadas con las competencias personales, sociales y emocionales para el empleo en búsqueda de la mejora de su empleabilidad.' },
  { id: 'ipe2-ra3', hecho: false, texto: 'Pone en práctica las habilidades emprendedoras necesarias para el desarrollo de procesos de innovación e investigación aplicadas que promuevan la modernización del sector productivo.' },
  { id: 'ipe2-ra4', hecho: false, texto: 'Identifica, define y valida ideas de emprendimiento generadoras de nuevas oportunidades a partir de estrategias de análisis del entorno socio productivo utilizando metodologías ágiles.' },
  { id: 'ipe2-ra5', hecho: false, texto: 'Desarrolla un proyecto emprendedor de innovación social y/o tecnológica aplicada en colaboración con el entorno.' },
]

export const actividadReciente = [
  { tipo: 'curso', texto: 'Completaste "Técnicas de movilización y transferencias"', xp: 200, tiempo: 'hace 2 días', emoji: '💪' },
  { tipo: 'insignia', texto: 'Obtuviste la insignia "Racha 7 días"', xp: 50, tiempo: 'hoy', emoji: '🔥' },
  { tipo: 'reto', texto: 'Participaste en el Reto CV', xp: 50, tiempo: 'ayer', emoji: '🎯' },
  { tipo: 'like', texto: 'Tu tip sobre comunicación con mayores recibió 142 me gusta', xp: 15, tiempo: 'hace 2h', emoji: '❤️' },
]

// ─── CONÓCETE EN EL MERCADO ACTUAL ────────────────────────────────────────────

export const puestosEmpleo = [
  {
    id: '1',
    puesto: 'Auxiliar de geriatría',
    entorno: 'Residencias y centros sociosanitarios',
    emoji: '🏠',
    descripcion: 'Atención directa a personas mayores: higiene, alimentación, movilización y apoyo emocional.',
    demanda: 95,
    salario: '16.000 – 20.000 €/año',
    requisitosTitulo: true,
    color: 'from-blue-500 to-indigo-600',
    competencias: ['Técnicas de higiene', 'Movilización', 'Comunicación empática', 'Trabajo en equipo'],
  },
  {
    id: '2',
    puesto: 'Trabajador/a familiar (SAD)',
    entorno: 'Servicio de Atención a Domicilio',
    emoji: '🌿',
    descripcion: 'Apoyo a personas dependientes en su propio domicilio: AVD, compañía, gestión doméstica.',
    demanda: 88,
    salario: '14.000 – 18.000 €/año',
    requisitosTitulo: true,
    color: 'from-emerald-500 to-teal-600',
    competencias: ['Atención domiciliaria', 'Apoyo AVD', 'Acompañamiento', 'Autonomía'],
  },
  {
    id: '3',
    puesto: 'Monitor/a de estimulación cognitiva',
    entorno: 'Centros de día y residencias',
    emoji: '🧠',
    descripcion: 'Diseño e implementación de actividades de estimulación cognitiva, física y emocional.',
    demanda: 78,
    salario: '15.000 – 19.000 €/año',
    requisitosTitulo: true,
    color: 'from-violet-500 to-purple-600',
    competencias: ['Estimulación cognitiva', 'Creatividad', 'Dinamización de grupos', 'Empatía'],
  },
  {
    id: '4',
    puesto: 'Auxiliar en centro de día',
    entorno: 'Centros de atención diurna',
    emoji: '🌞',
    descripcion: 'Atención integral durante el día: actividades, comidas, higiene y apoyo social.',
    demanda: 72,
    salario: '15.500 – 18.500 €/año',
    requisitosTitulo: true,
    color: 'from-amber-500 to-orange-600',
    competencias: ['Atención básica', 'Animación sociocultural', 'Trabajo en equipo', 'PRL'],
  },
  {
    id: '5',
    puesto: 'Operador/a de teleasistencia',
    entorno: 'Centros de atención remota',
    emoji: '📞',
    descripcion: 'Atención telefónica y coordinación de recursos ante situaciones de emergencia de personas dependientes.',
    demanda: 70,
    salario: '14.500 – 17.000 €/año',
    requisitosTitulo: false,
    color: 'from-pink-500 to-rose-600',
    competencias: ['Comunicación', 'Gestión de emergencias', 'Escucha activa', 'Resiliencia'],
  },
]

export const comparativaPublicoPrivado = [
  { aspecto: 'Acceso al empleo', privado: 'CV, entrevista y selección directa', publico: 'Oposición / bolsa de empleo público' },
  { aspecto: 'Estabilidad laboral', privado: 'Variable según empresa y contrato', publico: 'Alta estabilidad (funcionario/laboral fijo)' },
  { aspecto: 'Salario inicial', privado: 'Según convenio sectorial TAPSD', publico: 'Fijado por RPT del ente público' },
  { aspecto: 'Progresión profesional', privado: 'Méritos, formación y movilidad interna', publico: 'Antigüedad, concursos y promoción interna' },
  { aspecto: 'Horarios', privado: 'Turnos rotatorios, fines de semana y festivos', publico: 'Más regulados, pero también turnos' },
  { aspecto: 'Formación continua', privado: 'Planes de empresa y FUNDAE', publico: 'INAP y planes de formación sectorial' },
  { aspecto: 'Tipo de contrato', privado: 'Indefinido, temporal o sustitución', publico: 'Laboral fijo, temporal o interino' },
]

export const aptitudesMercado = [
  {
    id: '1',
    categoria: 'Competencias técnicas',
    emoji: '🔧',
    color: 'from-blue-500 to-indigo-600',
    items: [
      'Técnicas de movilización y transferencias',
      'Protocolos de higiene y aseo personal',
      'Primeros auxilios y RCP básico',
      'Elaboración de planes de atención individualizados',
      'Estimulación cognitiva y física',
    ],
  },
  {
    id: '2',
    categoria: 'Competencias personales y sociales',
    emoji: '🤝',
    color: 'from-violet-500 to-purple-600',
    items: [
      'Empatía y escucha activa',
      'Paciencia y resiliencia emocional',
      'Trabajo en equipo interdisciplinar',
      'Comunicación asertiva con familias',
      'Respeto a la dignidad y autonomía de la persona',
    ],
  },
  {
    id: '3',
    categoria: 'Actitudes profesionales',
    emoji: '⭐',
    color: 'from-amber-500 to-orange-600',
    items: [
      'Vocación de servicio y cuidado',
      'Responsabilidad y puntualidad',
      'Discreción y confidencialidad',
      'Adaptabilidad ante situaciones imprevistas',
      'Compromiso con la formación continua',
    ],
  },
]

export const debateConocete = [
  {
    id: '1',
    autor: 'Alex García',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexStudent',
    texto: '¿Cuál es la diferencia real entre trabajar en una residencia privada y en una pública? En la privada me han dicho que hay más movilidad laboral pero en la pública más estabilidad. ¿Qué pesa más para vosotros?',
    likes: 14,
    tiempo: 'Hace 15 min',
    liked: false,
  },
  {
    id: '2',
    autor: 'María Torres',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MariaStudent',
    texto: 'Lo que más me sorprende del sector es la demanda de trabajadores/as. Hay plazas en casi todas las provincias de Castilla y León. Creo que el SAD es donde más salidas hay ahora mismo para recién titulados.',
    likes: 9,
    tiempo: 'Hace 30 min',
    liked: true,
  },
  {
    id: '3',
    autor: 'Diego Moreno',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=DiegoStudent',
    texto: 'He leído que la competencia más valorada en las entrevistas del sector no es técnica sino la empatía y la paciencia. ¿Cómo se desarrollan esas habilidades si venimos de un entorno sin experiencia previa en cuidados?',
    likes: 11,
    tiempo: 'Hace 1h',
    liked: false,
  },
  {
    id: '4',
    autor: 'Laura Sanz',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=LauraStudent',
    texto: 'Yo creo que nuestra zona de desarrollo próximo está en la comunicación con las familias. Técnicamente nos forman bien, pero gestionar las expectativas de la familia de una persona con Alzheimer es otro nivel.',
    likes: 17,
    tiempo: 'Hace 2h',
    liked: false,
  },
]

// ─── CONÓCETE ─────────────────────────────────────────────────────────────────

export const testIntereses = {
  progreso: 40,
  preguntas: [
    {
      id: '1', respondida: true, respuesta: 'a',
      pregunta: '¿Qué actividad disfrutas más?',
      opciones: [
        { id: 'a', texto: 'Crear y diseñar', emoji: '🎨' },
        { id: 'b', texto: 'Resolver problemas técnicos', emoji: '⚙️' },
        { id: 'c', texto: 'Ayudar y comunicar', emoji: '🤝' },
        { id: 'd', texto: 'Organizar y planificar', emoji: '📋' },
      ],
    },
    {
      id: '2', respondida: true, respuesta: 'b',
      pregunta: '¿Cómo prefieres trabajar?',
      opciones: [
        { id: 'a', texto: 'Solo con autonomía', emoji: '🧘' },
        { id: 'b', texto: 'En equipo colaborando', emoji: '👥' },
        { id: 'c', texto: 'Mezclando ambos', emoji: '⚖️' },
        { id: 'd', texto: 'Liderando al equipo', emoji: '🦁' },
      ],
    },
    {
      id: '3', respondida: false,
      pregunta: '¿Qué te motiva más en el trabajo?',
      opciones: [
        { id: 'a', texto: 'Crear impacto social', emoji: '🌍' },
        { id: 'b', texto: 'Ganar dinero', emoji: '💰' },
        { id: 'c', texto: 'Aprender constantemente', emoji: '📚' },
        { id: 'd', texto: 'Reconocimiento y logros', emoji: '🏆' },
      ],
    },
    {
      id: '4', respondida: false,
      pregunta: '¿Qué entorno de trabajo prefieres?',
      opciones: [
        { id: 'a', texto: 'Startup innovadora', emoji: '🚀' },
        { id: 'b', texto: 'Gran empresa estable', emoji: '🏢' },
        { id: 'c', texto: 'Freelance / Autónomo', emoji: '🏠' },
        { id: 'd', texto: 'ONG o sector público', emoji: '🌿' },
      ],
    },
    {
      id: '5', respondida: false,
      pregunta: '¿Qué habilidad quieres dominar?',
      opciones: [
        { id: 'a', texto: 'Programación y código', emoji: '💻' },
        { id: 'b', texto: 'Diseño y creatividad', emoji: '✏️' },
        { id: 'c', texto: 'Gestión y liderazgo', emoji: '📊' },
        { id: 'd', texto: 'Comunicación y ventas', emoji: '🎤' },
      ],
    },
  ],
}

export const misHabilidades = [
  { id: '1', nombre: 'Comunicación empática', nivel: 85, emoji: '🤝', color: 'from-blue-500 to-indigo-600' },
  { id: '2', nombre: 'Atención e higiene', nivel: 70, emoji: '🧼', color: 'from-pink-500 to-purple-600' },
  { id: '3', nombre: 'Movilización de personas', nivel: 60, emoji: '💪', color: 'from-green-500 to-emerald-600' },
  { id: '4', nombre: 'Trabajo en equipo', nivel: 90, emoji: '👥', color: 'from-amber-500 to-orange-600' },
  { id: '5', nombre: 'Estimulación cognitiva', nivel: 55, emoji: '🧠', color: 'from-cyan-500 to-blue-600' },
]

export const misObjetivos = [
  { id: '1', texto: 'Conseguir prácticas en residencia', completado: true, fecha: 'Jun 2025', emoji: '🏠' },
  { id: '2', texto: 'Obtener certificado de primeros auxilios', completado: false, fecha: 'Abr 2025', emoji: '🚑' },
  { id: '3', texto: 'Dominar técnicas de movilización', completado: false, fecha: 'May 2025', emoji: '💪' },
  { id: '4', texto: 'Conseguir empleo en SAD', completado: false, fecha: 'Sep 2025', emoji: '🌿' },
]

export const tarjetasReflexion = [
  { id: '1', pregunta: '¿Cuál es tu mayor fortaleza trabajando en equipo?', emoji: '💪', color: 'from-violet-500 to-purple-600' },
  { id: '2', pregunta: '¿Qué tipo de tareas te hacen perder la noción del tiempo?', emoji: '⏰', color: 'from-pink-500 to-rose-600' },
  { id: '3', pregunta: '¿Cómo reaccionas ante un problema inesperado?', emoji: '🧠', color: 'from-blue-500 to-cyan-600' },
  { id: '4', pregunta: '¿Qué quieres que digan de ti tus compañeros de trabajo?', emoji: '🌟', color: 'from-amber-500 to-orange-600' },
]

// ─── EL MERCADO HABLA ─────────────────────────────────────────────────────────

export const reelsMercado = [
  { id: '1', titulo: 'IA en el mercado 2026', subtitulo: 'Lo que debes saber', emoji: '🤖', gradiente: 'from-violet-500 to-purple-600', likes: 1204, vistas: '8.3k', url: 'https://www.youtube.com/shorts/iWyGmhWs7Yg' },
  { id: '2', titulo: 'Cómo preparar una entrevista', subtitulo: '5 consejos clave', emoji: '🎤', gradiente: 'from-amber-500 to-orange-600', likes: 847, vistas: '5.1k', url: 'https://www.youtube.com/watch?v=7yPw7WoL9zk' },
  { id: '3', titulo: 'SMI en España 2026', subtitulo: '¿Cuánto es ahora?', emoji: '💶', gradiente: 'from-emerald-500 to-teal-600', likes: 2103, vistas: '14k', url: 'https://www.sepe.es/HomeSepe/es/que-es-el-sepe/comunicacion-institucional/noticias/detalle-noticia.html?folder=/SEPE/2026/Febrero/&detail=boe-publica-smi-2026' },
  { id: '4', titulo: 'LinkedIn: perfil 10/10', subtitulo: '6 consejos clave', emoji: '💼', gradiente: 'from-blue-500 to-indigo-600', likes: 678, vistas: '3.8k', url: 'https://www.seoptimer.com/es/blog/6-consejos-para-tener-un-perfil-10-en-linkedin/' },
  { id: '5', titulo: 'Empresas que contratan FP', subtitulo: 'Top 10 de España', emoji: '🏆', gradiente: 'from-rose-500 to-pink-600', likes: 3200, vistas: '21k', url: '' },
]

export const debateMercado = [
  { id: '1', autor: 'Alex García', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexStudent', texto: 'La demanda de auxiliares de geriatría no para de crecer. Con la Ley de Dependencia hay cada vez más plazas en residencias y SAD. Creo que tenemos mucho futuro en este sector.', likes: 12, tiempo: 'Hace 10 min', liked: false },
  { id: '2', autor: 'María Torres', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MariaStudent', texto: 'Saber el SMI antes de buscar trabajo es clave. En el sector sociosanitario los convenios varían mucho y hay que negociar desde el conocimiento.', likes: 8, tiempo: 'Hace 25 min', liked: false },
  { id: '3', autor: 'Diego Moreno', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=DiegoStudent', texto: 'El vídeo de cómo preparar la entrevista me ha cambiado la perspectiva. Preparar bien el "¿por qué te dedicas al cuidado de personas?" es fundamental para este trabajo.', likes: 5, tiempo: 'Hace 1h', liked: false },
  { id: '4', autor: 'Laura Sanz', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=LauraStudent', texto: 'He actualizado mi LinkedIn con las prácticas en la residencia y ya me han contactado dos empresas de atención domiciliaria. Vale mucho la pena tener el perfil bien trabajado.', likes: 19, tiempo: 'Hace 2h', liked: false },
]

export const tendenciasMercado = [
  { id: '1', nombre: 'Atención a mayores', demanda: 95, emoji: '👴', up: true },
  { id: '2', nombre: 'Teleasistencia', demanda: 88, emoji: '📞', up: true },
  { id: '3', nombre: 'Atención a domicilio (SAD)', demanda: 85, emoji: '🏠', up: true },
  { id: '4', nombre: 'Centros de día', demanda: 78, emoji: '🌞', up: true },
  { id: '5', nombre: 'Apoyo a personas con discapacidad', demanda: 72, emoji: '♿', up: true },
  { id: '6', nombre: 'Estimulación cognitiva', demanda: 68, emoji: '🧠', up: true },
]

export const enlacesTendencias = [
  {
    id: '1',
    titulo: 'IA en el mercado 2026',
    descripcion: 'Descubre cómo la inteligencia artificial está transformando el mercado laboral este año.',
    emoji: '🤖',
    tipo: 'Vídeo',
    url: 'https://www.youtube.com/shorts/iWyGmhWs7Yg',
    gradiente: 'from-violet-500 to-purple-600',
  },
  {
    id: '2',
    titulo: 'Cómo preparar una entrevista',
    descripcion: 'Consejos y estrategias para afrontar con éxito una entrevista de trabajo.',
    emoji: '🎤',
    tipo: 'Vídeo',
    url: 'https://www.youtube.com/watch?v=7yPw7WoL9zk',
    gradiente: 'from-blue-500 to-indigo-600',
  },
  {
    id: '3',
    titulo: '¿Sabes cuál es el SMI en España en 2026?',
    descripcion: 'El BOE publica el nuevo Salario Mínimo Interprofesional para 2026. Conócelo.',
    emoji: '💶',
    tipo: 'Artículo',
    url: 'https://www.sepe.es/HomeSepe/es/que-es-el-sepe/comunicacion-institucional/noticias/detalle-noticia.html?folder=/SEPE/2026/Febrero/&detail=boe-publica-smi-2026',
    gradiente: 'from-emerald-500 to-teal-600',
  },
  {
    id: '4',
    titulo: '6 consejos para un perfil 10 en LinkedIn',
    descripcion: 'Optimiza tu perfil de LinkedIn y destaca ante los reclutadores del sector tech.',
    emoji: '💼',
    tipo: 'Artículo',
    url: 'https://www.seoptimer.com/es/blog/6-consejos-para-tener-un-perfil-10-en-linkedin/',
    gradiente: 'from-amber-500 to-orange-600',
  },
]

export const testimoniosProfesionales = [
  {
    id: '1',
    nombre: 'Sara López',
    puesto: 'Auxiliar de geriatría · Residencia San José',
    ciclo: 'TAPSD · Promoción 2022',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sara',
    mensaje: '"Salí de FP sin creer mucho en mí. Hoy trabajo cuidando a personas que de verdad me necesitan y eso no tiene precio."',
  },
  {
    id: '2',
    nombre: 'Marcos Vidal',
    puesto: 'Trabajador familiar · SAD Salamanca',
    ciclo: 'TAPSD · Promoción 2021',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Marcos',
    mensaje: '"La FP me preparó para lo que nadie te cuenta: el trato humano. Eso es lo que marca la diferencia en este trabajo."',
  },
]

export const ofertas = [
  {
    id: '1',
    empresa: 'Residencia San José', logo: '🏠',
    puesto: 'Auxiliar de geriatría',
    tipo: 'Prácticas', modalidad: 'Presencial', ubicacion: 'Salamanca',
    match: 92,
    habilidades: ['Higiene personal', 'Movilización', 'Atención básica'],
    fecha: 'hace 1 día', guardada: true,
  },
  {
    id: '2',
    empresa: 'SAD Castilla y León', logo: '🌿',
    puesto: 'Trabajador/a familiar (domicilio)',
    tipo: 'Contrato', modalidad: 'Presencial', ubicacion: 'Salamanca',
    match: 85,
    habilidades: ['Atención domiciliaria', 'Acompañamiento', 'Apoyo AVD'],
    fecha: 'hace 3 días', guardada: false,
  },
  {
    id: '3',
    empresa: 'Centro de Día Aurora', logo: '🌞',
    puesto: 'Auxiliar de atención a personas',
    tipo: 'Contrato', modalidad: 'Presencial', ubicacion: 'Salamanca',
    match: 78,
    habilidades: ['Estimulación cognitiva', 'Trabajo en equipo', 'Primeros auxilios'],
    fecha: 'hace 5 días', guardada: false,
  },
]

// ─── PARA EL AULA ─────────────────────────────────────────────────────────────

export const misionActiva = {
  id: '1',
  titulo: 'Semana del CV',
  descripcion: 'Crea o actualiza tu CV profesional y compártelo con tu grupo para recibir feedback real.',
  progreso: 50,
  xp: 100,
  deadline: '3 días',
  emoji: '📄',
  pasos: [
    { texto: 'Completa tus datos personales', hecho: true },
    { texto: 'Añade tus habilidades técnicas', hecho: true },
    { texto: 'Incluye proyectos o experiencia', hecho: false },
    { texto: 'Exporta en PDF y comparte', hecho: false },
  ],
}

export const retosABR = [
  {
    id: '1',
    titulo: 'Trabajando con Seguridad en el Ámbito del TAPSD',
    descripcion: 'En equipo, elegid un caso práctico contextualizado, analizad los riesgos laborales presentes, proponed medidas preventivas y determinad el protocolo de actuación más adecuado.',
    dificultad: 'Intermedio',
    xp: 400,
    deadline: '10 días',
    equipo: true,
    participantes: 28,
    emoji: '🦺',
    gradiente: 'from-amber-500 to-orange-600',
    tags: ['PRL', 'Casos prácticos', 'Equipo'],
    url: '/ACTIVIDAD_TRABAJANDO CON SEGURIDAD EN EL ÁMBITO DEL TAPSD.pdf',
  },
  {
    id: '3',
    titulo: 'Completo mi primer contrato de trabajo',
    descripcion: 'Descarga las tres ofertas de empleo, elige la que más se ajuste a tu perfil y completa el modelo de contrato correspondiente con todos los datos de la oferta seleccionada.',
    dificultad: 'Básico',
    xp: 300,
    deadline: '7 días',
    equipo: false,
    participantes: 28,
    emoji: '✍️',
    gradiente: 'from-blue-500 to-indigo-600',
    tags: ['Contratos', 'Empleo', 'Documentación'],
    url: '/ACTIVIDAD 3_ COMPLETO MI PRIMER CONTRATO DE TRABAJO.pdf',
    nota: 'En el apartado Recursos encontrarás los tres modelos de contrato (indefinido, temporal y formativo) para descargar y completar.',
  },
]

export const retosABR_IPE2 = [
  {
    id: '1',
    titulo: 'Superando retos en equipo',
    descripcion: 'Sois el equipo de auxiliares de un centro de día. Se incorpora una nueva compañera y la situación no es sencilla: un usuario conflictivo, desacuerdos internos y el turno muy cargado. Elaborad un plan de acogida consensuado y presentad vuestra propuesta al grupo.',
    dificultad: 'Intermedio',
    xp: 450,
    deadline: '10 días',
    equipo: true,
    participantes: 28,
    emoji: '🤝',
    gradiente: 'from-violet-500 to-purple-600',
    tags: ['Trabajo en equipo', 'Resolución de conflictos', 'Entorno profesional'],
    url: '/ACTIVIDAD_ SUPERANDO RETOS EN EQUIPO.pdf',
  },
]

export const insigniasAula = [
  { id: '1', nombre: 'Primera misión', emoji: '🎯', obtenida: true },
  { id: '2', nombre: 'Trabajo en equipo', emoji: '🤝', obtenida: true },
  { id: '3', nombre: 'Cuidador/a estrella', emoji: '⭐', obtenida: false },
  { id: '4', nombre: 'Mentor', emoji: '🦉', obtenida: false },
  { id: '5', nombre: 'Manos cuidadoras', emoji: '🫶', obtenida: true },
  { id: '6', nombre: 'Profesional TAPSD', emoji: '🏅', obtenida: false },
]

export const recursosDocentes = [
  {
    id: '5',
    titulo: 'Modelo de Contrato de Trabajo Indefinido (SEPE)',
    tipo: 'PDF',
    emoji: '📄',
    descripcion: 'Modelo oficial del SEPE para contratos de trabajo indefinido. Incluye cláusulas estándar y específicas.',
    url: '/Modelo de Contrato de Trabajo Indefinido (SEPE).pdf',
  },
  {
    id: '6',
    titulo: 'Modelo de Contrato de Trabajo Temporal (SEPE)',
    tipo: 'PDF',
    emoji: '📄',
    descripcion: 'Modelo oficial del SEPE para contratos temporales. Incluye cláusulas por circunstancias de producción, sustitución y otras modalidades.',
    url: '/Modelo de Contrato de Trabajo Temporal (SEPE).pdf',
  },
  {
    id: '7',
    titulo: 'Modelo de Contrato Formativo — Práctica Profesional (SEPE)',
    tipo: 'PDF',
    emoji: '📄',
    descripcion: 'Modelo oficial del SEPE para contratos formativos en práctica profesional. Dirigido a titulados/as que buscan su primera experiencia en el sector.',
    url: '/Modelo del Contrato Formativo para la obtención de la práctica profesional (SEPE).pdf',
  },
]

export const actividadesDocente = [
  { id: '1', titulo: 'Misión: Crea tu CV para el sector sociosanitario', tipo: 'Misión', emoji: '🎯', estado: 'activa', alumnos: 28, entregados: 12, deadline: '15 mayo' },
  { id: '2', titulo: 'Reto ABR: Plan de atención personalizado', tipo: 'Reto ABR', emoji: '📋', estado: 'activa', alumnos: 28, entregados: 8, deadline: '20 mayo' },
  { id: '3', titulo: 'Reflexión: ¿Quién soy?', tipo: 'Reflexión', emoji: '🪞', estado: 'completada', alumnos: 28, entregados: 28, deadline: '1 mayo' },
]

export const actividadesDocente_IPE1 = [
  { id: '1', titulo: 'Trabajando con Seguridad en el Ámbito del TAPSD', tipo: 'Reto ABR', emoji: '🦺', estado: 'activa', alumnos: 28, entregados: 10, deadline: '10 días' },
  { id: '2', titulo: 'Completo mi primer contrato de trabajo', tipo: 'Reto ABR', emoji: '✍️', estado: 'activa', alumnos: 28, entregados: 6, deadline: '7 días' },
]

export const actividadesDocente_IPE2 = [
  { id: '1', titulo: 'Superando retos en equipo', tipo: 'Reto ABR', emoji: '🤝', estado: 'activa', alumnos: 28, entregados: 5, deadline: '10 días' },
]

export const evaluacionesDocente: {
  id: string
  titulo: string
  descripcion: string
  categoria: 'Rúbrica' | 'Autoevaluación' | 'Lista de cotejo' | 'Lista de observación'
  emoji: string
  url: string
  ipe: 'IPE I' | 'IPE II'
}[] = [
  // ── IPE I ──────────────────────────────────────────────────────────────────
  {
    id: '1',
    titulo: 'Rúbrica Actividad 2 (PRL)',
    descripcion: 'Criterios y niveles de desempeño para la actividad de Prevención de Riesgos Laborales.',
    categoria: 'Rúbrica',
    emoji: '📋',
    url: '/RÚBRICA ACTIVIDAD 2. (PRL).pdf',
    ipe: 'IPE I',
  },
  {
    id: '2',
    titulo: 'Autoevaluación de Actividad 1',
    descripcion: 'Instrumento para que el alumnado valore su propio desempeño en la Actividad 1.',
    categoria: 'Autoevaluación',
    emoji: '🪞',
    url: '/AUTOEVALAUCIÓN DE ACTIVIDAD 1.pdf',
    ipe: 'IPE I',
  },
  {
    id: '3',
    titulo: 'Lista de Cotejo Actividad 3 (Contrato)',
    descripcion: 'Indicadores para verificar el cumplimiento de criterios en la actividad del contrato de trabajo.',
    categoria: 'Lista de cotejo',
    emoji: '✅',
    url: '/LISTA DE COTEJO ACTIVIDAD 3. (CONTRATO).pdf',
    ipe: 'IPE I',
  },
  {
    id: '4',
    titulo: 'Lista de Cotejo Actividad 5 — Descubriendo mi perfil profesional',
    descripcion: 'Indicadores para verificar los criterios de la actividad Descubriendo mi perfil profesional.',
    categoria: 'Lista de cotejo',
    emoji: '✅',
    url: '/LISTA DE COTEJO ACTIVIDAD 5..pdf',
    ipe: 'IPE I',
  },
  // ── IPE II ─────────────────────────────────────────────────────────────────
  {
    id: '5',
    titulo: 'Rúbrica para debate (Actividad 1)',
    descripcion: 'Criterios de evaluación para la actividad de debate en equipo.',
    categoria: 'Rúbrica',
    emoji: '🗣️',
    url: '/Rúbrica para debate (Actividad 1).pdf',
    ipe: 'IPE II',
  },
  {
    id: '6',
    titulo: 'Rúbrica Actividad 2: Rúbrica de trabajo cooperativo',
    descripcion: 'Criterios y niveles de desempeño para evaluar el trabajo cooperativo en la Actividad 2.',
    categoria: 'Rúbrica',
    emoji: '🤝',
    url: '/Rúbrica Actividad 2. (IPE II).pdf',
    ipe: 'IPE II',
  },
  {
    id: '7',
    titulo: 'Rúbrica del Proyecto Emprendedor',
    descripcion: 'Criterios de evaluación para el proyecto de emprendimiento final.',
    categoria: 'Rúbrica',
    emoji: '🚀',
    url: '/RÚBRICA DEL PROYECTO EMPRENDEDOR.pdf',
    ipe: 'IPE II',
  },
]

export const materialesParaAlumnado = [
  { id: '3', titulo: 'Plantilla Método Pomodoro Estudio Organización', tipo: 'Plantilla', emoji: '🍅', alumnos: 28, vistos: 14, descripcion: 'Hoja de registro para organizar tus sesiones de estudio. Incluye periodos de 25 min, asignatura, temas y descansos.', url: '/Método Pomodoro Estudio Organización.pdf', gradiente: 'from-red-500 to-orange-500' },
  { id: '4', titulo: 'Plantillas Mapas Conceptuales', tipo: 'Plantilla', emoji: '🗺️', alumnos: 28, vistos: 9, descripcion: 'Plantillas visuales para organizar ideas y conceptos clave. Ideal para repasar y preparar exámenes.', url: '/Plantillas Mapas Conceptuales.pdf', gradiente: 'from-blue-500 to-cyan-500' },
  { id: '5', titulo: 'Plantillas Esquema y Tabla Comparativa', tipo: 'Plantilla', emoji: '📊', alumnos: 28, vistos: 7, descripcion: 'Plantillas para estructurar esquemas y comparar elementos de forma visual y ordenada.', url: '/Plantillas Esquema y Tabla comparativa.pdf', gradiente: 'from-violet-500 to-purple-600' },
]

export const misRecursosAula = [
  { id: '1', titulo: 'Presentación Intro IPE', tipo: 'Presentación', emoji: '📊', formato: 'PPTX', tamaño: '4.2 MB', fecha: 'Hace 2 días', compartido: false },
  { id: '2', titulo: 'Dinámica "¿Quién soy?"', tipo: 'Actividad', emoji: '🎯', formato: 'PDF', tamaño: '1.1 MB', fecha: 'Hace 5 días', compartido: true },
  { id: '3', titulo: 'Vídeo: El mercado laboral FP', tipo: 'Vídeo', emoji: '🎬', formato: 'MP4', tamaño: '120 MB', fecha: 'Hace 1 semana', compartido: false },
  { id: '4', titulo: 'Plantilla CV europeo', tipo: 'Plantilla', emoji: '📄', formato: 'DOCX', tamaño: '890 KB', fecha: 'Hace 2 semanas', compartido: true },
  { id: '5', titulo: 'Rúbrica evaluación ABR', tipo: 'Evaluación', emoji: '📋', formato: 'PDF', tamaño: '560 KB', fecha: 'Hace 3 semanas', compartido: false },
  { id: '6', titulo: 'Guía orientación profesional TAPSD', tipo: 'Guía', emoji: '📖', formato: 'PDF', tamaño: '2.3 MB', fecha: 'Hace 1 mes', compartido: true },
]

// ─── APRENDER A ESTUDIAR ──────────────────────────────────────────────────────

export const tecnicasEstudio = [
  {
    id: '1', nombre: 'Técnica Pomodoro',
    descripcion: '25 min trabajo + 5 min descanso. Mantén la concentración sin quemarte.',
    emoji: '🍅', color: 'from-red-500 to-orange-500', dificultad: 'Fácil', tiempo: '30 min',
  },
  {
    id: '2', nombre: 'Mapas conceptuales',
    descripcion: 'Conecta ideas visualmente para comprender y memorizar mejor los conceptos.',
    emoji: '🗺️', color: 'from-blue-500 to-cyan-500', dificultad: 'Media', tiempo: 'Variable',
  },
  {
    id: '3', nombre: 'Método Feynman',
    descripcion: 'Explica el concepto como si se lo contaras a alguien que no sabe nada.',
    emoji: '🧑‍🏫', color: 'from-violet-500 to-purple-600', dificultad: 'Media', tiempo: '20 min',
  },
  {
    id: '4', nombre: 'Repetición espaciada',
    descripcion: 'Repasa el material en intervalos crecientes para retener a largo plazo.',
    emoji: '🔄', color: 'from-emerald-500 to-teal-600', dificultad: 'Media', tiempo: 'Diario',
  },
  {
    id: '5', nombre: 'Método Cornell',
    descripcion: 'Sistema de apuntes en tres partes: notas, claves y resumen para mayor comprensión.',
    emoji: '📝', color: 'from-amber-500 to-orange-600', dificultad: 'Fácil', tiempo: 'En clase',
  },
  {
    id: '6', nombre: 'Chunking',
    descripcion: 'Divide la información en bloques pequeños y manejables para aprenderlos uno a uno.',
    emoji: '🧩', color: 'from-pink-500 to-rose-600', dificultad: 'Fácil', tiempo: 'Variable',
  },
]

export const herramientasIA = [
  { id: '1', nombre: 'NotebookLM', descripcion: 'IA de Google para analizar tus apuntes, generar resúmenes y crear podcasts de tus documentos.', emoji: '📒', bg: 'bg-blue-500', categoria: 'Estudio', gratis: true, url: 'https://notebooklm.google/' },
  { id: '3', nombre: 'Notion AI', descripcion: 'Organiza tus apuntes, genera resúmenes y crea esquemas automáticamente.', emoji: '📓', bg: 'bg-slate-600', categoria: 'Organización', gratis: false, url: 'https://www.notion.so/' },
  { id: '5', nombre: 'Gamma', descripcion: 'Genera presentaciones profesionales con IA en segundos.', emoji: '✨', bg: 'bg-violet-600', categoria: 'Presentaciones', gratis: true, url: 'https://gamma.app/' },
]

export const tareasHoy = [
  { id: '1', texto: 'Repasar técnicas de higiene y aseo personal', hecho: true, materia: 'Atención básica', emoji: '🧼', urgente: false },
  { id: '2', texto: 'Entregar práctica de movilización', hecho: false, materia: 'Movilización', emoji: '💪', urgente: true },
  { id: '3', texto: 'Leer protocolo de atención en residencias', hecho: false, materia: 'Protocolos', emoji: '📋', urgente: false },
  { id: '4', texto: 'Actualizar CV con experiencia en prácticas', hecho: false, materia: 'Empleabilidad', emoji: '📄', urgente: false },
]

// ─── PERFIL ───────────────────────────────────────────────────────────────────

export const cursos = [
  {
    id: '1', titulo: 'Técnicas de movilización y transferencias',
    descripcion: 'Aprende a realizar traslados, cambios posturales y transferencias de forma segura y sin riesgos.',
    categoria: 'Atención física', nivel: 'Básico', duracion: '12h', modulos: 8,
    progreso: 65, xp: 200, valoracion: 4.8, alumnos: 1240,
    imagen: '💪', gradiente: 'from-yellow-400 to-orange-500', inscrito: true,
  },
  {
    id: '2', titulo: 'Atención a personas con Alzheimer',
    descripcion: 'Comprende las fases de la enfermedad y aprende estrategias de comunicación y cuidado adaptadas.',
    categoria: 'Atención especializada', nivel: 'Intermedio', duracion: '10h', modulos: 6,
    progreso: 20, xp: 150, valoracion: 4.9, alumnos: 890,
    imagen: '🧠', gradiente: 'from-pink-400 to-purple-500', inscrito: true,
  },
  {
    id: '3', titulo: 'Primeros auxilios básicos',
    descripcion: 'RCP, manejo de emergencias y actuación ante caídas. Formación esencial para el sector sociosanitario.',
    categoria: 'Seguridad', nivel: 'Básico', duracion: '8h', modulos: 5,
    progreso: 0, xp: 120, valoracion: 4.7, alumnos: 2100,
    imagen: '🚑', gradiente: 'from-blue-400 to-cyan-500', inscrito: false,
  },
  {
    id: '4', titulo: 'Estimulación cognitiva y actividades',
    descripcion: 'Diseña e implementa actividades de estimulación cognitiva, física y emocional para personas mayores.',
    categoria: 'Intervención social', nivel: 'Intermedio', duracion: '10h', modulos: 7,
    progreso: 0, xp: 250, valoracion: 4.9, alumnos: 3400,
    imagen: '🎲', gradiente: 'from-cyan-400 to-blue-500', inscrito: false,
  },
  {
    id: '5', titulo: 'Empleabilidad en el sector sociosanitario',
    descripcion: 'CV, LinkedIn, entrevistas y soft skills orientados a residencias, SAD y centros de día.',
    categoria: 'Empleabilidad', nivel: 'Todos', duracion: '6h', modulos: 4,
    progreso: 90, xp: 100, valoracion: 4.6, alumnos: 756,
    imagen: '🚀', gradiente: 'from-green-400 to-emerald-500', inscrito: true,
  },
  {
    id: '6', titulo: 'Comunicación con personas en situación de dependencia',
    descripcion: 'Técnicas de comunicación verbal y no verbal, escucha activa y apoyo emocional.',
    categoria: 'Habilidades sociales', nivel: 'Básico', duracion: '5h', modulos: 4,
    progreso: 100, xp: 80, valoracion: 4.8, alumnos: 4200,
    imagen: '🤝', gradiente: 'from-rose-400 to-pink-500', inscrito: true,
  },
]

export const insignias = [
  { id: '1', nombre: 'Primera Estrella', emoji: '⭐', obtenida: true, fecha: 'Oct 2024' },
  { id: '2', nombre: 'Manos cuidadoras', emoji: '🫶', obtenida: true, fecha: 'Nov 2024' },
  { id: '3', nombre: 'Racha 7 días', emoji: '🔥', obtenida: true, fecha: 'Hoy' },
  { id: '4', nombre: 'Primer Empleo', emoji: '💼', obtenida: false, fecha: null },
  { id: '5', nombre: 'Cuidador/a estrella', emoji: '⭐', obtenida: true, fecha: 'Ene 2025' },
  { id: '6', nombre: 'Colaborador', emoji: '🤝', obtenida: false, fecha: null },
  { id: '7', nombre: 'Empático/a', emoji: '💛', obtenida: false, fecha: null },
  { id: '8', nombre: 'Profesional TAPSD', emoji: '🏅', obtenida: false, fecha: null },
  { id: '9', nombre: 'Prevencionista', emoji: '🦺', obtenida: false, fecha: null },
  { id: '10', nombre: 'Emprendedor/a', emoji: '🚀', obtenida: false, fecha: null },
]

// ─── TRABAJA SEGURO ───────────────────────────────────────────────────────────

export const riesgosSector = [
  {
    id: '1',
    nombre: 'Riesgos ergonómicos',
    descripcion: 'Sobreesfuerzos al movilizar personas, posturas forzadas y movimientos repetitivos.',
    emoji: '🦴',
    nivel: 'Alto',
    color: 'from-red-500 to-orange-500',
    medidas: ['Usar técnicas de movilización correctas', 'Pedir ayuda cuando sea necesario', 'Usar grúas y productos de apoyo', 'Calentar antes de esfuerzos físicos'],
  },
  {
    id: '2',
    nombre: 'Riesgos biológicos',
    descripcion: 'Contacto con microorganismos patógenos durante la atención e higiene personal.',
    emoji: '🦠',
    nivel: 'Alto',
    color: 'from-violet-500 to-purple-600',
    medidas: ['Lavado de manos frecuente', 'Uso de guantes y mascarilla', 'Gestión correcta de residuos', 'Vacunación recomendada'],
  },
  {
    id: '3',
    nombre: 'Riesgos psicosociales',
    descripcion: 'Estrés, desgaste emocional y burnout por la alta demanda emocional del trabajo.',
    emoji: '🧠',
    nivel: 'Medio',
    color: 'from-blue-500 to-indigo-600',
    medidas: ['Supervisión y apoyo del equipo', 'Límites emocionales saludables', 'Descansos y autocuidado', 'Formación en inteligencia emocional'],
  },
  {
    id: '4',
    nombre: 'Riesgos por caídas',
    descripcion: 'Caídas del propio profesional o de las personas atendidas por suelos húmedos o mala iluminación.',
    emoji: '⚠️',
    nivel: 'Medio',
    color: 'from-amber-500 to-orange-600',
    medidas: ['Suelos antideslizantes', 'Iluminación adecuada', 'Calzado de seguridad', 'Barras y asideros instalados'],
  },
]

export const episSector = [
  { id: '1', nombre: 'Guantes de látex/nitrilo', uso: 'Higiene personal y curas', emoji: '🧤', obligatorio: true },
  { id: '2', nombre: 'Mascarilla quirúrgica', uso: 'Atención respiratoria y epidemias', emoji: '😷', obligatorio: true },
  { id: '3', nombre: 'Bata o uniforme', uso: 'Protección de la ropa y barrera de contaminación', emoji: '🥼', obligatorio: true },
  { id: '4', nombre: 'Calzado antideslizante', uso: 'Prevención de caídas en superficies húmedas', emoji: '👟', obligatorio: true },
  { id: '5', nombre: 'Faja lumbar', uso: 'Protección de la espalda en movilizaciones', emoji: '🦺', obligatorio: false },
  { id: '6', nombre: 'Gafas de protección', uso: 'Procedimientos con riesgo de salpicaduras', emoji: '🥽', obligatorio: false },
]

export const protocolosEmergencia = [
  {
    id: '1',
    titulo: 'Protocolo ante caída de una persona',
    pasos: [
      'Mantén la calma y no muevas a la persona precipitadamente',
      'Evalúa el estado de consciencia y busca lesiones visibles',
      'Avisa al equipo y a la enfermería inmediatamente',
      'Registra el incidente en el parte de accidentes',
      'Acompaña a la persona hasta que llegue asistencia médica',
    ],
    emoji: '🚨',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: '2',
    titulo: 'Protocolo de atragantamiento',
    pasos: [
      'Pregunta si puede toser. Si puede, anímale a toser fuertemente',
      'Si no puede, aplica 5 golpes en la espalda entre los omóplatos',
      'Si no mejora, aplica la maniobra de Heimlich (5 compresiones abdominales)',
      'Alterna golpes y compresiones hasta que expulse el objeto',
      'Si pierde la consciencia, inicia RCP y llama al 112',
    ],
    emoji: '🫁',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: '3',
    titulo: 'Protocolo ante emergencia médica',
    pasos: [
      'Evalúa si la persona está consciente y respira',
      'Llama al 112 e informa de la situación y ubicación exacta',
      'Aplica los primeros auxilios según tu formación',
      'No administres medicación sin indicación médica',
      'Acompaña hasta la llegada de los servicios de emergencia',
    ],
    emoji: '🏥',
    color: 'from-blue-500 to-indigo-600',
  },
]

export const quizPRL = [
  {
    id: '1',
    pregunta: '¿Cuál es el principal riesgo ergonómico al movilizar a una persona?',
    opciones: [
      { id: 'a', texto: 'Lesión lumbar por sobreesfuerzo', correcto: true },
      { id: 'b', texto: 'Alergias cutáneas' },
      { id: 'c', texto: 'Pérdida de visión' },
      { id: 'd', texto: 'Sordera profesional' },
    ],
    explicacion: 'Las lesiones lumbares son la causa más frecuente de baja laboral en el sector de la dependencia.',
  },
  {
    id: '2',
    pregunta: '¿Qué EPI es OBLIGATORIO en todas las tareas de higiene personal?',
    opciones: [
      { id: 'a', texto: 'Faja lumbar' },
      { id: 'b', texto: 'Gafas de protección' },
      { id: 'c', texto: 'Guantes de nitrilo/látex', correcto: true },
      { id: 'd', texto: 'Casco de seguridad' },
    ],
    explicacion: 'Los guantes son la barrera básica contra riesgos biológicos en el contacto directo con la persona atendida.',
  },
  {
    id: '3',
    pregunta: 'Ante el atragantamiento de una persona consciente que no puede toser, ¿qué haces primero?',
    opciones: [
      { id: 'a', texto: 'Maniobra de Heimlich directamente' },
      { id: 'b', texto: '5 golpes en la espalda entre omóplatos', correcto: true },
      { id: 'c', texto: 'Llamar al 112 antes que nada' },
      { id: 'd', texto: 'Darle agua para que trague' },
    ],
    explicacion: 'El protocolo indica comenzar con 5 golpes interescapulares. Si no funciona, se alterna con la maniobra de Heimlich.',
  },
  {
    id: '4',
    pregunta: '¿Qué se entiende por "burnout" en el sector sociosanitario?',
    opciones: [
      { id: 'a', texto: 'Una lesión física por caída' },
      { id: 'b', texto: 'Agotamiento emocional y despersonalización por sobrecarga laboral', correcto: true },
      { id: 'c', texto: 'Un riesgo biológico por contacto' },
      { id: 'd', texto: 'Una intoxicación por productos de limpieza' },
    ],
    explicacion: 'El burnout o síndrome del trabajador quemado es un riesgo psicosocial muy prevalente en el sector de la dependencia.',
  },
]

// ─── EMPRENDE ─────────────────────────────────────────────────────────────────

export const fasesEmprende = [
  {
    id: '1',
    titulo: 'Detecta una necesidad',
    subtitulo: 'RA3 — Análisis del entorno',
    descripcion: 'Observa tu sector, identifica problemas reales y valida que existe una necesidad insatisfecha.',
    emoji: '🔍',
    gradiente: 'from-blue-500 to-indigo-600',
    completada: true,
    xp: 100,
  },
  {
    id: '2',
    titulo: 'Genera ideas',
    subtitulo: 'RA3 — Creatividad e innovación',
    descripcion: 'Aplica técnicas de ideación: brainstorming, SCAMPER, mapa de empatía.',
    emoji: '💡',
    gradiente: 'from-amber-500 to-orange-600',
    completada: true,
    xp: 150,
  },
  {
    id: '3',
    titulo: 'Business Model Canvas',
    subtitulo: 'RA4 — Modelo de negocio',
    descripcion: 'Completa el lienzo de modelo de negocio definiendo propuesta de valor, clientes y recursos clave.',
    emoji: '🗺️',
    gradiente: 'from-violet-500 to-purple-600',
    completada: false,
    xp: 200,
    activa: true,
  },
  {
    id: '4',
    titulo: 'Valida tu idea',
    subtitulo: 'RA4 — Validación',
    descripcion: 'Entrevista a posibles usuarios, analiza la competencia y ajusta tu propuesta.',
    emoji: '✅',
    gradiente: 'from-emerald-500 to-teal-600',
    completada: false,
    xp: 200,
  },
  {
    id: '5',
    titulo: 'Prototipa',
    subtitulo: 'RA5 — Desarrollo',
    descripcion: 'Crea un prototipo de bajo coste para testear tu solución con usuarios reales.',
    emoji: '🛠️',
    gradiente: 'from-pink-500 to-rose-600',
    completada: false,
    xp: 250,
  },
  {
    id: '6',
    titulo: 'Pitch final',
    subtitulo: 'RA5 — Presentación',
    descripcion: 'Presenta tu proyecto en 3 minutos ante el aula. Storytelling, datos y propuesta de valor.',
    emoji: '🎤',
    gradiente: 'from-rose-500 to-pink-600',
    completada: false,
    xp: 300,
  },
]

export const ideasEmprendedoras = [
  {
    id: '1',
    titulo: 'App de seguimiento de medicación',
    descripcion: 'Aplicación móvil para que familias y auxiliares gestionen la medicación de personas mayores en tiempo real.',
    categoria: 'Tecnología social',
    ods: ['3', '10'],
    votos: 34,
    autor: 'Laura Sanz',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=LauraStudent',
    votado: false,
  },
  {
    id: '2',
    titulo: 'Servicio de acompañamiento digital',
    descripcion: 'Voluntariado organizado para reducir la brecha digital en personas mayores de residencias y hogares.',
    categoria: 'Inclusión social',
    ods: ['10', '17'],
    votos: 28,
    autor: 'Alex García',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexStudent',
    votado: true,
  },
  {
    id: '3',
    titulo: 'Plataforma de formación para cuidadores familiares',
    descripcion: 'Cursos breves online para que familiares de personas dependientes aprendan técnicas básicas de cuidado.',
    categoria: 'Educación',
    ods: ['4', '3'],
    votos: 19,
    autor: 'María Torres',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MariaStudent',
    votado: false,
  },
]

export const odsRelacionados = [
  { numero: '3', titulo: 'Salud y bienestar', emoji: '❤️', color: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
  { numero: '4', titulo: 'Educación de calidad', emoji: '📚', color: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' },
  { numero: '8', titulo: 'Trabajo decente', emoji: '💼', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
  { numero: '10', titulo: 'Reducción de desigualdades', emoji: '⚖️', color: 'bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400' },
  { numero: '17', titulo: 'Alianzas para los objetivos', emoji: '🤝', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' },
]

export const itinerario = [
  {
    id: '1', fase: 1,
    titulo: 'Fundamentos de la Dependencia',
    descripcion: 'Bases de la atención sociosanitaria, legislación y perfil profesional',
    estado: 'completado',
    items: [
      { titulo: 'El Sistema de la Dependencia en España', completado: true, xp: 50 },
      { titulo: 'Perfil y funciones del Técnico TAPSD', completado: true, xp: 80 },
      { titulo: 'Primeros auxilios básicos', completado: true, xp: 60 },
    ],
    xpTotal: 190, fecha: 'Octubre 2024',
  },
  {
    id: '2', fase: 2,
    titulo: 'Atención y Cuidados',
    descripcion: 'Técnicas de higiene, movilización y atención a las AVD',
    estado: 'en_curso',
    items: [
      { titulo: 'Técnicas de movilización y transferencias', completado: true, xp: 200 },
      { titulo: 'Higiene personal y aseo', completado: false, xp: 150 },
      { titulo: 'Alimentación y nutrición en dependencia', completado: false, xp: 150 },
    ],
    xpTotal: 500, fecha: 'En curso',
  },
  {
    id: '3', fase: 3,
    titulo: 'Atención Especializada',
    descripcion: 'Alzheimer, estimulación cognitiva y apoyo emocional',
    estado: 'bloqueado',
    items: [
      { titulo: 'Atención a personas con Alzheimer', completado: false, xp: 200 },
      { titulo: 'Estimulación cognitiva y actividades', completado: false, xp: 180 },
      { titulo: 'Comunicación y apoyo emocional', completado: false, xp: 120 },
    ],
    xpTotal: 500, fecha: 'Próximamente',
  },
  {
    id: '4', fase: 4,
    titulo: 'Empleabilidad y Proyecto Final',
    descripcion: 'CV, marca personal y proyecto de intervención integrador',
    estado: 'bloqueado',
    items: [
      { titulo: 'CV para el sector sociosanitario', completado: false, xp: 300 },
      { titulo: 'Simulacro de entrevista', completado: false, xp: 150 },
      { titulo: 'Proyecto de intervención integrador', completado: false, xp: 500 },
    ],
    xpTotal: 950, fecha: 'Futuro',
  },
]
